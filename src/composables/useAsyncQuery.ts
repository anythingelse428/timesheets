import axios from "axios";
import { type AxiosRequestConfig } from 'axios';
import {useCookies} from "vue3-cookies";
import { useUserStore } from '@/stores/user'

interface RetryQueueItem {
	resolve: (value?: any) => void;
	reject: (error?: any) => void;
	config: AxiosRequestConfig;
}

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SITE_API,
});

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;
const { cookies } = useCookies()
const token = cookies.get('access');
export const instanceAuth = axios.create({
	baseURL: import.meta.env.VITE_SITE_API,
	headers: {'Authorization': `Bearer ${token}`},
});


instanceAuth.interceptors.request.use((config) => {
	const { cookies } = useCookies()
	const token = cookies.get('access');
	if (token){
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

instanceAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest: AxiosRequestConfig = error.config;

		if (error.response && error.response.status === 401) {
			if (!isRefreshing) {
				isRefreshing = true;
				try {
					const { cookies } = useCookies()
					const refreshToken = cookies.get('refresh');

					const response = await axios.post(import.meta.env.VITE_SITE_API + "/auth/refresh-token", {}, {
						headers: {
							'Authorization': `Bearer ${refreshToken}`
						},
					});
					error.config.headers['Authorization'] = `Bearer ${response.data.token}`;
					cookies.set("access", response.data.token)
					cookies.set("refresh", response.data.refresh_token)

					refreshAndRetryQueue.forEach(({config, resolve, reject}) => {
						instanceAuth
							.request(config)
							.then((response) => resolve(response))
							.catch((err) => reject(err));
					});

					refreshAndRetryQueue.length = 0;

					return axiosInstance(originalRequest);
				} catch (refreshError) {
					const {logout} = useUserStore()
					await logout();
					// window.location.href = '/?log-out';
					throw refreshError;
				} finally {
					isRefreshing = false;
				}
			}
			return new Promise<void>((resolve, reject) => {
				refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
			});
		} else if (error.code === 'ERR_NETWORK') {

			const skipRequests = ['create_order_and_register_payment']
			let skip = false;
			skipRequests.forEach((value) => {
				if (error.config.url.includes(value)){
					skip = true;
				}
			})

		}  else if (error.code === 'ERR_BAD_REQUEST') {
			return;
		}
		return Promise.reject(error);
	}
);


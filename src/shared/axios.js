import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use((config) => {
	const token = sessionStorage.getItem('Authorization');

	if (!token) {
		config.headers.common['Authorization'] = null;
		return config;
	} else {
		config.headers.common['Authorization'] = token;
		return config;
	}
});

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		if (err.response && err.response.status === 401) {
			const refreshToken = sessionStorage.getItem('Refresh__Token');
			const prevAccessToken = sessionStorage.getItem('Authorization');
			const originRequest = err.config; // 원래의 요청

			return axios
				.put(
					`${process.env.REACT_APP_API_URL}/api/refreshToken`,
					{},
					{
						headers: {
							Authorization: prevAccessToken,
							RefreshToken: refreshToken
						}
					}
				)
				.then((res) => {
					const newAccessToken = res.headers.authorization;
					sessionStorage.setItem('Authorization', newAccessToken);
					originRequest.headers.Authorization = newAccessToken;

					return instance.request(originRequest).catch((e) => {
						alert('세션이 만료되었습니다.');
						console.log(e);
						window.location.href = '/login';
					}); // 원래의 요청으로 다시 요청
				})
				.catch((err) => {
					alert('세션이 만료되었습니다.');
					sessionStorage.removeItem('Authorization');
					window.location.href = '/login';
				});
		}
		return Promise.reject(err);
	}
);

export default instance;

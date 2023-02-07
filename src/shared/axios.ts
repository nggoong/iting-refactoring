import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use((config) => {
	const token = sessionStorage.getItem('Authorization');
	if (!token) {
		config.headers!.authorization = 'Bearer token';
		return config;
	} else {
		config.headers!.authorization = token;
		return config;
	}
});

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		if (err.response && err.response.status === 401) {
			const refreshToken = sessionStorage.getItem('Refresh__Token');
			const prevAccessToken = sessionStorage.getItem('Authorization');
			const originRequest = err.config; // 원래의 요청
			try {
				if (prevAccessToken && refreshToken) {
					const res = await axios.put(
						`${process.env.REACT_APP_API_URL}/api/refreshToken`,
						{},
						{
							headers: {
								authorization: prevAccessToken,
								RefreshToken: refreshToken
							}
						}
					);
					const newAccessToken = res.headers.authorization;
					sessionStorage.setItem('Authorization', newAccessToken);
					originRequest.headers!.authorization = newAccessToken;

					return instance.request(originRequest).catch((err) => {
						alert(err.response.data);
						window.location.href = '/login';
					});
				}
			} catch (err: any) {
				alert(err.response.data);
				sessionStorage.removeItem('Authorization');
				window.location.href = '/login';
			}
		} else if (err.response && err.response.status === 404) {
			alert('연결이 원활하지 않습니다. 잠시 후 다시 실행해주세요!');
			return;
		}
		return Promise.reject(err);
	}
);

export default instance;

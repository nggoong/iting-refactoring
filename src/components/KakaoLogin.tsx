import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function KakaoLogin() {
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params.token === 'fail') {
			alert('로그인에 실패했습니다ㅠㅠ 카카오 이메일 제공 동의가 필요합니다!');
			navigate('/login');
		} else {
			const splitedToken = params.token!.split('&');
			const accessToken = splitedToken[0].replace('accessToken=', '');
			const refreshToken = splitedToken[1].replace('refreshToken=', '');
			sessionStorage.setItem('Authorization', `BEARER ${accessToken}`);
			sessionStorage.setItem('Refresh__Token', refreshToken);
			navigate('/viewer/posting/list');
		}
	}, []);

	return <></>;
}

export default KakaoLogin;

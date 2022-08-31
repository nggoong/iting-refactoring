import React, { useContext } from 'react';
import styled from 'styled-components';
import instance from '../shared/axios';
import kakao_login from '../components/images/kakao_login.png';
import { Link, useNavigate } from "react-router-dom";

import { userContext } from '../components/context/UserProvider';


const Login = () => {

    const email_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const navigate = useNavigate();

    const context = useContext(userContext);
    const { setUserInfo } = context.actions;


    const submitLogin = async () => {

        const login_data = {
            username : email_ref.current.value,
            password : pw_ref.current.value
        }

        //공란이면 알럿 띄우기
        // if (login_data.username || login_data.password === '') {
        //     alert ('ID 또는 비밀번호를 입력하세요!')
        // } else {

            try {
                const res = await instance.post('/api/login', login_data);
                const token = res.headers.authorization;
                const { username, nickname, user_type, kakao } = res.data;
                const userData = {username, nickname, user_type, kakao};
                setUserInfo(userData);
                localStorage.setItem("Authorization", token);
                alert('환영합니다!');
                navigate('/viewer/posting/list');
            } catch (err) {
                console.log(err);
                alert('로그인에 문제가 생겼어요!');
            }

        // }

    }



    return (
        <LoginWrapper>
            <Logo> <h1>IT-ING</h1> </Logo>
            <Inputarea>
                <input
                    placeholder="ID"
                    ref={email_ref}
                    type='email'
                />
                <input
                    placeholder="PW"
                    ref={pw_ref}
                    type="password"
                />
            </Inputarea>
            <Buttonarea>
                <button className="btn-login" onClick={submitLogin}>로그인</button>
                    <a
                        rel="noreferrer"
                        href="https://api.it-ing.co.kr/oauth2/authorization/kakao">
                        <button type="button" className="btn-kakao">
                        <img src={kakao_login} alt="" />
                        </button>
                    </a>
            </Buttonarea>
            <Singuparea>
                <Link to='/signup'><p>아직 회원이 아니신가요?</p></Link>
                <hr />
            </Singuparea>

        </LoginWrapper>

    )

}

export default Login;


const LoginWrapper = styled.div`
    padding-top : 80px;
    background-color : #FFFFFF;
    display : flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    input {
        margin-bottom : 20px;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        gap: 4px;

        width: 327px;
        height: 58px;
        left: 24px;
        top: 268px;
        border : none;
        border-bottom: 2px solid #3549FF;
    }
`

const Logo = styled.div`

    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 40px;

    color: #3549FF;

    margin-bottom : 60px;

`

const Inputarea = styled.div`
    display : flex;
    flex-direction: column;
    margin-bottom : 38px;
`

const Buttonarea = styled.div`
    display : flex;
    flex-direction: column;
    align-items: center;
    
    .btn-login {
        margin-bottom : 20px;
        justify-content: center;
        padding: 18px 0px;
        gap: 8px;

        width: 335px;
        height: 60px;
        left: 20px;
        top: 427px;

        background: #3549FF;
        border-radius: 40px;
        border : none;

        font-family: 'Apple SD Gothic Neo';
        font-style: normal;
        // font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.3px;
        color: #FFFFFF;

    }

    .btn-kakao {
        margin-top : 100px;
        margin-bottom : 18px;
        border : none;
        background-color : none;
    }

`

const Singuparea = styled.div`

    p {
        margin-bottom : 4px;
        color: #717171;
        font-size: 14px;

    }

    hr {
        width : 150px;
        margin-bottom : 43px;
    }

    a {
        color : black;
        text-decoration:none;
    }
`
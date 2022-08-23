import React from 'react';
import styled from 'styled-components';

const Mypage = () => {
  return (
    <>
        <Header>
            헤더 들어올 부분
        </Header>
        <MemberInfoAndCategoryBox>
            <MemberInfo>
                <ProfilePicture>
                <svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M34 38V34.1111C34 32.0483 33.1835 30.07 31.7301 28.6114C30.2767 27.1528 28.3054 26.3333 26.25 26.3333H10.75C8.69457 26.3333 6.72333 27.1528 5.26992 28.6114C3.81652 30.07 3 32.0483 3 34.1111V38M26.25 10.7778C26.25 15.0733 22.7802 18.5556 18.5 18.5556C14.2198 18.5556 10.75 15.0733 10.75 10.7778C10.75 6.48223 14.2198 3 18.5 3C22.7802 3 26.25 6.48223 26.25 10.7778Z" stroke="#C8C8C8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </ProfilePicture>
                <MemberNameTypeAndEmail>
                    <MemberNameAndType>
                        <MemberName>항해개발자1</MemberName>
                        <MemberType>주니어</MemberType>
                    </MemberNameAndType>
                    <MemberEmail>hanghae1@naver.com</MemberEmail>
                </MemberNameTypeAndEmail>
            </MemberInfo>
            <CategoryBox>
                <Mypostings>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 29.1668H30.625M24.0625 5.10433C24.6427 4.52417 25.4295 4.19824 26.25 4.19824C26.6563 4.19824 27.0585 4.27826 27.4339 4.43373C27.8092 4.5892 28.1502 4.81707 28.4375 5.10433C28.7248 5.3916 28.9526 5.73264 29.1081 6.10797C29.2636 6.4833 29.3436 6.88558 29.3436 7.29183C29.3436 7.69809 29.2636 8.10037 29.1081 8.4757C28.9526 8.85103 28.7248 9.19207 28.4375 9.47933L10.2083 27.7085L4.375 29.1668L5.83333 23.3335L24.0625 5.10433Z" stroke="#3549FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>내가 쓴 글</p>
                </Mypostings>
                <MyCommentsInPost>
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.3333 16.042V10.2087M30.625 2.91699H4.375V26.2503H11.6667V32.0837L17.5 26.2503H24.7917L30.625 20.417V2.91699ZM16.0417 16.042V10.2087V16.042Z" stroke="#3549FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>댓글 단 글</p>
                </MyCommentsInPost>
            </CategoryBox>
        </MemberInfoAndCategoryBox>
    </>
  )
}

export default Mypage;

const Header = styled.div`
    height: 70px;
    background: silver;
`;

const MemberInfoAndCategoryBox = styled.div`
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #D3D3D3;
`;

const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    height: 130px;
    box-sizing: border-box;
    border-bottom: 1px solid #E6E6E6;
`;

const ProfilePicture = styled.div`
    width: 78px;
    height: 78px;
    display: flex;
    align-items: center;
    font-size: 45px;
    justify-content: center;
    background: #EBEBEB;
    color: #C8C8C8;
    border-radius: 78px;
`;

const MemberNameTypeAndEmail = styled.div`

`;

const MemberNameAndType = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
`;

const MemberName = styled.div`
    color: #656565;
    font-weight: bold;
`;

const MemberType = styled.div`
    color: #3549FF;
    font-weight: bold;
    font-size: 13px;
`;

const MemberEmail = styled.div`
    color: #979797;
    font-size: 13px;
`;

const CategoryBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 70px;
    padding: 15px 0;
`;

const Mypostings = styled.div`
    margin-top: 25px;
    display: block;
    color: #3549FF;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    svg {
        background: #E8EAFF;
        padding: 15px;
        font-size: 40px;
        border-radius: 40px;
        margin-bottom: 5px;
    }
`;

const MyCommentsInPost = styled.div`
    margin-top: 25px;
    display: block;
    color: #3549FF;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    svg {
        background: #E8EAFF;
        padding: 15px;
        font-size: 40px;
        border-radius: 40px;
        margin-bottom: 5px;
    }
`;
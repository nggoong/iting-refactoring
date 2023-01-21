import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import ManagementCard from '../components/card/ManagementCard';
import { userTypeTrans } from '../shared/sharedFn';
import useUserState from '../hooks/useUserState';

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Mypage = () => {
	const userState = useUserState();
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>IT-ing</title>
				<link rel="apple-touch-icon" sizes="180x180" href="180.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="32.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="16.ico" />
			</Helmet>
			<Header title="마이페이지" isAction={true} />
			<MemberInfoAndCategoryBox>
				<MemberInfo>
					<ProfilePicture>
						<svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M34 38V34.1111C34 32.0483 33.1835 30.07 31.7301 28.6114C30.2767 27.1528 28.3054 26.3333 26.25 26.3333H10.75C8.69457 26.3333 6.72333 27.1528 5.26992 28.6114C3.81652 30.07 3 32.0483 3 34.1111V38M26.25 10.7778C26.25 15.0733 22.7802 18.5556 18.5 18.5556C14.2198 18.5556 10.75 15.0733 10.75 10.7778C10.75 6.48223 14.2198 3 18.5 3C22.7802 3 26.25 6.48223 26.25 10.7778Z"
								stroke="#C8C8C8"
								strokeWidth="5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</ProfilePicture>
					<MemberNameTypeAndEmail>
						<MemberNameAndType>
							<MemberName>{userState.nickname}</MemberName>
							<MemberType>{userTypeTrans(userState.user_type)}</MemberType>
						</MemberNameAndType>
						<MemberEmail>{userState.username}</MemberEmail>
					</MemberNameTypeAndEmail>
				</MemberInfo>
				<CategoryBox>
					<Mypostings onClick={() => navigate('/viewer/posting/mypostings')}>
						<CategoryIcon>
							<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M17.5 29.1668H30.625M24.0625 5.10433C24.6427 4.52417 25.4295 4.19824 26.25 4.19824C26.6563 4.19824 27.0585 4.27826 27.4339 4.43373C27.8092 4.5892 28.1502 4.81707 28.4375 5.10433C28.7248 5.3916 28.9526 5.73264 29.1081 6.10797C29.2636 6.4833 29.3436 6.88558 29.3436 7.29183C29.3436 7.69809 29.2636 8.10037 29.1081 8.4757C28.9526 8.85103 28.7248 9.19207 28.4375 9.47933L10.2083 27.7085L4.375 29.1668L5.83333 23.3335L24.0625 5.10433Z"
									stroke="#3549FF"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</CategoryIcon>
						<p>내가 쓴 글</p>
					</Mypostings>

					<MyCommentsInPost onClick={() => navigate('/viewer/commentinpost')}>
						<CategoryIcon>
							<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M23.3333 16.042V10.2087M30.625 2.91699H4.375V26.2503H11.6667V32.0837L17.5 26.2503H24.7917L30.625 20.417V2.91699ZM16.0417 16.042V10.2087V16.042Z"
									stroke="#3549FF"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</CategoryIcon>
						<p>댓글 단 글</p>
					</MyCommentsInPost>
				</CategoryBox>
			</MemberInfoAndCategoryBox>
			<MemberManagementBox>
				<ManagementCard
					isShow={true}
					managementType="개인정보 변경"
					svg={
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z"
								stroke="#656565"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					}
					pathUrl="/mypage/myinfomanage"
				/>
				<ManagementCard
					isShow={!userState.isKakao}
					managementType="비밀번호 변경"
					svg={
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.5003 6.5L18.0003 3M20.0003 1L18.0003 3L20.0003 1ZM10.3903 10.61C10.9066 11.1195 11.3171 11.726 11.598 12.3948C11.879 13.0635 12.0249 13.7813 12.0273 14.5066C12.0297 15.232 11.8887 15.9507 11.6122 16.6213C11.3357 17.2919 10.9293 17.9012 10.4164 18.4141C9.90351 18.9271 9.2942 19.3334 8.62358 19.6099C7.95296 19.8864 7.23427 20.0275 6.50891 20.025C5.78354 20.0226 5.06582 19.8767 4.39707 19.5958C3.72831 19.3148 3.12174 18.9043 2.61227 18.388C1.6104 17.3507 1.05604 15.9614 1.06857 14.5193C1.0811 13.0772 1.65953 11.6977 2.67927 10.678C3.69902 9.65825 5.07849 9.07982 6.52057 9.06729C7.96265 9.05476 9.35196 9.60913 10.3893 10.611L10.3903 10.61ZM10.3903 10.61L14.5003 6.5L10.3903 10.61ZM14.5003 6.5L17.5003 9.5L21.0003 6L18.0003 3L14.5003 6.5Z"
								stroke="#656565"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					}
					pathUrl="/mypage/mypwmanage"
				/>
				<ManagementCard
					isShow={true}
					managementType="피드백 남기기"
					feedbackUrl={
						'https://docs.google.com/forms/d/e/1FAIpQLSeW9YlrfOrokRe4OsK5mZ48Ms6RuOOzphReRiGnvMZvVdmJ2A/viewform?usp=sf_link'
					}
					svg={
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
								stroke="#656565"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					}
				/>
			</MemberManagementBox>
		</>
	);
};

export default Mypage;

const MemberInfoAndCategoryBox = styled.div`
	margin-top: 60px;
	padding: 20px;
	box-sizing: border-box;
	background: white;
	border-bottom: 1px solid #d3d3d3;
	margin-bottom: 5px;
`;

const MemberInfo = styled.div`
	display: flex;
	align-items: center;
	height: 130px;
	box-sizing: border-box;
	border-bottom: 1px solid #e6e6e6;
`;

const ProfilePicture = styled.div`
	width: 78px;
	height: 78px;
	display: flex;
	align-items: center;
	font-size: 45px;
	justify-content: center;
	background: #ebebeb;
	color: #c8c8c8;
	border-radius: 78px;
	margin-right: 17px;
`;

const MemberNameTypeAndEmail = styled.div``;

const MemberNameAndType = styled.div`
	display: flex;
	align-items: center;
`;

const MemberName = styled.div`
	color: #656565;
	font-weight: bold;
	margin-right: 4px;
`;

const MemberType = styled.div`
	color: #3549ff;
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
	padding: 7px 0;
`;

const Mypostings = styled.div`
	margin-top: 25px;
	display: block;
	color: #3549ff;
	font-weight: bold;
	text-align: center;
	font-size: 14px;
	margin-right: 76px;
	cursor: pointer;
`;

const CategoryIcon = styled.div`
	width: 62px;
	height: 62px;
	background: #e8eaff;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-bottom: 10px;
`;

const MyCommentsInPost = styled.div`
	margin-top: 25px;
	display: block;
	color: #3549ff;
	font-weight: bold;
	text-align: center;
	font-size: 14px;
	cursor: pointer;
`;

const MemberManagementBox = styled.div`
	background: white;
`;

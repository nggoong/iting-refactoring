import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Splash from '../pages/Splash';
import ErrorFound from '../components/notice/NotFound';
import PrivateRoute from './PrivateRoute';
import UserLimitRoute from './UserLimitRoute';
import { PRIVATE_ROUTE_PATH, AUTH_PATH } from './routePath';
import useUserState from '../hooks/contexts/useUserState';

const Detail = React.lazy(() => import('../pages/Detail'));
const Post = React.lazy(() => import('../pages/Post'));
const PostingViewer = React.lazy(() => import('../pages/PostingViewer'));
const CreateRoom = React.lazy(() => import('../pages/CreateRoom'));
const ChatRoom = React.lazy(() => import('../pages/ChatRoom'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Login = React.lazy(() => import('../pages/Login'));
const KakaoLogin = React.lazy(() => import('../components/kakao/KakaoLogin'));
const Mypage = React.lazy(() => import('../pages/Mypage'));
const RoomViewer = React.lazy(() => import('../pages/RoomViewer'));
const MyInfoManage = React.lazy(() => import('../pages/MyInfoManage'));
const MyPwManage = React.lazy(() => import('../pages/MyPwManage'));
const CommentInPost = React.lazy(() => import('../pages/CommentInPost'));

const privateRoutePath = [
	{ id: 1, path: PRIVATE_ROUTE_PATH.COMMENT_IN_POST, element: <CommentInPost /> },
	{ id: 2, path: PRIVATE_ROUTE_PATH.POSTING_VIEWER, element: <PostingViewer /> },
	{ id: 3, path: PRIVATE_ROUTE_PATH.POSTING_SEARCH_VIEWER, element: <PostingViewer /> },
	{ id: 4, path: PRIVATE_ROUTE_PATH.ROOM_VIEWER, element: <RoomViewer /> },
	{ id: 5, path: PRIVATE_ROUTE_PATH.ROOM_SEARCH_VIEWER, element: <RoomViewer /> },
	{ id: 6, path: PRIVATE_ROUTE_PATH.POSTING_DETAIL, element: <Detail /> },
	{ id: 7, path: PRIVATE_ROUTE_PATH.MY_INFO_MANAGE, element: <MyInfoManage /> },
	{ id: 8, path: PRIVATE_ROUTE_PATH.MY_PASS_MANAGE, element: <MyPwManage /> },
	{ id: 9, path: PRIVATE_ROUTE_PATH.MY_PAGE, element: <Mypage /> },
	{ id: 10, path: PRIVATE_ROUTE_PATH.POSTING, element: <Post /> },
	{ id: 11, path: PRIVATE_ROUTE_PATH.POSTING_EDIT, element: <Post /> },
	{ id: 12, path: PRIVATE_ROUTE_PATH.CREATE_ROOM, element: <CreateRoom /> },
	{ id: 13, path: PRIVATE_ROUTE_PATH.ROOM_DETAIL, element: <ChatRoom /> }
];

const authRoutePath = [
	{ id: 1, path: AUTH_PATH.LOGIN, element: <Login /> },
	{ id: 2, path: AUTH_PATH.SIGNUP, element: <Signup /> }
];

const Router = () => {
	const { username } = useUserState();
	const token = sessionStorage.getItem('Authorization');

	return (
		<AnimatePresence>
			<Routes>
				<Route path={PRIVATE_ROUTE_PATH.SPLASH} element={<Splash />} />
				{privateRoutePath.map((item) => (
					<Route
						path={item.path}
						element={<PrivateRoute component={item.element} authenticated={!!token || !!username} />}
						key={item.id}
					/>
				))}
				{authRoutePath.map((item) => (
					<Route
						path={item.path}
						element={<UserLimitRoute component={item.element} authenticated={!!token || !!username} />}
						key={item.id}
					/>
				))}
				<Route path="/oauth2/redirect/:token" element={<KakaoLogin />} />
				<Route path="*" element={<ErrorFound title={'NOT FOUND'} text={'???????????? ?????? ????????????!'} />} />
			</Routes>
		</AnimatePresence>
	);
};

export default Router;

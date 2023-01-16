export const PRIVATE_ROUTE_PATH = {
	SPLASH: '/',
	COMMENT_IN_POST: '/viewer/commentinpost',
	POSTING_VIEWER: '/viewer/posting/:category',
	POSTING_SEARCH_VIEWER: '/viewer/posting/search/:hashtag',
	ROOM_VIEWER: '/viewer/room',
	ROOM_SEARCH_VIEWER: '/viewer/room/search/:hashtag',
	POSTING_DETAIL: '/detail/posting/:postingId',
	MY_INFO_MANAGE: '/mypage/myinfomanage',
	MY_PASS_MANAGE: '/mypage/mypwmanage',
	MY_PAGE: '/mypage',
	POSTING: '/posting',
	POSTING_EDIT: '/posting/edit/:postingId',
	CREATE_ROOM: '/create/room',
	ROOM_DETAIL: '/detail/room/chat/:roomId'
};

export const AUTH_PATH = {
	LOGIN: '/login',
	SIGNUP: '/signup'
};

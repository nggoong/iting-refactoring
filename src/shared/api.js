import instance from './axios';

export const postingsAPI = {
	fetchPostingsListWithScroll: async (pageParams, category) => {
		let apiurl;
		if (category === 'list') {
			const token = sessionStorage.getItem('Authorization');
			apiurl = token ? `/api/main/user/postings?page=${pageParams}&size=10` : `/api/main/postings?page=${pageParams}&size=10`;
		} else if (category === 'mypostings') {
			apiurl = `/api/mypage/postings?page=${pageParams}&size=10`;
		}
		const res = await instance.get(apiurl);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	},
	postPosting: async (newData) => {
		const res = await instance.post('/api/board', newData);
		return res.data;
	},

	postEditing: async ({ postingId, newData }) => {
		await instance.put(`/api/board/${postingId}`, newData);
	},
	postDelete: async (postingId) => {
		await instance.delete(`/api/board/${postingId}`);
	},
	fetchSearchPostingsListWithScroll: async (pageParams, hashtag) => {
		const res = await instance.get(`/api/search/postings?hashtag=${hashtag}&page=${pageParams}&size=10`);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	},
	fetchAutoCompletePostingList: async (hashtag) => {
		return await instance.get(`/api/hashtags/posts?hashtag=${hashtag}`);
	},
	fetchCommentInPostListWithScroll: async (pageParams) => {
		const res = await instance.get(`/api/mypage/comments/postings?page=${pageParams}&size=10`);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	}
};

export const chatroomAPI = {
	createChatRoom: async (param) => {
		const { title, hashtag } = param;
		const newData = { title, hashtag };
		const res = await instance.post('/api/chat/room', newData);
		return res.data;
	},
	fetchRoomsListWithScroll: async (pageParams) => {
		const res = await instance.get(`/api/main/rooms?page=${pageParams}&size=10`);
		const { content } = res.data;
		const { isLast } = res.data;

		return { rooms: content, nextPage: pageParams + 1, isLast };
	},
	fetchSearchRoomsListWithScroll: async (pageParams, hashtag) => {
		const res = await instance.get(`/api/search/rooms?hashtag=${hashtag}&page=${pageParams}&size=10`);
		// const res = await instance.get(`/api/test/search/rooms?hashtag=${hashtag}&page=${pageParams}&size=10`);
		const { content } = res.data;
		const { isLast } = res.data;

		return { rooms: content, nextPage: pageParams + 1, isLast };
	},
	enterRoom: async (roomId) => {
		return await instance.post(`/api/chat/room/${roomId}/enter`);
	},
	exitRoom: async (roomId) => {
		return await instance.delete(`/api/chat/room/${roomId}/exit`);
	},
	fetchAutoCompleteRoomList: async (hashtag) => {
		return await instance.get(`/api/hashtags/rooms?hashtag=${hashtag}`);
	}
};

import instance from './axios';
import { TypePostPosting, TypePostEditing, TypeAddComment, TypeDeleteComment, TypeEditComment } from '../typings';

export const postingsAPI = {
	fetchPostingsListWithScroll: async (pageParams: number, category: string) => {
		let apiurl: string;
		if (category === 'list') {
			const token = sessionStorage.getItem('Authorization');
			apiurl = token ? `/api/main/user/postings?page=${pageParams}&size=10` : `/api/main/postings?page=${pageParams}&size=10`;
		} else if (category === 'mypostings') {
			apiurl = `/api/mypage/postings?page=${pageParams}&size=10`;
		}
		const res = await instance.get(apiurl!);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	},

	postPosting: async (newData: TypePostPosting) => {
		const res = await instance.post('/api/board', newData);
		return res.data;
	},

	postEditing: async ({ postingId, newData }: TypePostEditing) => {
		await instance.put(`/api/board/${postingId}`, newData);
	},

	postDelete: async (postingId: number) => {
		await instance.delete(`/api/board/${postingId}`);
	},

	fetchSearchPostingsListWithScroll: async (pageParams: number, hashtag: string) => {
		const res = await instance.get(`/api/search/postings?hashtag=${hashtag}&page=${pageParams}&size=10`);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	},

	fetchAutoCompletePostingList: async (hashtag: string) => {
		return await instance.get(`/api/hashtags/posts?hashtag=${hashtag}`);
	},

	fetchCommentInPostListWithScroll: async (pageParams: number) => {
		const res = await instance.get(`/api/mypage/comments/postings?page=${pageParams}&size=10`);
		const { content } = res.data;
		const { last } = res.data;
		return { posts: content, nextPage: pageParams + 1, isLast: last };
	},

	fetchPostDetail: async (postingId: number) => {
		const res = await instance.get(`/api/board/detail/${postingId}`);
		return res.data;
	},

	postingLike: async (postingId: number) => {
		console.log('axios run!');
		console.log(postingId);
		return await instance.post(`/api/board/${postingId}/likes`);
	},

	postingLikeDelete: async (postingId: number) => {
		console.log('axios run!');
		return await instance.delete(`/api/board/${postingId}/likes`);
	}
};

export const chatroomAPI = {
	createChatRoom: async (param: any) => {
		const { title, hashtag } = param;
		const newData = { title, hashtag };
		const res = await instance.post('/api/chat/room', newData);
		return res.data;
	},
	fetchRoomsListWithScroll: async (pageParams: number) => {
		const res = await instance.get(`/api/main/rooms?page=${pageParams}&size=10`);
		const { content } = res.data;
		const { isLast } = res.data;

		return { rooms: content, nextPage: pageParams + 1, isLast };
	},
	fetchSearchRoomsListWithScroll: async (pageParams: number, hashtag: string) => {
		const res = await instance.get(`/api/search/rooms?hashtag=${hashtag}&page=${pageParams}&size=10`);
		const { content } = res.data;
		const { isLast } = res.data;

		return { rooms: content, nextPage: pageParams + 1, isLast };
	},
	enterRoom: async (roomId: number) => {
		return await instance.post(`/api/chat/room/${roomId}/enter`);
	},
	exitRoom: async (roomId: number) => {
		return await instance.delete(`/api/chat/room/${roomId}/exit`);
	},
	fetchAutoCompleteRoomList: async (hashtag: string) => {
		return await instance.get(`/api/hashtags/rooms?hashtag=${hashtag}`);
	}
};

export const commentsAPI = {
	addComment: async (data: TypeAddComment) => {
		return await instance.post(`/api/board/${data.postingId}/comment`, data.data);
	},
	deleteComment: async (data: TypeDeleteComment) => {
		return await instance.delete(`/api/board/${data.postingId}/comment/${data.commentId}`);
	},
	editComment: async (data: TypeEditComment) => {
		return await instance.put(`/api/board/${data.postingId}/comment/${data.commentId}`, data.data);
	},
	commentLike: async (id: string) => {
		return await instance.post(`/api/comment/${id}/likes`);
	},
	DeleteCommentLike: async (id: string) => {
		return await instance.delete(`/api/comment/${id}/likes`);
	}
};

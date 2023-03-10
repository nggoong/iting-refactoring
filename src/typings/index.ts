export interface TypePosting {
	posting_id: number;
	posting_content: string;
	title: string;
	user_type: string;
	nickname: string;
	like: boolean;
	like_count: number;
	hashtag: string[];
	date: Date;
	comments: TypeComment[];
	comment_count: number;
}

export interface TypePostPosting {
	title: string;
	posting_content: string;
	hashtag: string[];
}

export interface TypePostEditing {
	postingId: number;
	newData: TypePostPosting;
}

export interface TypeCommentInPost {
	posting_id: number;
	title: string;
	comment_content: string;
	comment_count: number;
	localDateTime: Date;
}

export interface TypeComment {
	id: number;
	nickname: string;
	content: string;
	date: Date;
	like_count: number;
	like: boolean;
	user_type: string;
}

export interface TypeChatRoom {
	username: string;
	title: string;
	user_type: string;
	nickname: string;
	isfull: boolean;
	roomId: number;
	hashtag: string[];
}

export interface TypeCreateChatRoom {
	title: string;
	hashtag: string[];
}

export interface TypeChatMessage {
	nickname: string;
	messageType: string;
	enter: string;
	message: string;
	time: string;
}

export interface TypeSignup {
	username: string;
	nickname: string;
	password: string;
	checkPassword: string;
	user_type: string;
}

export interface TypeLogin {
	username: string;
	password: string;
}

export interface TypeChangePassword {
	password: string;
	changePassword: string;
	confirmChangePassword: string;
}

export interface TypeChangeUserInfo {
	nickname: string;
	user_type: string;
}

export interface TypeChatRoomNavigateState {
	state: {
		title?: string;
		isHost: boolean;
	};
}

export interface TypeCompletedSearch {
	hashtag: string;
	count: number;
}

export interface TypeAddComment {
	postingId: number;
	data: {
		content: string;
	};
}

export interface TypeDeleteComment {
	postingId: number;
	commentId: string;
}

export interface TypeEditComment extends TypeDeleteComment {
	data: {
		content: string;
	};
}

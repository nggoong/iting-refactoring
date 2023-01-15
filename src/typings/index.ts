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
	comments_count: number;
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

export interface TypeSignup {
	username: string;
	nickname: string;
	password: string;
	checkPassword: string;
	user_type: string;
}

export interface TypeChangePassword {
	password: string;
	changePassword: string;
	confirmChangePassword: string;
}

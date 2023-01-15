export interface PostPosting {
	title: string;
	posting_content: string;
	hashtag: string[];
}

export interface postEditing {
	postingId: number;
	newData: PostPosting;
}

export interface CreateChatRoom {
	title: string;
	hashtag: string[];
}

export interface TypeChatRoom {
	username:string;
	title:string;
	user_type:string;
	nickname:string;
	isfull:boolean;
	roomId:number;
	hashtag:string[];
}

export interface TypeSignup {
	username: string;
	nickname: string;
	password: string;
	checkPassword: string;
	user_type: string;
}

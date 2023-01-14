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

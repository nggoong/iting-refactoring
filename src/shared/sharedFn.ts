export const editPostingTime = (value: Date) => {
	const milliSeconds = +new Date() - +new Date(value);
	const seconds = milliSeconds / 1000;
	if (seconds < 60) return `방금 전`;
	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)}분 전`;
	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)}시간 전`;
	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)}일 전`;
	const weeks = days / 7;
	if (weeks < 5) return `${Math.floor(weeks)}주 전`;
	const months = days / 30;
	if (months < 12) return `${Math.floor(months)}개월 전`;
	const years = days / 365;
	return `${Math.floor(years)}년 전`;
};

export const hashtagValidation = (hashtagInput: string, hashtagArray: string[]) => {
	if (!hashtagInput) {
		alert('특수문자, 공백은 사용할 수 없습니다!');
		return false;
	} else if (hashtagInput.length === 1 || hashtagInput.length > 6) {
		alert('해시태그는 2~6자리까지 등록 할 수 있습니다.(특수문자, 공백 사용불가)');
		return false;
	} else if (hashtagArray.length === 3) {
		alert('해시태그는 3개까지 등록 할 수 있습니다.');
		return false;
	}
	return true;
};

export const userTypeTrans = (userType: string) => {
	if (userType === 'SEEKER') return '취준생';
	else if (userType === 'JUNIOR') return '주니어';
	else if (userType === 'SENIOR') return '시니어';
};

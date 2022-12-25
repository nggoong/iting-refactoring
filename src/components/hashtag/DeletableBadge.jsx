import React from 'react';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const DeletableBadge = ({ children, idx, hashtag, data, setHashtag }) => {
	const location = useLocation();
	const pathname = location.pathname;

	const handleDelete = () => {
		let tempHashtag;
		if (pathname.includes('/room')) {
			tempHashtag = [...hashtag];
			tempHashtag.splice(idx, 1);
			setHashtag(tempHashtag);
		} else {
			tempHashtag = [...hashtag];
			tempHashtag.splice(idx, 1);
			setHashtag({ ...data, hashtag: [...tempHashtag] });
		}
	};

	return (
		<Stack direction="row" spacing={1}>
			<Chip label={children} onDelete={handleDelete} sx={{ background: '#DFE2FF', fontSize: '12px' }} />
		</Stack>
	);
};

export default DeletableBadge;

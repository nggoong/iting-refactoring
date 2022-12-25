import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const NomalBadge = ({ children }) => {
	return (
		<Stack direction="row" spacing={1}>
			<Chip label={children} sx={{ background: '#3549FF', color: 'white', fontSize: '12px' }} />
		</Stack>
	);
};

export default NomalBadge;

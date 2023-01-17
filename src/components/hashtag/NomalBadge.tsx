import React, { ReactNode } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface Props {
	children: ReactNode;
}

const NomalBadge = ({ children }: Props) => {
	return (
		<Stack direction="row" spacing={1}>
			<Chip label={children} sx={{ background: '#3549FF', color: 'white', fontSize: '12px' }} />
		</Stack>
	);
};

export default NomalBadge;

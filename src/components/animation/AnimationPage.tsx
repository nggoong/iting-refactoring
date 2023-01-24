import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

const animations = {
	initial: { opacity: 0 },
	animate: { opacity: 1 }
};

const AnimationPage = ({ children }: PropsWithChildren) => {
	return (
		<motion.div variants={animations} initial="initial" animate="animate" transition={{ duration: 0.2 }}>
			{children}
		</motion.div>
	);
};

export default AnimationPage;

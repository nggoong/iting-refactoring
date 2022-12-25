import React from 'react';
import { motion } from 'framer-motion';

const animations = {
	initial: { opacity: 1 },
	exit: { opacity: 0 }
};

const AnimationPage = ({ children }) => {
	return (
		<motion.div variants={animations} initial="initial" exit="exit" transition={{ duration: 0.2 }}>
			{children}
		</motion.div>
	);
};

export default AnimationPage;

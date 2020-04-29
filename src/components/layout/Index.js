import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

// Hold Search and Tracks components
const Index = () => {
	return (
		<React.Fragment>
			<Search />
			<Tracks />
		</React.Fragment>
	);
};

export default Index;

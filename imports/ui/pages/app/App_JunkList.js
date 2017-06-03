import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';


const HomePage = () => {
	return (
		<div style={{padding: 20}}>
			AppJunkList
		</div>
	);
}

const AppJunkList = ({ children }) => {
	return (
		<div style={{padding: 20}}>
			{ children ? children : <HomePage />}
		</div>
	);
}

export default AppJunkList
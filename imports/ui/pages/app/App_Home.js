import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';


const HomePage = () => {
	return (
		<div style={{padding: 20}}>
			<AddDocument />
			<DocumentsList />
		</div>
	);
}

const AppHome = ({ children }) => {
	return (
		<div>
			{ children ? children : <HomePage />}
		</div>
	);
}

export default AppHome
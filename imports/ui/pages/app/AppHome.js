import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';

 
const AppHome = () => {
	return (
		<div style={{padding: 20}}>
			<AddDocument />
			<DocumentsList />
		</div>
	);
}

export default AppHome
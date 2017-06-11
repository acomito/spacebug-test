// TOP LEVEL IMPORTS
import React from 'react';
//COMPONENTS
import ClientsPage from './ClientsPage'




class AdminClientsPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.children ? this.props.children : <ClientsPage {...this.props} />}
			</div>
		);
	}
}


export default AdminClientsPage;
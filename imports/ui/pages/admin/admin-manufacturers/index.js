// TOP LEVEL IMPORTS
import React from 'react';
//COMPONENTS
import ManufacturersPage from './ManufacturersPage'




class AdminManufacturersPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.children ? this.props.children : <ManufacturersPage {...this.props} />}
			</div>
		);
	}
}


export default AdminManufacturersPage;
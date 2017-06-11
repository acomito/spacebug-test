
// TOP LEVEL IMPORTS
import React from 'react';
//COMPONENTS
import FacilitiesPage from './FacilitiesPage'




class AdminFacilitiesPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.children ? this.props.children : <FacilitiesPage {...this.props} />}
			</div>
		);
	}
}


export default AdminFacilitiesPage;
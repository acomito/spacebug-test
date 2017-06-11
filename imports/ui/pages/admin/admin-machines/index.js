// TOP LEVEL IMPORTS
import React from 'react';
//COMPONENTS
import MachinesPage from './MachinesPage';




class AdminMachinesPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.children ? this.props.children : <MachinesPage {...this.props} />}
			</div>
		);
	}
}


export default AdminMachinesPage;
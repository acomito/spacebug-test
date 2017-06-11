// TOP LEVEL IMPORTS
import React from 'react';
//COMPONENTS
import MachineModelsPage from './MachineModelsPage'




class AdminMachineModelsPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.children ? this.props.children : <MachineModelsPage {...this.props} />}
			</div>
		);
	}
}


export default AdminMachineModelsPage;
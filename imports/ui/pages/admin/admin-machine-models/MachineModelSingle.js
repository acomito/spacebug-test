// TOP LEVEL IMPORTS
import React from 'react';
// COMPONENTS

// APOLLO
import { MACHINE_MODEL_BY_ID } from '/imports/ui/apollo/queries'
import { graphql } from 'react-apollo';
import DataLink from '/imports/ui/components/common/DataLink'
import DataRow from '/imports/ui/components/common/DataRow'


class AdminMachineModelSingle extends React.Component {
	render(){
		
		const { loading, machineModelById } = this.props.data;

		if ( loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<DataRow 
	            	label={'_id'}
	            	value={machineModelById._id} 
	          	/>
	          	<DataRow 
	            	label={'title'}
	            	value={machineModelById.title} 
	          	/>
			</div>
		);

	}
}

let options = (props) => {
	return { 
		variables: { 
			_id: props.params._id 
		} 
	} 
}

export default graphql(MACHINE_MODEL_BY_ID, { options })(
	AdminMachineModelSingle
);
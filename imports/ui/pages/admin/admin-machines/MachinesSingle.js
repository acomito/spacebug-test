// TOP LEVEL IMPORTS
import React from 'react';
// COMPONENTS
import { AdminProfileForm } from '/imports/ui/components/admin/AdminProfileForm'
import { ChangePassword } from '/imports/ui/components/common';
// APOLLO
import { MACHINE_BY_ID } from '/imports/ui/apollo/queries'
import { graphql } from 'react-apollo';
import DataLink from '/imports/ui/components/common/DataLink'
import DataRow from '/imports/ui/components/common/DataRow'


class AdminMachineSingle extends React.Component {
	render(){
		
		const { loading, machineById } = this.props.data;

		if ( loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<DataRow 
	            	label={'_id'}
	            	value={machineById._id} 
	          	/>
	          	<DataRow 
	            	label={'title'}
	            	value={machineById.title} 
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

export default graphql(MACHINE_BY_ID, { options })(
	AdminMachineSingle
);
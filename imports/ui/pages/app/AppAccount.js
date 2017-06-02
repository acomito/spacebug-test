import React from 'react';
import { browserHistory } from 'react-router';
// COMPONENTS
import { ChangePassword } from '/imports/ui/components/common';
import EditAccountForm from '/imports/ui/components/common/EditAccount';

class AppAccount extends React.Component {
	render() {

		if (this.props.user.loading) {
			return null;
		}


		
		return (
			<div>
				<EditAccountForm 
					{...this.props} 
					user={this.props.user.user} 
				/>
				<ChangePassword />
			</div>
		);
	}
}



export default AppAccount
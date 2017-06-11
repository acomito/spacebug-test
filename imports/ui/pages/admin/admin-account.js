import React from 'react';
import { AdminProfileForm } from '/imports/ui/components/admin/AdminProfileForm'
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { ChangePassword } from '/imports/ui/components/common';

class AdminAccountPage extends React.Component {
	render(){

		if ( this.props.data.loading ) { return <div>Loading...</div>; }

		return (
			<div>
				<AdminProfileForm user={this.props.data.user} data={this.props.data} />
				<ChangePassword />
			</div>
		);

	}
}

const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id
    }
  }
`;


export default graphql(GET_USER_DATA)(AdminAccountPage);

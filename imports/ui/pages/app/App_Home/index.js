import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
import PostFilters from '/imports/ui/components/common/PostFilters';
import SearchBox from '/imports/ui/components/common/SearchBox';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import HomePage from './HomePage';
import { graphql } from 'react-apollo'
import { GET_USER_DATA } from '/imports/ui/apollo/queries';

class AppHome extends React.Component {
	render(){
		const { children } = this.props;
		if (this.props.user.loading) {
			return null
		}
		return (
			<div>
				{ children ? children : <HomePage {...this.props} />}
			</div>
		);
	}
}

export default graphql(GET_USER_DATA, { name: 'user' })(AppHome)
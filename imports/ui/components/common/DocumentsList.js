import React from 'react';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_POSTS } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'
import PostFilters from '/imports/ui/components/common/PostFilters'
import EmptyState from '/imports/ui/components/common/EmptyState'
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'



class DocumentsList extends React.Component {
	render() {
		const { data, user, searchText, categories, statuses } = this.props;

		// if loading, show spinner
		if (data.loading) {
			return (
				<div style={{minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<Spin tip='Searching Junk...' />
				</div>
			)
		}

		// if the user entered a search and there are no results, show no results
		if (data.posts && data.posts.length === 0 && (searchText || categories.length > 0 || statuses.length > 0)) {
			return (
				<EmptyState
					header='No Results...'
					subheader="Your search turned up no results" 
					image={<Icon style={{fontSize: 45}} type="search" />}
				/>
			);
		}

		// if the user did not enter search text or filters, but the results are still 0
		if (data.posts && data.posts.length === 0) {
			return (
				<EmptyState
					header='No Results...'
					subheader="Add some friends to see eachother's junk" 
					image={<Icon style={{fontSize: 45}} type="search" />}
					actionLink={<Button style={{marginTop: 10}} type='primary' onClick={()=>browserHistory.push('/app/friends')}>Find Friends</Button>}
				/>
			);
		}

		//if results exist, display them
		return (
			<div style={{height: '100%', marginTop: 15, display: 'flex', alignItems: 'flex-start', justifyContent: 'top'}}>
				<div>
					{data.posts.map( item => {
						return <PostCard key={item._id} item={item} user={user} />
					})}
				</div>
			</div>
		);
	}
}

let options = (props) => {
	let params = {
		statuses: props.statuses,
		categories: props.categories,
		searchText: props.searchText
	}

	return { 
		variables: { params } 
	} 
}

let ComponentWithData = graphql(GET_POSTS, { options })(DocumentsList);


let mapStateToProps = ({ search }) => {
	return {
		statuses: search.statuses,
		categories: search.categories,
		searchText: search.searchText
	}
}


export default connect(mapStateToProps, actions)(ComponentWithData)
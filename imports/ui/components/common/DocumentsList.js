import React from 'react';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Spin from 'antd/lib/spin';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_POSTS } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'
import PostFilters from '/imports/ui/components/common/PostFilters'
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'


class DocumentsList extends React.Component {
	render() {

		if (this.props.data.loading) {
			return (
				<div style={{minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<Spin tip='Loading Junk...' />
				</div>
			)
		}

		if (!this.props.data.posts && this.props.data.posts.length < 0) {
			return <p>no junk yet....</p>
		}

		return (
			<div style={{height: '100%', marginTop: 15, display: 'flex', alignItems: 'flex-start', justifyContent: 'top'}}>
				<div>
					{this.props.data.posts.map( item => {
						return <PostCard key={item._id} item={item} user={this.props.user} />
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
// insert a search box that can be used anyway, pass in the onChange so you can re-use it.
// TOP LEVEL IMPORTS
import React from 'react';
import { Link } from 'react-router';
// ANTD
import Row from 'antd/lib/row';
import Input from 'antd/lib/input';
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'



// CONSTANTS & DESTRUCTURING
// ====================================
const Search = Input.Search;


class SearchBox extends React.Component {
	render(){
		return (
			<Search
			    placeholder="search junk..."
			    style={{ width: 200 }}
			    onChange={e => this.props.onSearchTextChange(e.target.value)}
			  />
		);
	}
}

let mapStateToProps = ({ search }) => {
	return {
		searchText: search.searchText
	}
}

export default connect(mapStateToProps, actions)(SearchBox)

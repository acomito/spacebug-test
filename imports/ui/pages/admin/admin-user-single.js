// TOP LEVEL IMPORTS
import React from 'react';
import { browserHistory } from 'react-router';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_USER_BY_ID, GET_USERS } from '../../apollo/queries';
import { ADMIN_DELETE_USER } from '../../apollo/mutations';
// ANTD
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
import Tag from 'antd/lib/tag';
// COMPONENTS
import UserForm from '/imports/ui/components/admin/UserForm'
import DataRow from '/imports/ui/components/common/DataRow'
import DataLink from '/imports/ui/components/common/DataLink'
// CONSTANTS & DESTRUCTURING
// ===================================
const TabPane = Tabs.TabPane;


// STYLES
// ===================================
const styles = {
  rowContainer: { width: 850, maxWidth: '90%', margin: 'auto', marginTop: 15 }
}


// EXPORTED COMPONENT
// ===================================
class AdminUsersSinglePage extends React.Component {
  state = { editing: false }
  onDelete = () => {
    const { _id } = this.props.data.getUserById;
    let variables = { _id };
    let refetchQueries = [{ query: GET_USERS }]
    this.props.adminDeleteUser({ variables, refetchQueries }).then(res => {
      return browserHistory.push('/admin/users')
    })
  }
  renderPosts = () => {
    const { loading, getUserById } = this.props.data;
    if (getUserById.posts && getUserById.posts.length > 0) {
      return (
        <div>
          <h2 style={{marginTop: 20}}>Posts</h2>
          { getUserById.posts.map( item => {
            return (
              <DataLink
                key={item._id}
                linkType={'posts'} 
                item={item}
                linkLabel={item.title}
              />
            );
          })}
        </div>
      )
    } 

  }
  toggleEditing = () => {
    let currentState = this.state.editing;
    this.setState({ editing: !currentState })
  }
  renderContent = () => {
    const { loading, getUserById } = this.props.data;
    if(!this.state.editing) {
      return (
        <div>
          <h2 style={{marginTop: 20}}>DATA</h2>
          <DataRow 
            label={'id'} 
            value={getUserById._id} 
          />
          <DataRow 
            label={'first name'} 
            value={getUserById.profile.firstName} 
          />
          <DataRow 
            label={'last name'} 
            value={getUserById.profile.lastName} 
          />
          <DataRow 
            label={'workPhone'} 
            value={getUserById.profile.workPhone} 
          />
          <DataRow 
            label={'cellPhone'} 
            value={getUserById.profile.cellPhone} 
          />
          <h3 style={{color: '#888'}}>Posts:</h3>
          {getUserById.roles && getUserById.roles.map( item => <Tag key={item} color="#2db7f5"> {item} </Tag>)}
          {this.renderPosts()}
        </div>
      )
    }
    if(this.state.editing) {
      return (
        <UserForm 
          updateForm 
          user={getUserById} 
          toggleEditing={this.toggleEditing} 
          {...this.props} 
        />
      )
    }

  }
  render() {
    const { loading, getUserById } = this.props.data;

    if (loading) { return <Spin /> }
    return (
        <div>
          <Button onClick={this.toggleEditing}>
            {!this.state.editing ? 'Edit' : 'Cancel'}
          </Button>
          <Popconfirm 
            title="Are you sure you want to delete this user?" 
            onConfirm={this.onDelete} 
            okText="Yes" 
            cancelText="No"
          >
            <Button>DELETE USER</Button>
          </Popconfirm>

          {this.renderContent()}

        </div>
    );
  }
}

let options = (props) => {
    let variables = { _id: props.params._id };
    return { 
      variables,
      name: 'user'
    } 
}

//
// EXPORT
// ===================================
export default graphql(GET_USER_BY_ID, { options })(
  graphql(ADMIN_DELETE_USER, { name: 'adminDeleteUser'})(AdminUsersSinglePage)
);

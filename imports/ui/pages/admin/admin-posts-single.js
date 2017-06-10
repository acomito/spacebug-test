// TOP LEVEL IMPORTS
import React from 'react';
import { browserHistory } from 'react-router';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_POST_BY_ID, GET_POSTS } from '../../apollo/queries';
//import { ADMIN_DELETE_USER } from '../../apollo/mutations';
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
class AdminPostsSingle extends React.Component {
  state = { editing: false }
  onDelete = () => {
    const { _id } = this.props.data.getUserByIdAdmin;
    let variables = { _id };
    let refetchQueries = [{ query: GET_POSTS }]
    this.props.adminDeleteUser({ variables, refetchQueries }).then(res => {
      return browserHistory.push('/admin/users')
    })
  }
/*  renderTickets = () => {
    const { loading, getUserByIdAdmin } = this.props.data;
    if (getUserByIdAdmin.tickets && getUserByIdAdmin.tickets.length > 0) {
      return (
        <div>
          <h2 style={{marginTop: 20}}>TICKETS</h2>
          { getUserByIdAdmin.tickets.map( item => {
            return (
              <DataLink
                key={item._id}
                linkType={'tickets'} 
                item={item}
                linkLabel={item._id}
              />
            );
          })}
        </div>
      )
    } 

  }*/
  toggleEditing = () => {
    let currentState = this.state.editing;
    this.setState({ editing: !currentState })
  }
  renderContent = () => {
    const { loading, post } = this.props.data;
    if(!this.state.editing) {
      return (
        <div>
          <h2 style={{marginTop: 20}}>DATA</h2>
          <DataRow 
            label={'id'} 
            value={post._id} 
          />
          <DataRow 
            label={'title'} 
            value={post.title} 
          />
          <DataRow 
            label={'description'} 
            value={post.description} 
          />
          <DataRow 
            label={'numberOfLikes'} 
            value={post.numberOfLikes} 
          />
          <DataRow 
            label={'numberOfComments'} 
            value={post.numberOfComments} 
          />
          <DataRow 
            label={'created by'} 
            value={(
              <DataLink 
                item={post.owner} 
                linkType={'users'} 
                linkLabel={post.owner.profile.firstName} 
              />
            )} 
          />
          <DataRow 
            label={'status'} 
            value={post.status} 
          />
          <h3 style={{color: '#888'}}>Roles:</h3>
          {/*post.roles && post.roles.map( item => <Tag key={item} color="#2db7f5"> {item} </Tag>)*/}
          {/*this.renderTickets()*/}
        </div>
      )
    }
    if(this.state.editing) {
      return null
/*      return (
        <UserForm 
          updateForm 
          post={post} 
          toggleEditing={this.toggleEditing} 
          {...this.props} 
        />
      )*/
    }

  }
  render() {
    const { loading, post } = this.props.data;

    if (loading) { return <Spin /> }
      console.log(post)
    return (
        <div>
          <Button onClick={this.toggleEditing}>
            {!this.state.editing ? 'Edit' : 'Cancel'}
          </Button>
          {/*<Popconfirm 
            title="Are you sure you want to delete this user?" 
            onConfirm={this.onDelete} 
            okText="Yes" 
            cancelText="No"
          >
            <Button>DELETE USER</Button>
          </Popconfirm>
*/}
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

//graphql(ADMIN_DELETE_USER, { name: 'adminDeleteUser'})(AdminUsersSinglePage)
// EXPORT
// ===================================
export default graphql(GET_POST_BY_ID, { options })(AdminPostsSingle);

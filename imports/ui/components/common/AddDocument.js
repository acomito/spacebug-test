//top-level imports
import React from 'react';
import { browserHistory, Link } from 'react-router';
//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Dropdown from 'antd/lib/dropdown';
// MODULES
import { logout } from 'meteor-apollo-accounts'
import ApolloClient from '/imports/ui/apollo/ApolloClient'
import { selectFilterByLabel, handleLogout } from '/imports/modules/helpers'
import { STATUS_OPTIONS, CATEGORY_OPTIONS } from '/imports/modules/config'
// APOLLO
import { graphql } from 'react-apollo';
import { CREATE_POST } from '/imports/ui/apollo/mutations';
import { GET_POSTS } from '/imports/ui/apollo/queries';
import { SingleImageUpload } from './SingleImageUpload'
import PostForm from './PostForm'
// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option



class AddDocument extends React.Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div style={{display: 'inline'}}>
        <Button size="large" onClick={this.showModal} type='primary' icon="plus-circle-o">
          Add Junk
        </Button>
        <Modal
          title="Add Junk"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <PostForm handleCancel={this.handleCancel} {...this.props} />
        </Modal>
      </div>
    );
  }
}

export default graphql(CREATE_POST)(AddDocument);
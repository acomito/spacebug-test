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

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option



// EXPORTED COMPONENT
// ===================================
class AddDocumentForm extends React.Component {

  state = { 
    loading: false,
    image: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data, mutate, form } = this.props;
    this.setState({loading: true});

    form.validateFields((err, params) => {
      if (err) { return this.setState({loading: false}); }
      let variables = { 
        params: {
          ...params,
          image: this.state.image
        } 
      }
      let refetchQueries = [ 
        { query: GET_POSTS }
      ]
      this.props.mutate({ variables, refetchQueries }).then( res => {
        this.setState({loading: false, image: null});
        this.props.handleCancel();
        form.resetFields();
        message.success('your junk was posted!')
      })
      
    });

  }
  render(){
    const { user, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <SingleImageUpload
            defaultImage={this.state.image} 
            onSuccessfulUpload={(image) => this.setState({image})} 
          />
          <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: false, message: 'Please input a title!' }]
          })(
            <Input placeholder="add a title..."  />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('description', {
            rules: [{ required: false, message: 'Please input a content!' }]
          })(
            <Input placeholder="add a description..." type="textarea" rows={4} />
          )}
        </FormItem>
        <FormItem label={'Category'}>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: 'Please input a category!' }],
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {CATEGORY_OPTIONS.map(item => {
                return <Option key={item} value={item}>{item}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label={'status'}>
          {getFieldDecorator('status', {
            rules: [{ required: true, message: 'Please input a status!' }],
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {STATUS_OPTIONS.map(item => {
                return <Option key={item} value={item}>{item}</Option>
              })}
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('price', {
            rules: [{ required: false, message: 'Please input a price!' }]
          })(
            <Input placeholder="add a price..."  />
          )}
        </FormItem>
        
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!this.state.loading ? 'Add Junk': 'Adding...'} 
          </Button>
        </FormItem>
      </Form>
    );
  }
}

AddDocumentForm = Form.create()(AddDocumentForm)


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
        <Button onClick={this.showModal} type='primary'>
          Add Junk
        </Button>
        <Modal
          title="Add Junk"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddDocumentForm handleCancel={this.handleCancel} {...this.props} />
        </Modal>
      </div>
    );
  }
}

export default graphql(CREATE_POST)(AddDocument);
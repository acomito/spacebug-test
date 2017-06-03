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
import { handleLogout } from '/imports/modules/helpers';
//modules
import { logout } from 'meteor-apollo-accounts'
import ApolloClient from '/imports/ui/apollo/ApolloClient'
import { selectFilterByLabel } from '/imports/modules/helpers'

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option


const HELP_MESSAGE_TOPICS = [
  'Bug Report',
  'Help or Question',
  'Other'
];

// EXPORTED COMPONENT
// ===================================
class HelpForm extends React.Component {

  state = { 
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data, mutate, form } = this.props;
    this.setState({loading: true});

    form.validateFields((err, values) => {
      if (err) { return this.setState({loading: false}); }
      setTimeout(()=> {
        this.setState({loading: false});
        this.props.handleCancel();
        form.resetFields();
        message.success('we sent your invite!')
      }, 2000)
      
    });

  }
  render(){
    const { user, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        {/*<FormItem label={'Topic'}>
          {getFieldDecorator('topic', {
            rules: [{ required: true, message: 'Please input a Topic!' }],
          })(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {HELP_MESSAGE_TOPICS.map(item => {
                return <Option key={item} value={item}>{item}</Option>
              })}
            </Select>
          )}
        </FormItem>*/}
        <FormItem>
          {getFieldDecorator('recipientEmail', {
            rules: [
              { required: true, message: 'Please input a email!' },
              { type: 'email', message: 'The input is not valid E-mail!'}
            ]
          })(
            <Input prefix={<Icon type="mail" />}  placeholder="add a email..."  />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('messageValue', {
            rules: [{ required: false, message: 'Please input a Description!' }]
          })(
            <Input placeholder="Question or Comment..." type="textarea" rows={4} />
          )}
        </FormItem>
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            {!this.state.loading ? 'Send Invite': 'Inviting...'} 
          </Button>
        </FormItem>
      </Form>
    );
  }
}

HelpForm = Form.create()(HelpForm)


class InviteModal extends React.Component {
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
        <Link onClick={this.showModal} style={{color: '#888', right: 145, position: 'absolute'}}>
          <Icon type="plus-circle" style={{marginRight: 5}} />
          Invite a Friend
        </Link>
        <Modal
          title="Invite a Friend"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <HelpForm handleCancel={this.handleCancel} />
        </Modal>
      </div>
    );
  }
}

export default InviteModal;
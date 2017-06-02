import React from 'react';
import { Link, browserHistory } from 'react-router';
//ANTD
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';
//modules
import { handlePasswordChange } from '/imports/modules/helpers';
import { changePassword } from 'meteor-apollo-accounts'
import ApolloClient from '/imports/ui/apollo/ApolloClient'


const FormItem = Form.Item;

  const styles = {
    cardStyles: {
      "width": 400,
      "margin": "auto",
      "marginTop": "40px",
      "padding": "20px",
    },
    textField: {
      display: "block",
      width: "70%",
      margin: "auto",
      background: "#ffffff",
      backgroundColor: "#ffffff",
      marginBottom: "20px",
    },
  };



export const ChangePassword = Form.create()(React.createClass({
  getInitialState () {
    return {
      loading: false,
      errors: []
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    let errors = [];
    this.setState({loading: true, errors});

    this.props.form.validateFields((err, values) => {
      if (err) { failure(); return; }

      if (!err) {
        let { oldPassword, newPassword } = values;
        changePassword({oldPassword, newPassword}, ApolloClient).then(item => {
          message.success('password changed!')
          this.props.form.resetFields();
          return this.setState({loading: false});
        })
        .catch(e => {
          return this.setState({loading: false});
        })
      }
    });

  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Your passwords that you entered are inconsistent!');
    } else {
      callback();
    }
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <Card title='Change Password' style={{width: 450, margin: 'auto'}}>
      <Form onSubmit={this.handleSubmit} >
      <Row gutter={15} type="flex" justify="center" align="middle"  >
      <Col span='24'>
        <FormItem label='old password'>
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: 'Please input a Password!' }],
          })(
            <Input type="password" placeholder="Old Password" />
          )}
        </FormItem>
      </Col>
      <Col span='12'>
        <FormItem label='new password'>
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: 'Please input a Password!' }],
          })(
            <Input type="password" placeholder="New Password" />
          )}
        </FormItem>
      </Col>
      <Col span='12'>
        <FormItem label='confirm new password' hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" placeholder="Confirm Password" />
          )}
        </FormItem>
      </Col>
      <Col span='24'>
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            CHANGE PASSSWORD
          </Button>
        </FormItem>
      </Col> 
      </Row>
      </Form>
      </Card>
    );
  },
}));
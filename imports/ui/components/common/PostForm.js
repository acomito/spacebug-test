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
import { selectFilterByLabel, handleLogout } from '/imports/modules/helpers'
import { STATUS_OPTIONS, CATEGORY_OPTIONS } from '/imports/modules/config'
// APOLLO
import ApolloClient from '/imports/ui/apollo/ApolloClient'
import { graphql, compose } from 'react-apollo';
import { CREATE_POST, SAVE_POST } from '/imports/ui/apollo/mutations';
import { GET_POSTS, GET_POST_BY_ID } from '/imports/ui/apollo/queries';
// COMPONENTS
import { SingleImageUpload } from './SingleImageUpload'

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option



// EXPORTED COMPONENT
// ===================================
class PostForm extends React.Component {

  state = { 
    loading: false,
    image: this.props && this.props.post && this.props.post.image || null,
  };
  onCreate = (variables, refetchQueries) => {
    const { data, form, updateForm } = this.props;
    this.props.createPost({ variables, refetchQueries }).then( res => {
      this.setState({loading: false, image: null});
      this.props.handleCancel();
      form.resetFields();
      message.success('successfully posted!')
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { data, form, updateForm } = this.props;
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

      return this.onCreate(variables, refetchQueries)

      
      
    });

  }
  render(){
    const { user, form, post } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
      <Row gutter={15}>
        <Col xs={24}>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: false, message: 'Please input a title!' }],
            })(
              <Input placeholder="add a title..."  />
            )}
          </FormItem>
        </Col>
        <Col xs={24}>
          <FormItem>
          {getFieldDecorator('description', {
            rules: [{ required: false, message: 'Please input a description!' }],
          })(
            <Input placeholder="add a description..." type="textarea" rows={4} />
          )}
        </FormItem>
        </Col>
        <Col xs={12}>
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
        </Col>
      <Col xs={12}>
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
        </Col>
 {/*         <Col xs={24}>
          <FormItem>
            {getFieldDecorator('price', {
              rules: [{ required: false, message: 'Please input a price!' }],
            })(
              <Input placeholder="add a price..."  />
            )}
          </FormItem>
        </Col>*/}
        <Col xs={24}>
          <div>
            <Button style={{margin: 10}} size="large" loading={this.state.loading} htmlType="submit" type='primary'>
                SUBMIT
              </Button>
          </div>
        </Col>
      </Row>

      </Form>
    );
  }
}

let options = (props) => {

  return {
    update: (store, { data }) => {
       try {
            const newData = store.readQuery({ query: GET_POSTS });
            console.log(newData)
        } catch (e) {
            console.log(e);
            console.log("Not updating store - Projects not loaded yet");
        }
      // Read the data from our cache for this query.
      //const data = store.readQuery({ query: CommentAppQuery });
      // Add our comment from the mutation to the end.
      //data.comments.push(submitComment);
      // Write our data back to the cache.
      //store.writeQuery({ query: CommentAppQuery, data });
    },
  }

}


export default compose(
  graphql(CREATE_POST, { name: 'createPost', options}),
  graphql(SAVE_POST, { name: 'savePost'})
)(
  Form.create()(PostForm)
);
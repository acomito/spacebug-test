// TOP LEVEL IMPORTS
import React from 'react';
import { Match } from 'meteor/check';
import _ from 'lodash';
import { browserHistory } from 'react-router'
// MODULES
import { handleLogout, ApolloRoles } from '../../../modules/helpers';
import { LoadingScreen } from '../../components/common';
// APOLLO
import { GET_USER_DATA } from '/imports/ui/apollo/queries';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// ANTD
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
// COMPONENTS
import { AppMenu } from './AppMenu'
import MainContent from './MainContent';


// CONSTANTS & DESTRUCTURING
// ====================================
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer, Sider } = Layout;



// EXPORTED COMPONENT
// ====================================
class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    const { documentElement, body } = document;
    let screenWidth = window.innerWidth || documentElement.clientWidth || body.clientWidth;
    this.state = {
      width: screenWidth,
      collapsed:  screenWidth < 741
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions() {
      const { documentElement, body } = document;
      this.setState({
        width: window.innerWidth || documentElement.clientWidth || body.clientWidth 
      });
  }
  componentWillReceiveProps({ user }){

    if (!user.loading && !user.user) {
      return browserHistory.push('/');
    }
    if (!user.loading && user.user && user.user.roles && user.user.roles.includes('admin')) {
      return browserHistory.push('/admin');
    }
  }
  componentDidMount() {
    const { loading, user } = this.props.user;

    window.addEventListener("resize", this.updateDimensions);

    if (!loading && !user) {
      return browserHistory.push('/');
    }
    if (!loading && user && user.roles && user.roles.includes('admin')) {
      return browserHistory.push('/admin');
    }
    
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  handleClick = (e) => {

    if (e.key === 'logout') { 
      return handleLogout(this.props.client, this);
    } else {
      browserHistory.push(e.key);
      return this.setState({ current: e.key });
    }
    
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick = (e) => {
    if (e.key === 'logout') { return handleLogout(this.props.client, this); }
    browserHistory.push(e.key);
    this.setState({ current: e.key });
    return;  
  }
  render(){
    const { routes, params, location, user } = this.props;

    if (user.loading) {
      return <LoadingScreen />
    }

    return (
      <Layout style={{minHeight: '100vh', width: '100vw', overflowX: 'hidden'}}>
        <MainContent {...this.props} toggle={this.toggle} collapsed={this.state.collapsed} />
      </Layout>
    );
  }
}


// EXPORT
// ====================================
export default graphql(GET_USER_DATA, { name: 'user' })(AppLayout)
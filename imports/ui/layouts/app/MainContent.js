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
import Card from 'antd/lib/card';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Dropdown from 'antd/lib/dropdown';
// MODULES
import { DEFAULT_AVATAR } from '/imports/modules/config';
import { handleLogout } from '/imports/modules/helpers';
// COMPONENTS

import HelpModal from '/imports/ui/components/common/HelpModal'
import InviteModal from '/imports/ui/components/common/InviteModal'

import { logout } from 'meteor-apollo-accounts'
import ApolloClient from '/imports/ui/apollo/ApolloClient'
import { breadCrumbRender } from '/imports/modules/helpers'

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;




const onLogout = () => {
  logout(ApolloClient).then(res => {
    ApolloClient.resetStore()
    browserHistory.push('/login')
  })
}

const menu = (
  <Menu>
    <Menu.Item>
      <Link to='/app/account'>My Profile</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to='/app/account' onClick={()=>onLogout()}>Logout</Link>
    </Menu.Item>
  </Menu>
);



export const getBreadcumbName = (route, routes) => {
  const lastRouteIndex = routes.length -1;
  if (lastRouteIndex) {
    return routes[lastRouteIndex].breadcrumbName
  }
}

const HeaderArea = ({ width, routes, params, children, collapsed, toggle, user }) => {
  return (
     <div>
      {/*collapsed && (
        <Icon 
          className="trigger" 
          type='menu-unfold' 
          onClick={()=>toggle()}
          style={{position: 'absolute', left: 0, top: 0, padding: '0px 12px', lineHeight: 40}} 
        />
      )*/}

      {width > 741 && <InviteModal user={user.user} />}
      {width > 741 && <HelpModal />}
      <Dropdown overlay={menu}>
        <img
          src={user.user && user.user.profile && user.user.profile.image ? user.user.profile.image : DEFAULT_AVATAR }
          style={{height: 40, width: 40, right: 20, top: 10, position: 'absolute', cursor: 'pointer'}}
        />
      </Dropdown>
    </div>
  );
}

const styles = {
  breadcrumbArea: {
    borderRadius: 0, 
    border: '1px solid #efefef', 
    background: '#fff', 
    padding: '5px 15px', 
    height: 100, 
    display: 'flex', 
    alighItems: 'top', 
    justifyContent: 'start'
  }
}

// EXPORTED COMPONENT
// ====================================
class MainContent extends React.Component {
  handleClick = (e) => {

    if (e.key === 'logout') { 
      return handleLogout(this.props.client, this);
    } else {
      browserHistory.push(e.key);
      return this.setState({ current: e.key });
    }

  }

  render(){
    const { routes, params, route, children, collapsed, toggle, width } = this.props
    return (
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
            {width < 741 &&  <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>toggle()} />}
            <Menu
              defaultSelectedKeys={[this.props.location.pathname]} 
              onClick={this.handleClick}
              mode="horizontal" 
              style={{ lineHeight: '64px' }}
            >
                
                {width > 741 && <Menu.Item key="/app">Home</Menu.Item>}
                {width > 741 && <Menu.Item key="/app/my-stuff">My Stuff</Menu.Item>}
                {width > 741 && <Menu.Item key="/app/friends">Friends</Menu.Item>}
            <HeaderArea {...this.props} />
            </Menu>
        </Header>
        {/*width < 741 && <Header style={{ background: '#fff', padding: 0 }}>
          <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>toggle()} />
          <HeaderArea {...this.props} />
        </Header>*/}
        <Content style={{ margin: 0 }}>
          <div style={{ padding: 10, paddingTop: 20,  minHeight: '65vh', maxWidth: '99%' }}>
            {React.cloneElement(children, {...this.props})}
          </div>
        </Content>
      </Layout>
    );
  }
}

export default MainContent;
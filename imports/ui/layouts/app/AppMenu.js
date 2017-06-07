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
import message from 'antd/lib/message';
import Icon from 'antd/lib/icon';
//modules

// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;
const MenuItemGroup = Menu.ItemGroup;


// EXPORTED COMPONENT
// ====================================
export const AppMenu = ({handleClick, location, toggle}) => {
  return (
    <div style={{height: '100%', width: 200, background: '#fff', paddingTop: 20}} >
      <Icon 
        type='close' 
        onClick={()=>toggle()} 
        style={{right: 10, top: 10, position: 'absolute'}}
      />
        
  <Menu 
    onClick={(key)=>handleClick(key)}  
    
    theme="light" 
    mode="inline" 
    defaultSelectedKeys={[location.pathname]}
  >

    <Menu.Item key="/app">
      <Icon type="tags-o" />
      <span className="nav-text">Home</span>
    </Menu.Item>
    <Menu.Item key="/app/my-stuff">
      <Icon type="dot-chart" />
      <span className="nav-text">My Stuff</span>
    </Menu.Item>
    <Menu.Item key="/app/friends">
      <Icon type="dot-chart" />
      <span className="nav-text">Friends</span>
    </Menu.Item>
  </Menu>
  </div>
  );
}
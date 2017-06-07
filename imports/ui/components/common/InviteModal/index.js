//top-level imports
import React from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
//antd
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
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
import { PRODUCTION_URL } from '/imports/modules/config'
import InviteForm from './InviteForm'
// CONSTANTS & DESTRUCTURING
// ====================================
const { Header, Content } = Layout;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option



const ModalContent = ({ user, handleCancel }) => {
  return (
    <div>
      <Card>
        <p>INVITE SOMEBODY NEW TO JUNKBOOK:</p>
        <p>{`${PRODUCTION_URL}/invite/${user._id}`}</p>
      </Card>
      <Card>
        <InviteForm handleCancel={handleCancel} />
      </Card>
    </div>
  );
}

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
        <Link onClick={this.showModal} style={this.props.linkStyles}>
          <Icon type="plus-circle" style={{marginRight: 5}} />
           {this.props.buttonText}
        </Link>
        <Modal
          title={this.props.modalTitle}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        > 
          <ModalContent user={this.props.user} handleCancel={this.handleCancel} />
          {/*<HelpForm handleCancel={this.handleCancel} />*/}
        </Modal>
      </div>
    );
  }
}


InviteModal.propTypes = {
  modalTitle: PropTypes.string,
  buttonText: PropTypes.string,
  user: PropTypes.object,
  linkStyles: PropTypes.object,
};

// Specifies the default values for props:
InviteModal.defaultProps = {
  modalTitle: 'Invite a Friend',
  buttonText: 'Invite a Friend',
  linkStyles: { color: '#888', right: 145, position: 'absolute' }
};

export default InviteModal;
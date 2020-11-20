// vendor modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// react modules
import _ from 'lodash';
import Button from '@hawk-ui/button';
import Table from '@hawk-ui/table';
import Modal from '@hawk-ui/modal';
import Create from './sections/Create';
// actions modules
import {
  createLeader,
} from './DashboardActions';

class Dashboard extends Component {
  static propTypes = {
    leaderList: PropTypes.object,
    leaderCreate: PropTypes.object,
    createLeader: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  dashboardHelper = (() => ({
    open: ({ isOpen = true } = {}) => {
      this.setState({
        isOpen,
      });
    },
    close: ({ isOpen = false } = {}) => {
      this.setState({
        isOpen,
      });
    },
  }))()

  onSubmit = (event) => {
    const formData = new FormData();

    formData.append('name', _.get(event, 'name'));
    formData.append('credit', _.get(event, 'credit'));
    formData.append('image', _.get(event, 'image'));
    this.props.createLeader(formData);
  };

  render() {
    const { isOpen } = this.state;
    const { leaderList, leaderCreate } = this.props;
    const tableHeader = [
      { key: 'company', title: 'Company', dataIndex: 'company' },
      { key: 'contact', title: 'Contact', dataIndex: 'contact' },
      { key: 'country', title: 'Country', dataIndex: 'country' },
      { key: 'action', title: 'Action', dataIndex: '', render: event => <span onClick={() => { console.log(event); }} style={{ cursor: 'pointer' }}>Delete</span> },
    ];
    const tableContent = [
      { id: 1, company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany' },
      { id: 2, company: 'Centro comercial Moctezuma', contact: '', country: 'Mexico' },
      { id: 3, company: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
      { id: 4, company: 'Island Trading', contact: 'Helen Bennett', country: 'UK' },
      { id: 5, company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: '' },
    ];

    console.log('query leaderList', leaderList);
    console.log('query leaderCreate', leaderCreate);
    return (
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard__section">
            <div className="dashboard__header">
              <div className="dashboard__header-title">Leaderboard List</div>
              <Button
                onClick={() => {
                  this.dashboardHelper.open();
                }}
              >
                <span>Add Leaders</span>
              </Button>
            </div>
            <div className="dashboard__desc">Create custom environments and assign them to sources. Labels must follow the key:value format, can only contain letters, numbers, hyphens or dashes and must begin with a letter.</div>
            <Table
              tableContent={tableContent}
              tableSearchContent={['email', 'type']}
            >
              <Table.SEARCH />
              <Table.CONTENT
                tableHeader={tableHeader}
              />
            </Table>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          hideCloseIcon
          type="dark"
          title="Add Leaders"
          onKeyDown={this.dashboardHelper.close}
          onClose={this.dashboardHelper.close}
        >
          <Create
            isOpen={isOpen}
            response=""
            onClick={this.dashboardHelper.close}
            onSubmit={(event) => { this.onSubmit(event); }}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leaderList: state.leaderList,
    leaderCreate: state.leaderCreate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createLeader,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

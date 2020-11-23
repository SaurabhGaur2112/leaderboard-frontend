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
  getLeaders,
  createLeader,
} from './DashboardActions';

class Dashboard extends Component {
  static propTypes = {
    leaderList: PropTypes.object,
    leaderCreate: PropTypes.object,
    getLeaders: PropTypes.func,
    createLeader: PropTypes.func,
  };

  state = {
    isOpen: false,
    pagination: {
      rangeDisplay: 3,
      size: 10,
      total: 100,
    },
  };

  componentDidMount() {
    this.props.getLeaders();
  }

  onSubmit = (event) => {
    const formData = new FormData();

    formData.append('name', _.get(event, 'name'));
    formData.append('credit', _.get(event, 'credit'));
    formData.append('image', _.get(event, 'image'));
    this.props.createLeader(formData);
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

  render() {
    const { isOpen, pagination } = this.state;
    const { leaderList, leaderCreate } = this.props;
    const tableHeader = [
      { key: 'id', title: '#', dataIndex: 'id' },
      {
        key: 'avatar',
        title: 'Avatar',
        dataIndex: '',
        render: event => (
          <img
            src={`${process.env.API_URL}/tmp/${event.image}`}
            className="dashboard__content-img"
          />
        ),
      },
      { key: 'name', title: 'Name', dataIndex: 'name' },
      { key: 'credit', title: 'Credits', dataIndex: 'score' },
    ];

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
            <div className="dashboard__desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            <Table
              tableContent={_.get(leaderList, 'data.data', [])}
              tableSearchContent={['name', 'score']}
            >
              <Table.SEARCH />
              <Table.CONTENT
                tableHeader={tableHeader}
                isLoading={true}
              />
              <Table.PAGINATION
                pageRangeDisplayed={pagination.rangeDisplay}
                itemsCountPerPage={pagination.size}
                totalItemsCount={pagination.total}
                onPaginationChange={(page) => {
                  console.log('query page', page);
                }}
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
            response={leaderCreate}
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
    getLeaders,
    createLeader,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

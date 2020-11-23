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
    content: {
      data: [],
      isLoading: false,
    },
    pagination: {
      id: 1,
      rangeDisplay: 3,
      size: 10,
      total: 0,
    },
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.props.getLeaders(pagination.id);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (!_.isEqual(_.get(nextProps.leaderList, 'data.data'), _.get(prevProps.leaderList, 'data.data'))) {
      this.setState((prevState) => {
        const content = { ...prevState.content };
        content.isLoading = true;
        return { content };
      });
      setTimeout(() => {
        this.setState((prevState) => {
          const content = { ...prevState.content };
          content.data = _.get(nextProps.leaderList, 'data.data', []);
          content.isLoading = false;
          return { content };
        });
      }, 500);
      this.setState((prevState) => {
        const pagination = { ...prevState.pagination };
        pagination.total = _.get(nextProps.leaderList, 'data.total', 0);
        return { pagination };
      });
    }
    if (_.isEqual(_.get(nextProps.leaderCreate, 'data.status'), 'success')) {
      this.dashboardHelper.close();
    }
  }

  onSubmit = (event) => {
    const { pagination } = this.state;
    const formData = new FormData();

    formData.append('name', _.get(event, 'name'));
    formData.append('credit', _.get(event, 'credit'));
    formData.append('image', _.get(event, 'image'));
    this.props.createLeader(pagination.id, formData);
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
    const { content, isOpen, pagination } = this.state;
    const { leaderCreate } = this.props;
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
              tableContent={content.data}
              tableSearchContent={['name', 'score']}
            >
              <Table.SEARCH />
              <Table.CONTENT
                tableHeader={tableHeader}
                isLoading={content.isLoading}
                isSorting
                sortBy={['id', 'name', 'score']}
              />
              <Table.PAGINATION
                pageRangeDisplayed={pagination.rangeDisplay}
                itemsCountPerPage={pagination.size}
                totalItemsCount={pagination.total}
                onPaginationChange={(page) => {
                  this.props.getLeaders(page);
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

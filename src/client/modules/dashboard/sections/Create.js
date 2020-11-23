// vendor modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react modules
import _ from 'lodash';
import Input from '@hawk-ui/input';
import Button from '@hawk-ui/button';
import Loader from '@hawk-ui/loader';
import FileUpload from '@hawk-ui/file-upload';

export default class Create extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    response: PropTypes.object,
    onClick: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  state = {
    leaderImage: null,
    leaderName: '',
    leaderCredit: '',
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen) {
      this.setState({
        leaderImage: null,
        leaderName: '',
        leaderCredit: '',
      });
    }
  }

  handleSubmit = () => {
    const { leaderImage, leaderName, leaderCredit } = this.state;
    const data = {
      image: leaderImage,
      name: leaderName,
      credit: leaderCredit,
    };
    if (!_.isEmpty(leaderName) && !_.isEmpty(leaderCredit)) {
      this.props.onSubmit(data);
    }
  };

  render() {
    const { leaderName, leaderCredit } = this.state;
    const { response, onClick } = this.props;

    return (
      <div className="dashboard-create">
        <div className="dashboard-create__section">
          <div className="dashboard-create__form">
            <div className="dashboard-create__form-field">
              <Input
                type="text"
                label="Leader Name"
                placeholder="Enter leader name"
                className="capitalize"
                value={leaderName}
                onChange={(event) => {
                  this.setState({
                    leaderName: event.target.value,
                  });
                }}
                isRequired
                description="You can change the application name later in the application settings."
              />
            </div>
            <div className="dashboard-create__form-field">
              <Input
                type="text"
                label="Credit Score"
                placeholder="Enter leader credit score"
                className="uppercase"
                value={leaderCredit}
                onChange={(event) => {
                  this.setState({
                    leaderCredit: event.target.value,
                  });
                }}
                isRequired
                description="You can change the application name later in the application settings."
              />
            </div>
            <div className="dashboard-create__form-field">
              <FileUpload
                title="Drag and Drop Image Here"
                description="Supported file types: (*.png, *.jpg, *.jpeg). View format instructions."
                isDraggable
                onUpload={(file) => {
                  this.setState({
                    leaderImage: file,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-create__button">
          <Button
            isDisabled={!(!_.isEmpty(leaderName) && !_.isEmpty(leaderCredit))}
            onClick={this.handleSubmit}
          >
            {_.get(response, 'isLoading') ? (
              <Loader />
            ) : (
              <span>Create</span>
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={onClick}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    );
  }
}

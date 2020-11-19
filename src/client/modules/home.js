// vendor modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react components
import Navbar from '../components/globals/Navbar';

class Home extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.array,
    ]),
  };

  state = {
    title: 'Leaderboard',
  };

  render() {
    const { children } = this.props;
    const { title } = this.state;

    return (
      <div className="home">
        <Navbar
          title={title}
        />
        {children}
      </div>
    );
  }
}

export default Home;

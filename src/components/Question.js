import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveToken } from '../redux/actions/gameActions';

class Question extends Component {
  state = {
    token: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    this.setState({
      token,
    });
    dispatch(saveToken(token));
  }

  render() {
    const { token } = this.state;
    return (
      <div>
        { token }
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Question);

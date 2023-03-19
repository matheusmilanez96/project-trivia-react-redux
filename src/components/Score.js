import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { score } }) => ({ score });

export default connect(mapStateToProps)(Score);

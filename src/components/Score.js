import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Score.css';

class Score extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className="div-score">
        <span
          className="header-score"
          data-testid="header-score"
        >
          {/* ⭐
          Pontos:
          {' '} */}
          { score }
        </span>
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { score } }) => ({ score });

export default connect(mapStateToProps)(Score);

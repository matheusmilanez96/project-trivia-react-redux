import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import Score from '../components/Score';

class Feedback extends Component {
  constructor() {
    super();
    this.rankingClick = this.rankingClick.bind(this);
  }

  rankingClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.rankingClick }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;

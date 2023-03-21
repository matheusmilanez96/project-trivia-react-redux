import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.rankingClick = this.rankingClick.bind(this);
  }

  loginClick() {
    const { history } = this.props;
    history.push('/');
  }

  rankingClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          {
            assertions < three ? <p>Could be better...</p> : <p>Well Done!</p>
          }
        </span>
        <button
          data-testid="btn-play-again"
          onClick={ this.loginClick }
        >
          Play Again
        </button>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

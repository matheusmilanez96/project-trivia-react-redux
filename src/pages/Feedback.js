import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.rankingClick = this.rankingClick.bind(this);
    this.loginClick = this.loginClick.bind(this);
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
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div className="div-feedback">
        <Header />
        <div className="div-feedback-text">
          <span data-testid="feedback-text" className="feedback-text">
            {
              assertions < three ? <p>Could be better... 😢</p> : <p>Well Done! 🎉🎆</p>
            }
          </span>
        </div>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <button
          className="feedback-button-play"
          data-testid="btn-play-again"
          onClick={ this.loginClick }
        >
          Play Again
        </button>
        <button
          className="feedback-button-ranking"
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

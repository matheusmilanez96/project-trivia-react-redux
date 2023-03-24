import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import Header from '../components/Header';
// import '../styles/Game.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="div-game">
        <Header />
        <Question history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;

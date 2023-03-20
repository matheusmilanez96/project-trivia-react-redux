import React, { Component } from 'react';
import Question from '../components/Question';
// import Score from '../components/Score';
import Header from '../components/Header';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;

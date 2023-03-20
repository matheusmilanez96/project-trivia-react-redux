import React, { Component } from 'react';
import Question from '../components/Question';
import Score from '../components/Score';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <div>
        <Question />
        <Score />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;

import React, { Component } from 'react';
import Question from '../components/Question';
import Timer from '../components/Timer';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <div>
        <Timer />
        <Question />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;

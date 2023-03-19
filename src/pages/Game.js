import React, { Component } from 'react';
import Question from '../components/Question';
// import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    return (
      <div>
        <Question />
      </div>
    );
  }
}

Game.propTypes = {

};

export default Game;

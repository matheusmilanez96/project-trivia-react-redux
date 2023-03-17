import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../helpers/shuffle';

class Answers extends Component {
  render() {
    const { answers } = this.props;
    const allAnswers = [answers.correct, ...answers.incorrects].map((answer, index) => (
      index === 0 ? {
        answer, correct: true,
      } : { answer, correct: false, index: index - 1 }
    ));
    console.log();

    return (
      <div data-testid="answer-options">
        {
          shuffle(allAnswers).map(({ answer, correct, index: ansIndex }, index) => (
            <button
              key={ index }
              data-testid={ correct ? 'correct-answer' : `wrong-answer-${ansIndex}` }
            >
              { answer }
            </button>
          ))
        }
      </div>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.objectOf(PropTypes.shape({
    correct: PropTypes.string,
    incorrects: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default Answers;

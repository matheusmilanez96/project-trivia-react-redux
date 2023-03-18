import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../helpers/shuffle';
import '../styles/Answers.css';

class Answers extends Component {
  state = {
    showAnswers: false,
  };

  render() {
    const { answers } = this.props;
    const { showAnswers } = this.state;
    const allAnswers = [answers.correct, ...answers.incorrects].map((answer, index) => (
      index === 0 ? {
        answer,
        correct: true,
        className: 'correct-answers',
      } : { answer, correct: false, index: index - 1, className: 'incorrect-answers' }
    ));

    return (
      <div data-testid="answer-options">
        {
          shuffle(allAnswers)
            .map(({ answer, correct, index: ansIndex, className }, index) => (
              <button
                onClick={ () => this.setState({ showAnswers: true }) }
                className={ showAnswers ? className : '' }
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

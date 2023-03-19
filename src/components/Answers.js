import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../helpers/shuffle';
import '../styles/Answers.css';

class Answers extends Component {
  state = {
    showAnswers: false,
    answersArray: [],
    timerIsZero: false,
  };

  componentDidMount() {
    const { answers } = this.props;
    const allAnswers = [
      answers.correct_answer,
      ...answers.incorrect_answers,
    ].map((answer, index) => (
      index === 0 ? {
        answer,
        correct: true,
        className: 'correct-answers',
      } : { answer, correct: false, index: index - 1, className: 'incorrect-answers' }
    ));
    this.setState({
      answersArray: shuffle(allAnswers),
    });
  }

  componentDidUpdate() {
    const { remaning } = this.props;
    const { timerIsZero } = this.state;

    if (remaning === 0 && !timerIsZero) {
      this.setState({
        timerIsZero: true,
        showAnswers: true,
      });
    }
  }

  render() {
    const { showAnswers, answersArray, timerIsZero } = this.state;
    const { stopTimer } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answersArray.map(({ answer, correct, index: ansIndex, className }, index) => (
            <button
              onClick={ () => {
                this.setState({ showAnswers: true });
                stopTimer();
              } }
              className={ showAnswers ? className : '' }
              key={ index }
              data-testid={ correct ? 'correct-answer' : `wrong-answer-${ansIndex}` }
              disabled={ timerIsZero }
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
  remaning: PropTypes.number.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default Answers;

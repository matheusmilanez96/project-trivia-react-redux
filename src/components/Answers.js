import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shuffle from '../helpers/shuffle';
import '../styles/Answers.css';
import { increaseScore } from '../redux/actions/playerActions';

class Answers extends Component {
  state = {
    showAnswers: false,
    answersArray: [],
    timerIsZero: false,
    questionDifficulty: '',
    click: false,
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
      questionDifficulty: answers.difficulty,
    });
  }

  componentDidUpdate() {
    const { remaining } = this.props;
    const { timerIsZero } = this.state;

    if (remaining === 0 && !timerIsZero) {
      this.setState({
        timerIsZero: true,
        showAnswers: true,
      });
    }
  }

  handleAnswerClick = (correct) => {
    const { stopTimer, dispatch, remaining } = this.props;
    const { questionDifficulty } = this.state;
    const difficultyPoints = { hard: 3, medium: 2, easy: 1 };

    this.setState({ showAnswers: true, click: true });
    stopTimer();
    if (correct) {
      dispatch(increaseScore({
        remaining,
        difficulty: difficultyPoints[questionDifficulty],
        assertions: 1,
      }));
    }
  };

  render() {
    const { showAnswers, answersArray, timerIsZero, click } = this.state;
    return (
      <div data-testid="answer-options">
        {
          answersArray.map(({ answer, correct, index: ansIndex, className }, index) => (
            <button
              onClick={ () => this.handleAnswerClick(correct) }
              className={ showAnswers ? className : '' }
              key={ index }
              data-testid={ correct ? 'correct-answer' : `wrong-answer-${ansIndex}` }
              disabled={ timerIsZero }
            >
              { answer }
            </button>
          ))
        }
        {
          click ? (
            <button data-testid="btn-next">Next</button>
          ) : ''
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
  remaining: PropTypes.number.isRequired,
  stopTimer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Answers);

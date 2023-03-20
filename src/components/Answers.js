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
    question: '',
  };

  componentDidMount() {
    this.updateAnswers();
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
    this.updateAnswers();
  }

  updateAnswers = () => {
    const { answers } = this.props;
    const { question } = this.state;

    if (question !== answers.question) {
      const allAnswers = [
        answers.correct_answer,
        ...answers.incorrect_answers,
      ];
      const answerWithInfo = allAnswers.map((answer, index) => (
        index === 0 ? {
          answer,
          correct: true,
          className: 'correct-answers',
        } : { answer, correct: false, index: index - 1, className: 'incorrect-answers' }
      ));

      this.setState({
        question: answers.question,
        answersArray: shuffle(answerWithInfo),
        questionDifficulty: answers.difficulty,
        showAnswers: false,
        timerIsZero: false,
        click: false,
      });
    }
  };

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
      }));
    }
  };

  render() {
    const { showAnswers, answersArray, timerIsZero, click } = this.state;
    const { onClickNext } = this.props;

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
            <button data-testid="btn-next" onClick={ onClickNext }>Next</button>
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
  onClickNext: PropTypes.func.isRequired,
};

export default connect()(Answers);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../redux/actions/gameActions';
import Answers from './Answers';
import Timer from '../helpers/timer';

const delay = 1000;

class Question extends Component {
  state = {
    actualQuestionIndex: 0,
    time: 30,
  };

  timer = new Timer(() => {
    const { time } = this.state;
    if (time === 0) this.timer.pause();
    else this.setState({ time: time - 1 });
  }, delay);

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
    this.timer.resume();
  }

  render() {
    const { questions, responseCode } = this.props;
    const { actualQuestionIndex, time } = this.state;
    const invalidTokenResponse = 3;

    if (responseCode === invalidTokenResponse) return <Redirect to="/" />;
    if (questions.length === 0) return <p>Loading...</p>;

    const {
      category,
      question,
    } = questions[actualQuestionIndex];

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <div>
          <p data-testid="question-text">{ question }</p>
        </div>
        <Answers
          answers={ questions[actualQuestionIndex] }
          remaning={ time }
          stopTimer={ () => this.timer.pause() }
        />
        <div>
          { `Timer: ${time}` }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  responseCode: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game: { questions, responseCode } }) => ({
  questions,
  responseCode,
});

export default connect(mapStateToProps)(Question);

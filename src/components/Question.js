import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../redux/actions/gameActions';
import Answers from './Answers';
import Timer from '../helpers/timer';
import '../styles/Question.css';
import imgTrivia from '../trivia.png';

const delay = 1000;

class Question extends Component {
  state = {
    actualQuestionIndex: 0,
    time: 30,
    actualQuestion: {},
    first: true,
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

  componentDidUpdate() {
    const { questions } = this.props;
    const { first } = this.state;

    if (questions.length !== 0 && first) {
      console.log(questions);
      this.setState({
        actualQuestion: questions[0],
        first: false,
      });
    }
  }

  nextButtonClick = () => {
    const { actualQuestionIndex: index } = this.state;
    const { questions, history } = this.props;
    const lastQuestionIndex = 4;
    if (index < lastQuestionIndex) {
      this.setState({
        actualQuestionIndex: index + 1,
        actualQuestion: questions[index + 1],
        time: 30,
      }, this.timer.resume);
    }
    if (index === lastQuestionIndex) history.push('/feedback');
  };

  render() {
    const { responseCode } = this.props;
    const { time, actualQuestion } = this.state;
    const invalidTokenResponse = 3;

    if (responseCode === invalidTokenResponse) return <Redirect to="/" />;
    if (Object.keys(actualQuestion).length === 0) return <span>Loading...</span>;

    return (
      <div className="div-question">
        <div className="div-logo-trivia">
          <img src={ imgTrivia } alt="logo" id="logo-trivia" />
        </div>
        <div className="div-question-category-text">
          <span
            data-testid="question-category"
            className="category"
          >
            { actualQuestion.category }
          </span>
          <div className="question-text">
            <span data-testid="question-text">{ actualQuestion.question }</span>
          </div>
        </div>
        <div>
          <Answers
            answers={ actualQuestion }
            remaining={ time }
            stopTimer={ this.timer.pause }
            onClickNext={ this.nextButtonClick }
          />
        </div>
        <div className="div-time">
          { `⏳: ${time}` }
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ game: { questions, responseCode } }) => ({
  questions,
  responseCode,
});

export default connect(mapStateToProps)(Question);

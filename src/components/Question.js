import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../redux/actions/gameActions';
import Answers from './Answers';

class Question extends Component {
  state = {
    actualQuestion: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  render() {
    const { questions, responseCode } = this.props;
    const { actualQuestion } = this.state;
    const invalidTokenResponse = 3;

    if (responseCode === invalidTokenResponse) return <Redirect to="/" />;

    if (questions.length === 0) return <p>Loading...</p>;

    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrects,
    } = questions[actualQuestion];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <div>
          <p data-testid="question-text">{ question }</p>
        </div>
        <Answers answers={ { correct, incorrects } } />
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

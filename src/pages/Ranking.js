import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetScore } from '../redux/actions/playerActions';
// import '../styles/Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      rankings: [],
    };

    this.homeClick = this.homeClick.bind(this);
  }

  componentDidMount() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    const lastScore = {
      src,
      name,
      score,
    };
    const parsedList = JSON.parse(localStorage.getItem('rankings-list'));
    let rankings = [];
    if (parsedList) {
      rankings = [...parsedList, lastScore];
    } else {
      rankings = [lastScore];
    }
    rankings.sort((a, b) => b.score - a.score);
    const listString = JSON.stringify(rankings);
    localStorage.setItem('rankings-list', listString);
    this.setState({
      rankings,
    });
  }

  homeClick() {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(resetScore());
  }

  render() {
    const { rankings } = this.state;
    return (
      <div className="div-ranking">
        <h1
          className="h1-ranking"
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          id="ranking-button-home"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homeClick }
        >
          Home
        </button>
        { rankings.map((person, index) => (
          <div key={ index } className="div-ranking-map">
            <img
              id="img-ranking"
              src={ person.src }
              alt="foto de perfil"
            />
            <span
              data-testid={ `player-name-${index}` }
              id="ranking-name"
            >
              { person.name }
            </span>
            <span
              data-testid={ `player-score-${index}` }
              id="ranking-score"
            >
              { person.score }
              {' '}
              🏆
            </span>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);

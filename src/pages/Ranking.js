import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homeClick }
        >
          Home
        </button>
        { rankings.map((person, index) => (
          <div key={ index }>
            <img
              src={ person.src }
              alt="foto de perfil"
            />
            <p data-testid={ `player-name-${index}` }>{ person.name }</p>
            <p data-testid={ `player-score-${index}` }>{ person.score }</p>
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
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);

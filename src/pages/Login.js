import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../redux/actions/gameActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { name: '', email: '', buttonDisabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.settingsClick = this.settingsClick.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.formValidation);
  };

  settingsClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  playClick = () => {
    const { dispatch, history: { push } } = this.props;
    dispatch(getToken());
    setTimeout(() => push('/game'), '2000');
  };

  formValidation = () => {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  render() {
    const { name, email, buttonDisabled } = this.state;
    const { loading } = this.props;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        <label htmlFor="name">
          Nome
          <input
            data-testid="input-player-name"
            id="input-player-name"
            placeholder="Name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            placeholder="E-mail"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ buttonDisabled }
          onClick={ () => this.playClick() }
        >
          Entrar
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsClick }
        >
          Configurações
        </button>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ login: { loading }, game: { token } }) => ({
  loading,
  token,
});

export default connect(mapStateToProps)(Login);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../redux/actions/gameActions';
import { savePersonalInfo } from '../redux/actions/loginActions';
import '../styles/Login.css';
import img from '../images/imagem-de-fundo.mp4';

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

  playClick = async () => {
    const { dispatch, history: { push } } = this.props;
    await dispatch(getToken());
    await dispatch(savePersonalInfo(this.state));
    push('/game');
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
      <div className="login-body">
        <div className="fundo">
          <video autoPlay loop muted className="bg_video">
            <source src={ img } type="video/mp4" />
          </video>
        </div>
        <div className="login-inputs-button">
          <label htmlFor="name">
            {/* Nome */}
            <input
              data-testid="input-player-name"
              id="input-player-name"
              placeholder="Nome"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            {/* E-mail */}
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
            className="login-button-play"
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
            onClick={ () => this.playClick() }
          >
            Play
          </button>

          <button
            className="login-button-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsClick }
          >
            Configurações
          </button>
        </div>
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

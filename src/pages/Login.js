import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { name: '', email: '', buttonDisabled: true };
  }

  render() {
    const { name, email, buttonDisabled } = this.state;

    return (
      <div>
        <label htmlFor="name">
          Nome
          <input
            data-testid="input-player-name"
            id="input-player-name"
            placeholder="Name"
            type="string"
            name="input-player-name"
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
            name="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </div>

    );
  }
}

export default Login;

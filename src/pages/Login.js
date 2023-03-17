import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { name: '', email: '', buttonDisabled: true };
    this.handleChange = this.handleChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.formValidation);
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
        >
          Entrar
        </button>
      </div>

    );
  }
}

export default Login;

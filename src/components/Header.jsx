import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Score from './Score';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();

    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto de perfil"
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <Score />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.gravatarEmail,
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

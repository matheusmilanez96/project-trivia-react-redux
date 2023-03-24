import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Score from './Score';
// import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();

    return (
      <div className="div-header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="foto de perfil"
          className="header-img"
        />
        <span
          data-testid="header-player-name"
          className="header-name"
        >
          {name}
        </span>
        <Score />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

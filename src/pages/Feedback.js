import React, { Component } from 'react';
import Header from '../components/Header';
// import Score from '../components/Score';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text" />
      </div>
    );
  }
}

export default Feedback;

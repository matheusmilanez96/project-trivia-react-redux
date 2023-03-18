// import { useState } from 'react';

// let [milisegundos, segundos] = [0, 0];
// let [dMilisegundos, dSegundos] = ['', ''];
// let interval = null;

// function Timer() {
//   const [timer, setTimer] = useState('00:00:00:00:000');

//   function actualizeDisplay() {
//     segundos <= 30 ? dSegundos = `0${segundos}` : dSegundos = segundos;

//     milisegundos <= 100 ? milisegundos < 10
//       ? dMilisegundos = `00${milisegundos}`
//       : dMilisegundos = `0${milisegundos}` : dMilisegundos = milisegundos;

//     setTimer(`${dSegundos}:${dMilisegundos}`);
//     console.log(`${dSegundos}:${dMilisegundos}`);
//   }

//   timerFunction = () => {
//     milisegundos += 10;
//     if (milisegundos >= 1000) {
//       segundos -= 1;
//       milisegundos = 0;
//     }

//     if (segundos = 30) {
//       milisegundos -= 1;
//       segundos = 0;
//     }
//     actualizeDisplay();
//   };

//   start = () => {
//     if (interval) return;

//     interval = setInterval(timerFunction, 30);
//   };

//   return (
//     <button
//       onClick={ star }
//       value="start"
//     >
//       Start

//     </button>
//   );
// }

// export default Timer;
import React, { Component } from 'react';

class Timer extends Component {
  state = {
    count: 30,
  };

  componentDidMount() {
    this.descending();
  }

  descending = () => {

  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <span>{`00:${count}`}</span>
      </div>
    );
  }
}

export default Timer;

// Referência: https://rossener.com/como-criar-um-timer-com-resume-pause-e-reset-usando-javascript/

class Timer {
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
  }

  resume = () => {
    this.timerId = setTimeout(() => {
      this.resume();
      this.callback();
    }, this.delay);
  };

  pause = () => {
    clearTimeout(this.timerId);
  };
}

export default Timer;

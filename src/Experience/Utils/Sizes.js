import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pizelRation = Math.min(window.devicePixelRatio, 2);

    window.addEventListener('resize', () => {
      // Update sizes
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pizelRation = Math.min(window.devicePixelRatio, 2);
      this.trigger('resize');
    });
  }
}

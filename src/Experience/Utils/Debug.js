import * as dat from 'lil-gui';
export default class Debug {
  constructor() {
    this.isDebugActive = window.location.hash === '#debug';
    if (this.isDebugActive) {
      this.ui = new dat.GUI();
    }
  }
}

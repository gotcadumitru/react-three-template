import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Debug from './Utils/Debug';
import EventEmitter from './Utils/EventEmitter';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import World from './World/World';
let instance = null;
export default class Experience extends EventEmitter {
  constructor(canvas) {
    // create global access
    super();

    if (instance) return instance;
    instance = this;

    window.experience = this;

    //options
    this.debug = new Debug();
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    //time tick event
    this.time.on('tick', () => {
      this.update();
    });

    //resize event
    this.sizes.on('resize', () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
  distroy() {
    this.sizes.off('resize');
    this.time.off('tick');
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.isDebugActive) {
      this.debug.ui.destroy();
    }
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        Object.keys(child.material).forEach((key) => {
          const value = child.material[key];
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
      }
    });
  }
}

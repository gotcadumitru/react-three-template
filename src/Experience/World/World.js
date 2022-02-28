import * as THREE from 'three';
import Experience from '../Experience';
import EventEmitter from '../Utils/EventEmitter';
import Environment from './Enviroment';
import Floor from './Floor';
import Fox from './Fox';
import Portal from './Portal/Portal';

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    //resources
    this.resources.on('loaded', () => {
      // this.floor = new Floor();
      this.fox = new Fox();
      this.portal = new Portal();
      this.enviroment = new Environment();
    });
  }
  update() {
    if (this.fox) {
      this.fox.update();
    }
    if (this.portal) {
      this.portal.update();
    }
  }
}

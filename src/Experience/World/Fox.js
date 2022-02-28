import * as THREE from 'three';
import { TEXTURE_NAME } from '../../defaults/defaults';
import Experience from '../Experience';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.isDebugActive) {
      this.debugFolder = this.debug.ui.addFolder('fox');
    }
    //setup
    this.resource = this.resources.items[TEXTURE_NAME.FOX_MODEL];

    this.setModal();
    this.setAnimations();
  }
  setModal() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setAnimations() {
    this.animations = {};
    this.animations.mixer = new THREE.AnimationMixer(this.model);
    this.animations.actions = {};

    this.animations.actions.idle = this.animations.mixer.clipAction(this.resource.animations[0]);
    this.animations.actions.walking = this.animations.mixer.clipAction(this.resource.animations[1]);
    this.animations.actions.running = this.animations.mixer.clipAction(this.resource.animations[2]);

    this.animations.actions.current = this.animations.actions.idle;
    this.animations.actions.current.play();
    this.animations.play = (name) => {
      const newAction = this.animations.actions[name];
      const oldAction = this.animations.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);
      this.animations.actions.current = newAction;
    };

    //Debug

    if (this.debug.isDebugActive) {
      const debugObject = {
        playIdle: () => this.animations.play('idle'),
        playWalking: () => this.animations.play('walking'),
        playRunning: () => this.animations.play('running'),
      };
      this.debugFolder.add(debugObject, 'playIdle');
      this.debugFolder.add(debugObject, 'playWalking');
      this.debugFolder.add(debugObject, 'playRunning');
    }
  }
  update() {
    this.animations.mixer.update(this.time.delta * 0.001);
  }
}

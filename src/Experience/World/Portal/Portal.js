import * as THREE from 'three';
import Experience from '../../Experience';
import PortalLight from './PortalLight';
import PoleLight from './PoleLight';
import Fireflies from './Fireflies';
import { PORTAL_DEFAULTS, TEXTURE_NAME } from '../../../defaults/defaults';
export default class Portal {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.portalLight = new PortalLight();
    this.poleLightA = new PoleLight(PORTAL_DEFAULTS.POLE_LIGHT_A);
    this.poleLightB = new PoleLight(PORTAL_DEFAULTS.POLE_LIGHT_B);
    this.fireflies = new Fireflies(35);

    //setup
    this.portalModel = this.resources.items[TEXTURE_NAME.PORTAL_MODEL];
    this.setTexture();
    this.setModel();
  }

  setTexture() {
    this.portalTexture = this.resources.items[TEXTURE_NAME.PORTAL_TEXTURE];
    this.portalTexture.flipY = false;
    this.portalTexture.encoding = THREE.sRGBEncoding;
    this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.portalTexture });
  }
  setModel() {
    this.portalModelScene = this.portalModel.scene;

    const bakedScene = this.portalModelScene.children.find((child) => child.name === PORTAL_DEFAULTS.BAKED);
    bakedScene.material = this.bakedMaterial;
    this.scene.add(this.portalModelScene);
  }
  update() {
    this.fireflies.update();
    this.portalLight.update();
  }
}

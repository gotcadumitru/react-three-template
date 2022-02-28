import * as THREE from 'three';
import { TEXTURE_NAME } from '../../../defaults/defaults';
import Experience from '../../Experience';
export default class PoleLight {
  constructor(poleLightName) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //setup
    this.setPoleLightModel(poleLightName);
    this.createPolLightMaterial();
    this.setModel();
  }
  setPoleLightModel(poleLightName) {
    const portalModel = this.resources.items[TEXTURE_NAME.PORTAL_MODEL];
    this.poleLight = portalModel.scene.children.find((child) => child.name === poleLightName);
  }
  createPolLightMaterial() {
    this.poolLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
  }
  setModel() {
    this.poleLight.material = this.poolLightMaterial;
    this.scene.add(this.poleLight);
  }

  update() {}
}

import * as THREE from 'three';
import Experience from '../../Experience';
import portalVertexShader from '../../../shaders/portal/vertex.glsl';
import portalFragmentShader from '../../../shaders/portal/fragment.glsl';
import { PORTAL_DEFAULTS, TEXTURE_NAME } from '../../../defaults/defaults';
export default class PortalLight {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    //setup
    this.setPortalLightModel();
    this.createPortalLight();
    this.setModel();
  }
  setPortalLightModel() {
    const portalModel = this.resources.items[TEXTURE_NAME.PORTAL_MODEL];
    this.portalLight = portalModel.scene.children.find((child) => child.name === PORTAL_DEFAULTS.PORTAL_LIGHT);
  }
  createPortalLight() {
    this.portalLightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: {
          value: new THREE.Color(0x222222),
        },
        uColorEnd: {
          value: new THREE.Color(0xffffff),
        },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    });
  }
  setModel() {
    this.portalLight.material = this.portalLightMaterial;
    this.scene.add(this.portalLight);
  }

  update() {
    this.portalLightMaterial.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}

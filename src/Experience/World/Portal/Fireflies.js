import * as THREE from 'three';
import Experience from '../../Experience';
import firefliesVertexShader from '../../../shaders/fireflies/vertex.glsl';
import firefliesFragmentShader from '../../../shaders/fireflies/fragment.glsl';
export default class Fireflies {
  constructor(firefliesCount = 30) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.firefliesCount = firefliesCount;
    this.createFireflies();
  }

  createFireflies() {
    this.firefliesGeometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(this.firefliesCount * 3);
    const scaleArray = new Float32Array(this.firefliesCount);
    for (let i = 0; i < this.firefliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
      positionArray[i * 3 + 1] = Math.random() * 1.5;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
      scaleArray[i] = Math.random() + 0.5;
    }
    this.firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    this.firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    //Material for fireflies
    this.firefliesMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: this.sizes.pizelRation },
        uSize: { value: 100 },
      },
      transparent: true,
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      blending: THREE.AdditiveBlending,
    });

    //points
    this.fireflies = new THREE.Points(this.firefliesGeometry, this.firefliesMaterial);
    this.scene.add(this.fireflies);
  }
  update() {
    this.firefliesMaterial.uniforms.uTime.value = this.time.elapsed * 0.0005;
  }
}

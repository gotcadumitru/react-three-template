import { TEXTURE_NAME, TEXTURE_TYPE } from '../defaults/defaults';

export default [
  {
    name: TEXTURE_NAME.ENVIRONMENT_MAP_COUBE_TEXTURE,
    type: TEXTURE_TYPE.CUBE_TEXTURE,
    path: [
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/nz.jpg',
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/pz.jpg',
    ],
  },
  {
    name: TEXTURE_NAME.FLOOR_COLOR_TEXTURE,
    type: TEXTURE_TYPE.TEXTURE,
    path: 'textures/dirt/color.jpg',
  },
  {
    name: TEXTURE_NAME.FLOOR_NORMAL_TEXTURE,
    type: TEXTURE_TYPE.TEXTURE,
    path: 'textures/dirt/normal.jpg',
  },
  {
    name: TEXTURE_NAME.FOX_MODEL,
    type: TEXTURE_TYPE.GLTF_MODEL,
    path: 'models/Fox/glTF/Fox.gltf',
  },
  {
    name: TEXTURE_NAME.PORTAL_MODEL,
    type: TEXTURE_TYPE.GLTF_MODEL,
    path: 'portal/threescene.glb',
  },
  {
    name: TEXTURE_NAME.PORTAL_TEXTURE,
    type: TEXTURE_TYPE.TEXTURE,
    path: 'portal/baked.jpg',
  },
];

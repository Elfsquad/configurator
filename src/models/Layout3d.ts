import { Mapped3dItems } from "./Configuration";

export interface Layout3d {
  configurationId: string;
  urn: string;
  imageUrl: string;
  /** Position in millimetres (attachment-node units, as the Autodesk viewer uses them). */
  x: number;
  /** Position in millimetres. */
  y: number;
  /** Position in millimetres. */
  z: number;
  /**
   * The same position in metres, the unit converted glTF models use. Absent on API
   * versions that predate it.
   */
  positionMeters?: { x: number; y: number; z: number };
  /** Rotation about the Y axis, in radians. */
  rotationY: number;
  mapped3dItems: Mapped3dItems;
  name: string;
}

export class Material {
  name = "Material";
  type = MaterialType.normal;
  color = "#ffffff";
  ambient = "#ffffff";
  emissive = "#000000";
  specular = "#111111";
  wireframe = false;
  map?: string = undefined;
  envMap?: string = undefined;
  alphaTest = 0;
  side = 0;
  transparent = false;
  opacity = 1;
  fog = false;
  lightMap?: string;
  specularMap?: string;
  normalMap?: string;
  bumpMap?: string;
  bumpScale = 1;
  shininess = 30;
  metal = false;
  reflectivity = 1;
  refractionRatio = 0.98;
  combine = 0;
  envMapMapping = 0;
  textureWrapX = 0;
  textureWrapY = 0;
  textureRepeatX = 1;
  textureRepeatY = 1;
  textureFlipY = false;
  previewImageUrl?: string;
}

export const MaterialType = {
  normal: 0,
  lambert: 1,
  phong: 2,
} as const;

export type MaterialType = (typeof MaterialType)[keyof typeof MaterialType];

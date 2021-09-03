import {Mapped3dItems} from "./Configuration";

export class Layout3d {
    configurationId: string;
    urn: string;
    x: number;
    y: number;
    z: number;
    rotationY: number;
    mapped3dItems: Mapped3dItems;
}

export class Material {
    name = 'Material';
    type = MaterialType.normal;
    color = '#ffffff';
    ambient = '#ffffff';
    emissive = '#000000';
    specular = '#111111';
    wireframe = false;
    map: string = undefined;
    envMap: string = undefined;
    alphaTest = 0;
    side = 0;
    transparent = false;
    opacity = 1;
    fog = false;
    lightMap: string = undefined;
    specularMap: string = undefined;
    normalMap: string = undefined;
    bumpMap: string = undefined;
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
    previewImageUrl: string;
}

export enum MaterialType {
    normal,
    lambert,
    phong
}
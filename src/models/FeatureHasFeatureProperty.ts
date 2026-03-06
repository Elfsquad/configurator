import { BaseEntity } from "./BaseEntity";
import { Feature } from "./Feature";
import { EntityId } from "./FeatureModelAttachmentNode";

export class FeatureProperty extends BaseEntity {
  name: string;
  type: FeaturePropertyTypes;
  single: boolean;
  "public": boolean;
  associatedFeatures: AssociatedFeatureProperty[];
  texts: FeaturePropertyText[];
  public static getEntityId(): EntityId {
    return EntityId.FeatureProperty;
  }
}

export class AssociatedFeatureProperty extends BaseEntity {
  featurePropertyId: string;
  featureId: string;
  feature: Feature;
  selectedFeatureCount?: number;

  public static getEntityId(): EntityId {
    return EntityId.AssociatedFeatureProperty;
  }
}

export class FeatureHasFeatureProperty extends BaseEntity {
  featurePropertyId: string;
  featureProperty: FeatureProperty;
  featureId: string;
  feature: Feature;
  value: number;
  textValue: string;
  associatedFeatureId: string;
  associatedFeature: Feature;

  public static getEntityId(): EntityId {
    return EntityId.FeatureHasFeatureProperty;
  }
}

export const FeaturePropertyTypes = {
  Input: 0,
  AssociatedFeatures: 1,
  Text: 2,
} as const;
export type FeaturePropertyTypes = (typeof FeaturePropertyTypes)[keyof typeof FeaturePropertyTypes];

export class FeaturePropertyText extends BaseEntity {
  value: string;
  languageIso: string;
  featurePropertyId: string;

  public static getEntityId(): EntityId {
    return EntityId.FeaturePropertyText;
  }
}

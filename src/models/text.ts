import { BaseEntity } from "./BaseEntity";
import { EntityId } from "./FeatureModelAttachmentNode";

export class FeatureText extends BaseEntity {
  type: FeatureTextType;
  languageIso: string;
  featureId: string;
  value: string;

  public static getEntityId(): EntityId {
    return EntityId.FeatureText;
  }
}

export const FeatureTextType = {
  Description: 0,
  ExtendedDescription: 1,
  MoreInfo: 2,
  Title: 3,
  PromptMessage: 4,
  QuotationText: 5,
} as const;
export type FeatureTextType = (typeof FeatureTextType)[keyof typeof FeatureTextType];

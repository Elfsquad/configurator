import { BaseEntity } from "./BaseEntity";
import { Category } from "./category";
import { FeatureType } from "./Configuration";
import { FeatureHasFeatureProperty } from "./FeatureHasFeatureProperty";
import { EntityId } from "./FeatureModelAttachmentNode";
import { FeatureText } from "./text";
import { VAT } from "./vat";

export class Feature extends BaseEntity {
  name: string;
  articleCode: string;
  type: FeatureType;
  isRecommendation: boolean;
  unitOfMeasure: UnitOfMeasurement;
  salesPrice: number;
  salesPriceLabel: string;
  minValue: number;
  maxValue: number;
  stepValue: number;
  packingUnit: number;
  cardImageUrl: string;
  vat: VAT;
  vatId: string;
  texts: FeatureText[];
  featureBlueprintId: unknown;
  featureCardImage: unknown;
  domain: unknown;
  category: Category;
  categoryId: string;
  subcategoryIds: string[];
  selected: boolean;
  threeDModelItems: string[];
  hiddenThreeDModelItems: string[];
  whereUsed: number;
  properties: FeatureHasFeatureProperty[];
  unitOfMeasurement: string;
  unitOfMeasurementId: string;
  tags: string[];
  marginPct: number;
  public disallowDiscount: boolean;

  public static getEntityId(): EntityId {
    return EntityId.Feature;
  }
}

export const UnitOfMeasurement = {
  Millimetre: 0,
  Centimetre: 1,
  Metre: 2,
  Pieces: 3,
  ºC: 4,
  m2: 5,
  m3: 6,
  Litre: 7,
  Hour: 8,
  Kilogram: 9,
  Gram: 10,
  Milligram: 11,
} as const;
export type UnitOfMeasurement = (typeof UnitOfMeasurement)[keyof typeof UnitOfMeasurement];

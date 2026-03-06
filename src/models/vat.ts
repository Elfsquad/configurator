import { BaseEntity } from "./BaseEntity";
import { EntityId } from "./FeatureModelAttachmentNode";

export class VAT extends BaseEntity {
  name: string;
  pct: number;
  defaultVat: boolean;
  includesVAT: boolean;

  static getEntityId(): EntityId {
    return EntityId.Vat;
  }
}

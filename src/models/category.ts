import { BaseEntity } from "./BaseEntity";
import { EntityId } from "./FeatureModelAttachmentNode";

export class Category extends BaseEntity {
  public subcategories: Category[];
  texts: CategoryText[];
  public parentId: string;
  public order: number;
  name: string;
  public linkedFeatures: number;

  public static getEntityId(): EntityId {
    return EntityId.Category;
  }
}

export class CategoryText extends BaseEntity {
  value: string;
  languageIso: string;
  categoryId: string;

  public static getEntityId(): EntityId {
    return EntityId.CategoryText;
  }
}

export interface ConfigurationModels {
  categories: ConfigurationModelCategory[];
  features: ConfigurationModel[];
  languages: { [iso: string]: string };
  language: string;
}

export interface ConfigurationModelCategory {
  id: string;
  name: string;
  attachedFeatureIds: string[];
  subcategories: ConfigurationModelCategory[];
}

export interface ConfigurationModel {
  featureModelId: string;
  featureId: string;
  articleCode: string;
  name: string;
  description: string;
  extendedDescription: string;
  moreInfo: string;
  imageUrl: string;
  startingPriceExclVat: string;
  startingPriceInclVat: string;
}

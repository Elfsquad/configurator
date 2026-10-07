export interface ProductFinderQuestionnaire {
  questions: ProductFinderQuestion[];
}

export interface ProductFinderQuestion {
  id: string;
  multiSelect: boolean;
  texts: ProductFinderText[];
  answers: ProductFinderAnswer[];
}

export interface ProductFinderAnswer {
  id: string;
  texts: ProductFinderText[];
  scores: ProductFinderScore[];
}

export interface ProductFinderText {
  languageIso: string;
  value: string;
}

export interface ProductFinderScore {
  featureModelId: string;
  /** Integer; may be negative. */
  score: number;
}

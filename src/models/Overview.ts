import { ConfigurationFeature } from "./Configuration";
import { Layout2d } from "./Layout2d";

export interface Text {
  value: string;
  languageIso: string;
  stepId: string;
  type: number;
  id: string;
  creatorId: string;
  synced: boolean;
  inactive: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface Line {
  feature: ConfigurationFeature;
  depth: number;
}

export interface VisibleSteps {
  featureModelId?: string | number;
  type: number;
  texts: Text[];
  order: number;
  configuratorImages: Layout2d[];
  hotspots: never[];
  cameraPositions: never[];
  requiredHotspots: boolean;
  listviewEnabled: boolean;
  sendDataOnConfigurationUpdate: boolean;
  visibleNodes: string[];
  useStepImageAsConfigurationImage: boolean;
  hideInOrderEntry: boolean;
  hideInShowroom: boolean;
  hideInShowroomOverview: boolean;
  hideOnDocument: boolean;
  id: string;
  creatorId: string;
  synced: boolean;
  inactive: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface Overview {
  configurationId: string;
  configurationCode: string;
  root: ConfigurationFeature;
  lines: Line[];
  visibleSteps: VisibleSteps;

  basePrice: string;
  additionalPrice: string;
  totalPrice: string;
}

export type OverviewGroups = {
  groups: Overview[];
};

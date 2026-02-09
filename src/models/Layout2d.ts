export enum Layout2dType {
  Standard = 0,
  Magnifier = 1,
}

export class Layout2d {
  id: string;
  stepId: string;
  x: number;
  y: number;
  z: number;
  type: Layout2dType;
  url: string;
  featureModelNodeIds: string[];
  isHidden: boolean;
  creatorId: string;
  synced: boolean;
  inactive: boolean;
  createdDate: string;
  updatedDate: string;
  organizationId?: string;
  reference?: string;
}

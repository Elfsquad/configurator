export const Layout2dType = {
  Standard: 0,
  Magnifier: 1,
} as const;

export type Layout2dType = (typeof Layout2dType)[keyof typeof Layout2dType];

export interface Layout2d {
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

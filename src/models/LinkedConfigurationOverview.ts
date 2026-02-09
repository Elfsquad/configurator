export interface LinkedConfigurationOverview {
  configurations: LinkedConfigurationOverviewItem[];
}

export interface LinkedConfigurationOverviewItem {
  title: string;
  imageUrl: string;
  configurationId: string;
}

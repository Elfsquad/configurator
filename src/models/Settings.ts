export interface Settings {
  domain: string;
  requireLogin: boolean;
  primaryColor: string;
  accentColor: string;
  primaryFontColor: string;
  accentFontColor: string;
  fontFamily: string;
  faviconUrl: string;
  enableWelcomePage: boolean;
  enableProductPage: boolean;
  enableOverviewPage: boolean;
  enableMultipleConfigurations: boolean;
  productSelectionBackgroundUrl: string;
  welcomeBackgroundUrl: string;
  welcomeYoutubeId: string;
  welcomeTexts: WelcomePageText[];
  defaultLanguageIso: string;
  displayVat: boolean;
  logoUrl: string;
  lightLogoUrl?: string;
  languages: Language[];
  countries: Country[];
  selectedLanguageIso: string;
  languageIsos: string[];
  mandatoryCrmValues: string;
  mandatoryCrmContactValues: string;
  afterOrderText: string;
  quotationRequestRedirectUrl: string;
  quotationRequestedAction: number;
  allowDifferentShipToAddress: boolean;
  requiredQuotationFields: string[];
  customCss: string;
  enable3dFootprint: boolean;
  enable3dLabel: boolean;
  privacyPolicyAppendixIFrame: string;
  displayCreateQuotationInLastStep: boolean;
  displayedShowroomCrmFields: string[];
  googleAnalyticsCode: string;
  afterOrderTexts: AfterOrderText[];
  attachPdfToMail: boolean;
  sendMailToCustomer: boolean;
  defaultVatId: string;
  currencyIso: string;
  enableCustomFeatureModelSettings: boolean;
  showroomFeatureModelSettings: ShowroomFeatureModelSettings[];
  hideCustomerField: boolean;
  hideDeliveryDateField: boolean;
  hideRemarksField: boolean;
  hideShippingAddressField: boolean;
  checkoutQuotationPropertyIds: string[];
  onConfigurationLeavePopup: boolean;
  footerMessage?: string;
  copyrightMessage?: string;
  contactEmail?: string;
  welcomePageLayout?: WelcomePageLayout;
  sidebarPosition?: SidebarPosition;
  productPageTileSize?: ProductPageTileSize;
  productPageDefaultPageSize?: number;
  googleTagManagerContainerId?: string | null;
  enableRecaptcha?: boolean;
  recaptchaSiteKey?: string;
  enableConfigurator?: boolean;
  maintenanceMessage?: MaintenanceMessageText[];
}

export const WelcomePageLayout = {
  FullScreen: 0,
  SplitScreen: 1,
} as const;
export type WelcomePageLayout = (typeof WelcomePageLayout)[keyof typeof WelcomePageLayout];

export const SidebarPosition = {
  Left: 0,
  Right: 1,
} as const;
export type SidebarPosition = (typeof SidebarPosition)[keyof typeof SidebarPosition];

export const ProductPageTileSize = {
  Large: 0,
  Medium: 1,
  Small: 2,
} as const;
export type ProductPageTileSize = (typeof ProductPageTileSize)[keyof typeof ProductPageTileSize];

export interface WelcomePageText {
  languageIso: string | undefined;
  value: string | undefined;
  settingsId: string | undefined;
  showroomSettingsId: string | undefined;
  id: string | undefined;
  creatorId: string | undefined;
  synced: boolean | undefined;
  inactive: boolean | undefined;
  createdDate: string | undefined;
  updatedDate: string | undefined;
  subtitle: string | undefined;
}

export interface AfterOrderText {
  languageIso: string | undefined;
  value: string | undefined;
  settingsId: string | undefined;
  showroomSettingsId: string | undefined;
}

export interface ShowroomFeatureModelSettings {
  showroomSettingsId: string;
  featureModelId: string;
  allowedToSell: boolean;
  displayPrices: boolean;
}

export interface Language {
  iso: string;
  name: string;
  active: boolean;
  englishName: string;
}

export interface Country {
  iso: string;
  name: string;
  active: boolean;
  englishName: string;
  phonePrefix: string;
  capital: string;
}

export interface MaintenanceMessageText {
  languageIso?: string;
  subject?: string;
  value?: string;
  settingsId?: string;
}

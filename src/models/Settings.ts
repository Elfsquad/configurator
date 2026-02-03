
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
    languages: Language[];
    countries: Country[];
    selectedLanguageIso: string;
    languageIsos: string[];
    mandatoryCrmValues: string;
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
}

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

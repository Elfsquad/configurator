
export class Settings {
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
    enableMultipleConfigurations: boolean;
    productSelectionBackgroundUrl: string;
    welcomeBackgroundUrl: string;
    welcomeYoutubeId: string;
    welcomeTexts: WelcomePageText[];
    defaultLanguageIso: string;
    displayVat: boolean;
    logoUrl: string;
    selectedLanguageIso: string;
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
}

export class WelcomePageText {
    public languageIso: string | undefined;
    public value: string | undefined;
    public settingsId: string | undefined;
    public showroomSettingsId: string | undefined;
}

export class AfterOrderText {
    public languageIso: string | undefined;
    public value: string | undefined;
    public settingsId: string | undefined;
    public showroomSettingsId: string | undefined;
}

export class ShowroomFeatureModelSettings {

    showroomSettingsId: string;
    featureModelId: string;
    allowedToSell: boolean;
    displayPrices: boolean;
}
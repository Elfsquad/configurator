import { Material } from "./Layout3d";

export class Configuration {
    id: string;
    configurationModelId: string;
    root: ConfigurationFeature;
    linkedMachinesNode: ConfigurationFeature;
    steps: ConfigurationStep[];
    preconfigurationFeatures: ConfigurationFeature[];
    values: { [id: string]: ConfigurationValue };
    textValues: { [id: string]: string };
    language: string;
    currency: string;
    languages: { [iso: string]: string };
    basePriceExclVat: string;
    additionalPriceExclVat: string;
    totalPriceExclVat: string;
    totalPriceInclVat: string;
    totalPrice: number;
    autodeskUrn: string;
    autodeskIntegrationApplicationId: string;
    foreignAutodeskUrns: { [featureModelId: string]: string };
    conflicts: ConfigurationConflict[];
    threeDItemsToHide: string[];
    threeDItemMappings: { [featureModelId: string]: Mapped3dItems };
    linkedConfigurationModels: LinkedConfigurationModel[];
    linkedConfigurations: LinkedConfiguration[];
    requirements: ConfigurationRequirement[];
}

export class ConfigurationRequirement {
    nodeId: string;
    value: number;
}

export class LinkedConfigurationModel {
    parentNodeId: string;
    configurationModelId: string;
    configurationModelName: string;
    allowCardinality: boolean;
    allowMultiplier: boolean;
}

export class LinkedConfiguration {
    id: string;
    configurationId: string;
    parentNodeId: string;
    linkedConfigurationId: string;
    rootFeatureId: string;
    path: string;
    order: number;
    totalPrice: string;
    totalPriceInclVat: string;
    unitPrice: string;
    unitPriceInclVat: string;
    multiplier: number;
    name: string;
    combinedInView: boolean;
}

export class ConfigurationValue {
    selected: boolean;
    value: number;
}

export class Mapped3dItems {
    visibleItems: string[];
    hiddenItems: string[];
    itemColors: { [nodeId: string]: number[] };
    itemMaterials: { [objectId: string]: Material };
}

export class ConfigurationStep {
    id: string;
    title: string;
    type: StepType;
    features: ConfigurationFeature[];
    mainCameraPosition: CameraPosition;
    cameraPositions: CameraPosition[];

    thirdPartyUrl: string;
    sendDataOnConfigurationUpdate: boolean;
}

export class CameraPosition {
    featureModelNodeId: string;
    state: string;
}


export enum StepType {
    Hotspots = 2,
    ThreeD = 5,
    ThirdParty = 7
}

export class ConfigurationFeature {
    id: string;
    configurationId: string;
    configurationModelId: string;
    featureId: string;
    value: number;
    isDisabled: boolean;
    disabledReason: string;
    textValue: string;
    imageValue: string;
    isSelected: boolean;
    code: string;
    description: string;
    extendedDescription: string;
    moreInfo: string;
    unitOfMeasurement: string;
    imageUrl: string;
    type: FeatureModelRelationshipTypes;
    features: ConfigurationFeature[];
    isBestMatch: boolean;
    isMandatory: boolean;
    displayType: FeatureModelRelationshipDisplayType;
    hideInQuotation: boolean;
    unitPrice: string;
    unitPriceInclVat: string;
    totalPrice: string;
    totalPriceInclVat: string;
    threeDModelItems: string[];
    hiddenThreeDModelItems: string[];
    searchbarColumns: string[];
    featureType: FeatureType;
    minValue: number;
    maxValue: number;
}

export enum FeatureType {
    Feature = 0,
    ColorPicker = 2,
    Text = 3,
    Image = 4
}

export enum FeatureModelRelationshipDisplayType {
    Standard,
    Card,
    Dropdown,
    Mandatory,
    Searchbar,
    TableRow,
    NonDialogSearchbar
}

export enum FeatureModelRelationshipTypes {
    Optional = 0,
    Mandatory,
    Alternative,
    Or,
    Required,
    Excludes,
    Implies
}

export class ConfigurationConflict {
    feature: ConfigurationFeature;
    alternativeOptions: ConfigurationFeature[];
    type: ConflictType;
    requestedValue: number;
    actualValue: number;
}


export enum ConflictType {
    Add,
    Remove,
    Alternative,
    Value
}

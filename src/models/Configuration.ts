import { ConfiguratorContext } from "../configurator/ConfiguratorContext";
import { Material } from "./Layout3d";

export class Configuration {
    id: string;
    name: string;
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
    totalPriceExclVatNumber: number;
    totalPriceInclVatNumber: number;
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


    private _configuratorContext: ConfiguratorContext;

    constructor(configuratorContext: ConfiguratorContext, data: object) {
        this._configuratorContext = configuratorContext;
        this._applyConfigurationObject(data);
    }

    public async updateRequirement(featureModelNodeId: string, isSelection: boolean, value: number, ignoreConflicts: boolean = false, includeSearchbarResults: boolean = false): Promise<void> {
        let result = await this._configuratorContext._put(
            `${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}?ignoreConflicts=${ignoreConflicts}&includeSearchbarResults=${includeSearchbarResults}`, {
            featureModelNodeId,
            isSelection,
            value
        });
        this._applyConfigurationObject(await result.json());
        await this._configuratorContext._updateConfiguration(this);
    }

    public async updateText(featureModelNodeId: string, textValue: string): Promise<void> {
        let result = await this._configuratorContext._put(`${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}/text`, {
            featureModelNodeId,
            textValue
        });
        this._applyConfigurationObject(await result.json());
        await this._configuratorContext._updateConfiguration(this);
    }

    public async updateImage(featureModelNodeId: string, textValue: string): Promise<void> {
        const result = await this._configuratorContext._put(`${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}/image`, {
            featureModelNodeId,
            textValue
        });
        this._applyConfigurationObject(await result.json());
        await this._configuratorContext._updateConfiguration(this);
    }
  
    public async changeLanguage(languageIso: string): Promise<void> {
        let result = await this._configuratorContext._put(`${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}/changeLanguage`, languageIso);
        this._applyConfigurationObject(await result.json());
        await this._configuratorContext._updateConfiguration(this);
    }

    public async getStepImage(stepId: string, size: number = 1080, background: boolean = true): Promise<Blob>{
        let result = await this._configuratorContext._get(`${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}/image?stepId=${stepId}&size=${size}&background=${background}`);
        return result.blob();
    }

    public async getPdf(): Promise<Blob>{
        let result = await this._configuratorContext._get(`${this._configuratorContext._options.apiUrl}/configurator/1/configurator/${this.id}/pdf`);
        return result.blob();
    }

    private _applyConfigurationObject(data): void {
        if (this.conflicts) delete this.conflicts;
        
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
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
    iconUrl: string;
    mainCameraPosition: CameraPosition;
    cameraPositions: CameraPosition[];
    configuratorImages: ConfiguratorImage[];
    thirdPartyUrl: string;
    sendDataOnConfigurationUpdate: boolean;
}

export class ConfiguratorImage {
    z: number;
    isHidden: boolean;
    toggled: boolean;
    url: string;
    featureModelNodeIds: string[] = [];
    stepId: string;
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
    name: string;
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
    stepValue: number;
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
    NonDialogSearchbar,
    Slider,
    Input
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

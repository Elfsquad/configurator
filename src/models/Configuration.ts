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

  /**
   * Updates a requirement on this configuration. This can be used
   * to (de)select a feature or set a value on a feature.
   *
   * @example
   * ```typescript
   * const nodeId = '00000000-0000-0000-0000-000000000000';
   * const value = 1;
   * const isSelection = true;
   *
   * await configuration.updateRequirement(nodeId, isSelection, value);
   * ```
   *
   * @param featureModelNodeId The id of the feature model node to update
   * @param isSelection Whether the feature should be selected or not
   * @param value The value to set on the feature
   * @param ignoreConflicts If ture, the API will try to automatically
   * resolve conflicts.
   * @param includeSearchbarResults If true, the API will include
   * results in the display type searchbar.
   *
   * @returns A promise that resolves when the requirement has been updated
   */
  public async updateRequirement(
    featureModelNodeId: string,
    isSelection: boolean,
    value: number,
    ignoreConflicts: boolean = false,
    includeSearchbarResults: boolean = false
  ): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}?ignoreConflicts=${ignoreConflicts}&includeSearchbarResults=${includeSearchbarResults}`,
      {
        featureModelNodeId,
        isSelection,
        value,
      }
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Updates the text value of a feature on this configuration.
   *
   * @example
   * ```typescript
   * const nodeId = '00000000-0000-0000-0000-000000000000';
   * const textValue = 'Hello World';
   * await configuration.updateText(nodeId, textValue);
   * ```
   *
   * @param featureModelNodeId The id of the feature model node to update
   * @param textValue The text value to set on the feature
   *
   * @returns A promise that resolves when the text value has been updated
   */
  public async updateText(featureModelNodeId: string, textValue: string): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/text`,
      {
        featureModelNodeId,
        textValue,
      }
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Updates the image value of a feature on this configuration.
   *
   * @example
   * ```typescript
   * const nodeId = '00000000-0000-0000-0000-000000000000';
   * const textValue = 'https://example.com/image.png';
   * await configuration.updateImage(nodeId, textValue);
   * ```
   *
   * @param featureModelNodeId The id of the feature model node to update
   * @param textValue The image value to set on the feature
   *
   * @returns A promise that resolves when the image value has been updated
   */
  public async updateImage(featureModelNodeId: string, textValue: string): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/image`,
      {
        featureModelNodeId,
        textValue,
      }
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Updates the name of this or a linked configuration.
   *
   * @example
   * ```typescript
   * const name = 'My new configuration name';
   * await configuration.updateName(name);
   * ```
   *
   * @param name The new name of the configuration
   * @param linkedConfigurationId The id of the linked configuration to update
   *
   * @returns A promise that resolves when the name has been updated
   */
  public async updateName(
    name: string,
    linkedConfigurationId: string | null = null
  ): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/updatename`,
      {
        configurationId: linkedConfigurationId ?? this.id,
        name,
      }
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Updates the cardinality of a linked configuration.
   *
   * @example
   * ```typescript
   * const parentNodeId = '00000000-0000-0000-0000-000000000000';
   * const newCardinality = 2;
   * await configuration.updateCardinality(parentNodeId, newCardinality);
   * ```
   *
   * @param parentNodeId The id of the parent node of the linked configuration
   * @param cardinality The new cardinality of the linked configuration
   *
   * @returns A promise that resolves when the cardinality has been updated
   */
  public async updateCardinality(parentNodeId: string, cardinality: number): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/updatelinkedconfigurationcardinality`,
      {
        cardinality: cardinality,
        parentNodeId: parentNodeId,
      }
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Changes the language of this configuration.
   *
   * @example
   * ```typescript
   * const languageIso = 'en';
   * await configuration.changeLanguage(languageIso);
   * ```
   *
   * @param languageIso The ISO code of the language to change to
   * @returns A promise that resolves when the language has been changed
   * successfully
   */
  public async changeLanguage(languageIso: string): Promise<void> {
    const result = await this._configuratorContext._put(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/changeLanguage`,
      languageIso
    );
    this._applyConfigurationObject(await result.json());
    await this._configuratorContext._updateConfiguration(this);
  }

  /**
   * Retrieves a rendered image of a step in this configuration.
   *
   * @example
   * ```typescript
   * const stepId = '00000000-0000-0000-0000-000000000000';
   * const size = 1080;
   * const background = true;
   * const image = await configuration.getStepImage(stepId, size, background);
   * ```
   *
   * @param stepId The id of the step to render
   * @param size The size of the image to render
   * @param background Whether to render the background or not
   *
   * @deprecated use getLayout2d on the ConfiguratorContext instead
   * @returns A promise that resolves with the rendered image
   */
  public async getStepImage(
    stepId: string,
    size: number = 1080,
    background: boolean = true
  ): Promise<Blob> {
    const result = await this._configuratorContext._get(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/image?stepId=${stepId}&size=${size}&background=${background}`
    );
    return result.blob();
  }

  /**
   * Retrieves the PDF document for this configuration.
   *
   * @example
   * ```typescript
   * const context = new ConfiguratorContext();
   * const pdf = await configuration.getPdf();
   * ```
   *
   * @returns A promise that resolves with the PDF document
   */
  public async getPdf(): Promise<Blob> {
    const result = await this._configuratorContext._get(
      `${this._configuratorContext.options.apiUrl}/configurator/3/configurator/${this.id}/pdf`
    );
    return result.blob();
  }

  private _applyConfigurationObject(data): void {
    if (this.conflicts) delete this.conflicts;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}

export interface ConfigurationRequirement {
  nodeId: string;
  value: number;
}

export interface LinkedConfigurationModel {
  parentNodeId: string;
  configurationModelId: string;
  configurationModelName: string;
  allowCardinality: boolean;
  allowMultiplier: boolean;
}

export interface LinkedConfiguration {
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

export interface ConfigurationValue {
  selected: boolean;
  value: number;
}

export interface Mapped3dItems {
  visibleItems: string[];
  hiddenItems: string[];
  itemColors: { [nodeId: string]: number[] };
  itemMaterials: { [objectId: string]: Material };
}

export interface ConfigurationStep {
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
  configurationModelId: string;
}

export const ConfiguratorImageType = {
  Standard: 0,
  Magnifier: 1,
} as const;

export type ConfiguratorImageType =
  (typeof ConfiguratorImageType)[keyof typeof ConfiguratorImageType];

export interface ConfiguratorImage {
  id: string;
  x: number;
  y: number;
  z: number;
  type: ConfiguratorImageType;
  isHidden: boolean;
  toggled: boolean;
  url: string;
  featureModelNodeIds: string[];
  stepId: string;
  creatorId: string;
  synced: boolean;
  inactive: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface CameraPosition {
  featureModelNodeId: string;
  state: string;
}

export const StepType = {
  Welcome: 0,
  ProductSelection: 1,
  Hotspots: 2,
  ListView: 3,
  Overview: 4,
  ThreeD: 5,
  ThirdParty: 7,
} as const;

export type StepType = (typeof StepType)[keyof typeof StepType];

export interface ConfigurationFeature {
  id: string;
  configurationId: string;
  configurationModelId: string;
  featureId: string;
  parentId?: string;
  articleCode?: string;
  value: number;
  isDisabled: boolean;
  disabledReason: string;
  textValue?: string;
  imageValue: string;
  isSelected: boolean;
  code?: string;
  name: string;
  description: string;
  extendedDescription?: string;
  moreInfo?: string;
  unitOfMeasurement?: string;
  imageUrl: string;
  type: FeatureModelRelationshipTypes;
  features: ConfigurationFeature[];
  isBestMatch: boolean;
  isMandatory: boolean;
  displayType: FeatureModelRelationshipDisplayType;
  hideInQuotation: boolean;
  startingPriceExclVat?: string;
  startingPriceInclVat?: string;
  unitPrice: string;
  unitPriceInclVat: string;
  totalPrice: string;
  totalPriceExclVat: string;
  totalPriceInclVat: string;
  threeDModelItems: string[];
  hiddenThreeDModelItems: string[];
  searchbarColumns: string[];
  featureType: FeatureType;
  minValue: number;
  maxValue: number;
  stepValue: number;
  reference?: string;
  customProperties: CustomProperties;
}

export const FeatureType = {
  Feature: 0,
  ColorPicker: 2,
  Text: 3,
  Image: 4,
} as const;

export type FeatureType = (typeof FeatureType)[keyof typeof FeatureType];

export const FeatureModelRelationshipDisplayType = {
  Standard: 0,
  Card: 1,
  Dropdown: 2,
  Mandatory: 3,
  Searchbar: 4,
  TableRow: 5,
  NonDialogSearchbar: 6,
  Slider: 7,
  Input: 8,
} as const;

export type FeatureModelRelationshipDisplayType =
  (typeof FeatureModelRelationshipDisplayType)[keyof typeof FeatureModelRelationshipDisplayType];

export const FeatureModelRelationshipTypes = {
  Optional: 0,
  Mandatory: 1,
  Alternative: 2,
  Or: 3,
  Required: 4,
  Excludes: 5,
  Implies: 6,
} as const;

export type FeatureModelRelationshipTypes =
  (typeof FeatureModelRelationshipTypes)[keyof typeof FeatureModelRelationshipTypes];

export interface ConfigurationConflict {
  feature: ConfigurationFeature;
  alternativeOptions: ConfigurationFeature[];
  type: ConflictType;
  requestedValue: number;
  actualValue: number;
}

export const ConflictType = {
  Add: 0,
  Remove: 1,
  Alternative: 2,
  Value: 3,
} as const;

export type ConflictType = (typeof ConflictType)[keyof typeof ConflictType];

export interface CustomProperties {
  [name: string]: string[] | number[];
}

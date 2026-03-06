import { BaseEntity } from "./BaseEntity";

export class FeatureModelAttachmentNode extends BaseEntity {
  featureModelId: string;
  featureModelNode: string;
  name: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  attachTo: string;
  isVisible: boolean;

  featureModelNodeX: string;
  featureModelNodeY: string;
  featureModelNodeZ: string;
  featureModelNodeRotationY: string;

  public static getEntityId(): EntityId {
    return EntityId.FeatureModelAttachmentNode;
  }
}

export const EntityId = {
  CrmAccount: "crmAccount",
  CrmAccountEntityShare: "crmAccountEntityShare",
  EntityPropertyField: "entityPropertyField",
  EntityPropertyFieldText: "entityPropertyFieldText",
  EntityPropertyText: "entityPropertyText",
  EntityPropertyValue: "entityPropertyValue",
  OrganizationAddsFields: "organizationAddsFields",
  OrganizationDoesNotHaveProperty: "organizationDoesNotHaveProperty",
  Organization: "organization",
  Quotation: "quotation",
  QuotationDiscountLine: "quotationDiscountLine",
  QuotationFile: "quotationFile",
  QuotationFooter: "quotationFooter",
  QuotationGroup: "quotationGroup",
  QuotationLine: "quotationLine",
  QuotationPackingDifference: "quotationGroup",
  QuotationProperty: "quotationProperty",
  QuotationPropertyValue: "quotationPropertyValue",
  QuotationStatusChangeAction: "quotationStatusChangeAction",
  QuotationTemplate: "quotationTemplate",
  QuotationTemplateOrganization: "quotationTemplateOrganization",
  Vat: "vat",
  CrmAccountProperty: "crmAccountProperty",
  CrmAccountPropertyValue: "crmAccountPropertyValue",
  CrmContactProperty: "crmContactProperty",
  CrmContactPropertyValue: "crmContactPropertyValue",
  CrmContact: "crmContact",
  CrmDiscountLine: "crmDiscountLine",
  Feature: "feature",
  FeatureHasFeatureProperty: "featureHasFeatureProperty",
  FeaturePropertyText: "featurePropertyText",
  OrganizationSellsFeature: "organizationSellsFeature",
  AssociatedFeatureProperty: "associatedFeatureProperty",
  FeatureProperty: "featureProperty",
  UnitOfMeasurement: "unitOfMeasurement",
  UnitOfMeasurementText: "unitOfMeasurementText",
  FeatureText: "featureText",
  LinkedFeatureModelConstraint: "linkedFeatureModelConstraint",
  FeatureModelFile: "featureModelFile",
  Country: "country",
  Currency: "currency",
  ExchangeRate: "exchangeRate",
  Language: "language",
  CameraPosition: "cameraPosition",
  StepText: "stepText",
  Hotspot: "hotspot",
  OrganizationDomainName: "organizationDomainName",
  OrganizationType: "organization",
  OrganizationSellsFeatureModel: "organizationSellsFeatureModel",
  QuotationStatus: "quotationStatus",
  Step: "step",
  QuotationStatusChangeActionText: "quotationStatusChangeActionText",
  RequiredFields: "requiredFields",
  CustomButtonTrigger: "customButtonTrigger",
  CustomButtonTriggerText: "customButtonTriggerText",
  ExactOnlineApplicationTrigger: "exactOnlineApplicationTrigger",
  Integrations: "integrations",
  IntegrationApplication: "integrationApplication",
  IntegrationApplicationTrigger: "integrationApplicationTrigger",
  Settings: "settings",
  WelcomePageText: "welcomePageText",
  QuotationStatusText: "quotationStatusText",
  ShowroomFeatureModelSettings: "showroomFeatureModelSettings",
  AfterOrderText: "afterOrderText",
  Role: "role",
  User: "user",
  UserCreationRequest: "user",
  Configuration: "configuration",
  Category: "category",
  CategoryText: "categoryText",
  OrganizationHasChildOrganizationRelationship: "organization",
  FeatureModelAttachmentNode: "featureModelAttachmentNode",
  NetSuiteApplicationTrigger: "netSuiteApplicationTrigger",
  NewsItem: "newsItem",
  NewsItemText: "newsItem",
  NewsItemTitle: "newsItem",
  ShowroomSettings: "showroomSettings",
  Translations: "translations",
  Script: "script",
  ScriptTrigger: "scriptTrigger",
  File: "file",
  Notification: "notification",
  NotificationInstance: "notificationInstance",
  NotificationText: "notificationText",
  ConfigurationInputDefinition: "configurationInputDefinition",
  QuotationCustomMailText: "quotationCustomMailText",
  ConfiguratorImage: "configuratorImage",
  UserHasAccessToSuborganization: "userHasAccessToSuborganization",
  Expression: "expression",
  FeatureModelNode: "featureModelNode",
  FeatureModelRelationship: "featureModelRelationship",
  TextExpression: "textExpression",
  LinkedFeatureModel: "linkedFeatureModel",
  FeatureModelDynamicGroup: "featureModelDynamicGroup",
  FeatureModel: "featureModel",
  FeatureModelConstraint: "featureModelConstraint",
  PublishedFeatureModel: "publishedFeatureModel",
  AuditTrail: "auditTrail",
  FeatureModelEditorModel: "featureModelEditorModel",
  DatabaseSyncRecord: "databaseSyncRecord",
  QuotationRecommendationLine: "quotationRecommendationLine",
} as const;

export type EntityId = (typeof EntityId)[keyof typeof EntityId];

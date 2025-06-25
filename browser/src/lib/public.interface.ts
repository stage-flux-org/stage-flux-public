export type SitePublicId = string;
export type ExternalVisitorId = string;
export type ExternalVisitorTraits = object;

export interface IStageFluxPublicAPI {
  initialize(siteId: SitePublicId): void;

  getSiteId(): SitePublicId | undefined;

  identify(id: ExternalVisitorId, traits?: ExternalVisitorTraits | undefined): Promise<void>;

  traits(traits: ExternalVisitorTraits): Promise<void>;

  page(name: string, category: string): void;

  event(name: string, properties?: object | undefined): void;

  events(event: { name: string, properties?: object | undefined }[]): void;
}

export interface StageFluxPublicSettings {
  disablePageTracking?: boolean;
}

export interface WindowWithStageFlux extends Window {
  $StageFluxSettings: StageFluxPublicSettings | undefined;
  $StageFlux: IStageFluxPublicAPI | undefined;
}
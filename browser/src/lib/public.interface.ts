export type SiteId = string;
export type UserId = string;
export type UserTraits = object;

/**
 * Public API interface for StageFlux.
 */
export interface IStageFluxPublicAPI {
  /**
   * Initializes the StageFlux module using the provided site identifier.
   *
   * @param {SiteId} siteId - The identifier of the site to initialize with.
   * @return {void} This method does not return any value.
   */
  initialize(siteId: SiteId): void;

  /**
   * Retrieves the unique identifier of the site.
   *
   * @return {SiteId | undefined} The site's unique identifier, or undefined if not set.
   */
  getSiteId(): SiteId | undefined;

  /**
   * Identifies a user with the given ID and associates optional traits with the user.
   *
   * @param {UserId} id - The unique identifier of the user being identified.
   * @param {UserTraits} [traits] - Optional traits providing additional information about the user.
   * @return {Promise<void>} A promise that resolves when the identification process is complete.
   */
  identify(id: UserId, traits?: UserTraits | undefined): Promise<void>;

  /**
   * Track the given user traits.
   *
   * @param {UserTraits} traits - The user traits to be processed.
   * @return {Promise<void>} A promise that resolves when the processing is complete.
   */
  traits(traits: UserTraits): Promise<void>;

  /**
   * Tracks a page event
   *
   * @param {string} name - The name of the page to track
   * @param {string} category - The category under which the page is classified.
   * @return {void} This method does not return a value.
   */
  page(name: string, category: string): void;

  /**
   * Tracks an event with a specified name and optional properties.
   *
   * @param {string} name - The name of the event to be tracked.
   * @param {object} [properties] - An optional object containing additional event properties.
   * @return {void} This method does not return a value.
   */
  event(name: string, properties?: object | undefined): void;

  /**
   * Tracks a collection of events by processing their names and optional properties.
   *
   * @param {Array<{ name: string, properties?: object | undefined }>} event - An array of event objects where each object contains a mandatory event name and optional properties.
   * @return {void} This function does not return a value.
   */
  events(event: { name: string, properties?: object | undefined }[]): void;
}

/**
 * Represents the public settings for StageFlux.
 *
 * This interface allows configuration of specific settings
 * related to StageFlux's behavior. All properties are optional.
 *
 */
export interface StageFluxPublicSettings {
  /**
   * Indicates whether page tracking should be disabled.
   * When set to `true`, analytics or tracking services will not record
   * page views or navigational events. This can be useful in scenarios
   * where privacy concerns need to be addressed or during debugging phases
   * where tracking data is not required.
   */
  disablePageTracking?: boolean;
}

/**
 * Represents an extended version of the `Window` interface with additional properties related to StageFlux.
 * This interface is intended to provide access to StageFlux configurations and API through the global `window` object.
 *
 */
export interface WindowWithStageFlux extends Window {
  /**
   * Configuration settings for the StageFlux component.
   * The variable may contain public settings defined by the `StageFluxPublicSettings` type
   * or remain undefined if no configurations are provided.
   *
   * This variable is typically utilized to define or access global settings
   * that affect the behavior or appearance of the StageFlux.
   */
  $StageFluxSettings: StageFluxPublicSettings | undefined;

  /**
   * Represents the StageFlux API instance, which provides an interface to interact
   * with the public functionalities of the StageFlux system.
   *
   * This variable holds an object conforming to the IStageFluxPublicAPI interface or
   * is undefined if the API has not been initialized or is unavailable.
   *
   */
  $StageFlux: IStageFluxPublicAPI | undefined;
}
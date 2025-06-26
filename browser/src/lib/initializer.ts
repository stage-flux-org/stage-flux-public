import { IStageFluxPublicAPI, SiteId, WindowWithStageFlux } from './public.interface';
import { loadScriptAsync } from './utils/window.utils';

/**
 * Initializes the StageFlux API for the given site ID by loading the necessary script and setting up
 * the API if it is not already available in the specified window context.
 *
 * @param {SiteId} siteId - The unique identifier for the site to initialize with the StageFlux API.
 * @param {Object} [options] - Optional configuration for the initialization process.
 * @param {string} [options.scriptUrl] - The URL of the StageFlux script to load. Defaults to "https://visitor.stageflux.com".
 * @param {Window} [options.window] - The global window object to use. Defaults to the current window if not provided.
 * @return {Promise<IStageFluxPublicAPI>} A promise resolving to the initialized StageFlux public API instance.
 * @throws {Error} If the window object is not available.
 * @throws {Error} If the script fails to load or the StageFlux API fails to initialize.
 */
export async function init(siteId: SiteId, options?: {
  scriptUrl?: string;
  window?: Window;
}): Promise<IStageFluxPublicAPI> {
  const _window = options?.window ?? window;

  if (!_window) {
    throw new Error('[StageFlux] window object not available');
  }

  let stageFluxAPI = (<WindowWithStageFlux><any>_window).$StageFlux;

  if (stageFluxAPI) {
    return stageFluxAPI;
  }

  const scriptToLoad = options?.scriptUrl ?? 'https://visitor.stageflux.com';

  try {
    await loadScriptAsync(_window, scriptToLoad);
  } catch (e: any) {
    throw new Error(`[StageFlux] Failed to load script: ${ scriptToLoad }`, {
      cause: e,
    });
  }

  stageFluxAPI = (<WindowWithStageFlux><any>_window).$StageFlux;

  if (!stageFluxAPI) {
    throw new Error('[StageFlux] Failed to load StageFlux API');
  }

  stageFluxAPI.initialize(siteId);

  return stageFluxAPI;
}
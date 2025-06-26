import { IStageFluxPublicAPI, SitePublicId, WindowWithStageFlux } from './public.interface';
import { loadScriptAsync } from './utils/window.utils';

export async function init(siteId: SitePublicId, options?: {
  scriptUrl?: string;
}): Promise<IStageFluxPublicAPI> {
  if (!window) {
    throw new Error('[StageFlux] window object not available');
  }

  let stageFluxAPI = (<WindowWithStageFlux><any>window).$StageFlux;

  if (stageFluxAPI) {
    return stageFluxAPI;
  }

  const scriptToLoad = options?.scriptUrl ?? 'https://visitor.stageflux.com';

  try {
    await loadScriptAsync(window, scriptToLoad);
  } catch (e: any) {
    throw new Error(`[StageFlux] Failed to load script: ${ scriptToLoad }`, {
      cause: e,
    });
  }

  stageFluxAPI = (<WindowWithStageFlux><any>window).$StageFlux;

  if (!stageFluxAPI) {
    throw new Error('[StageFlux] Failed to load StageFlux API');
  }

  stageFluxAPI.initialize(siteId);

  return stageFluxAPI;
}
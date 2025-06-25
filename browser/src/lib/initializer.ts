import { IStageFluxPublicAPI, SitePublicId, WindowWithStageFlux } from './public.interface';
import { loadScriptAsync } from './utils/window.utils';

export async function init(siteId: SitePublicId): Promise<IStageFluxPublicAPI> {
  if (!window) {
    throw new Error('[StageFlux] window object not available');
  }

  let stageFluxAPI = (<WindowWithStageFlux><any>window).$StageFlux;

  if (stageFluxAPI) {
    return stageFluxAPI;
  }

  await loadScriptAsync(window, 'https://visitor.stageflux.com');

  stageFluxAPI = (<WindowWithStageFlux><any>window).$StageFlux;

  if (!stageFluxAPI) {
    throw new Error('[StageFlux] Failed to load StageFlux API');
  }

  stageFluxAPI.initialize(siteId);

  return stageFluxAPI;
}
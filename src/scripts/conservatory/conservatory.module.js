import { ConservatoryService } from './conservatory-service.js';
import { conservatoryDetails } from './details/conservatory-details.component.js';
import { conservatoryDrilldown } from './drilldown/conservatory-drilldown.component.js';

const conservatoryModule = angular
  .module('conservatories.conservatory', [])
  .service('conservatoryService', ConservatoryService)
  .component('conservatoryDetails', conservatoryDetails)
  .component('conservatoryDrilldown', conservatoryDrilldown);

export { conservatoryModule };

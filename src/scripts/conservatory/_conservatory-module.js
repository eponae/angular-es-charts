import conservatoryService from './conservatory-service.js';
import conservatoryDetails from './conservatory-details-component.js';
import conservatoryDrilldown from './conservatory-drilldown-component.js';

export default angular.module('conservatories.conservatory', [])
  .service('conservatoryService', conservatoryService)
  .component('conservatoryDetails', conservatoryDetails)
  .component('conservatoryDrilldown', conservatoryDrilldown);

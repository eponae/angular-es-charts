import zingchart from '../../../../node_modules/zingchart/index.js';
import conservatoryDrilldownTemplate from './conservatory-drilldown.html';

class ConservatoryDrilldownController {
  constructor(conservatoryService, errorService, $translate, $filter, $rootScope) {
    this.zingchart = zingchart;
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
    this.$translate = $translate;
    this.$filter = $filter;
    this.$rootScope = $rootScope;

    this.drillDownDataStructure = {};
    this.originalData = [];
    this.chartConfig = {
      id: 'myChart',
      height: '100%',
      width: '100%',
      data: {
        type: 'hbar',
        backgroundColor: 'transparent',
        plot: {
          cursor: 'pointer',
          valueBox: {
            text: '%t'
          }
        },
        series: [],
        scaleX: {
          item: {
            visible: false
          }
        }
      }
    };
  }

  static formatData(results) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach(key => {
      series.push({
        values: [results[key]],
        text: key.toString()
      });
    });

    return series;
  }

  formatDepartments(results) {
    const series = ConservatoryDrilldownController.formatData(results);
    this.chartConfig.data.series = series;
    this.departmentOptions = series.map(item => item.text);
    this.originalData = series;
  }

  setDrilldownData(department) {
    this.chartConfig.data.series = this.drillDownDataStructure[department].series;
  }

  formatPostalCodes(results, department) {
    this.drillDownDataStructure[department] = {
      series: ConservatoryDrilldownController.formatData(results)
    };
    this.setDrilldownData(department);
  }

  selectDepartment(department) {
    if (this.drillDownDataStructure[department]) {
      this.setDrilldownData(department);
    } else {
      this.conservatoryService.getAggregateByZipForADepartment(department).then(aggregatedData => {
        this.formatPostalCodes(aggregatedData, department);
      });
    }
  }

  resetChart() {
    this.chartConfig.data.series = this.originalData;
  }

  $onInit() {
    this.conservatoryService
      .getAggregateByDepartment()
      .then(data => {
        this.formatDepartments(data);
      })
      .catch(() => {
        this.$translate('error.main')
          .then(error => this.errorService.showSimpleToast(error))
          .catch(() => this.errorService.showSimpleToast('ERROR'));
      });
  }

  $onDestroy() {
    this.zingchart.exec('myChart', 'destroy');
  }
}

ConservatoryDrilldownController.$inject = [
  'conservatoryService',
  'errorService',
  '$translate',
  '$filter',
  '$rootScope'
];

const conservatoryDrilldown = {
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;

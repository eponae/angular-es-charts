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
    this.originalData = {};
    this.chartConfig = {
      id: 'myChart',
      height: '100%',
      width: '100%',
      data: {
        type: 'hbar',
        title: {
          backgroundColor: 'transparent',
          fontColor: 'black'
        },
        backgroundColor: 'transparent',
        plot: {
          cursor: 'pointer',
          valueBox: {
            text: '%t'
          }
        },
        series: [],
        level: 0,
        scaleX: {
          item: {
            visible: false
          }
        },
        shapes: [
          {
            x: 25,
            y: 20,
            size: 10,
            angle: -90,
            type: 'triangle',
            'background-color': '#c4c4c4',
            padding: 5,
            cursor: 'hand',
            id: 'backwards',
            'hover-state': {
              'border-width': 1,
              'border-color': '#000'
            }
          }
        ]
      }
    };
  }

  translateDepartmentList(numOfDeps = 0, callback = () => {
  }) {
    this.$translate('department.list')
      .then(departments => {
        this.chartConfig.data.title.text = numOfDeps + ' ' + departments;
        callback();
      })
      .catch(() => {
        this.chartConfig.data.title.text = numOfDeps;
        callback();
      });
  }

  formatDepartments(results) {
    const saveOriginalData = (numOfDeps) => {
      this.originalData = {
        numOfDeps: numOfDeps,
        series: angular.copy(this.chartConfig.data.series)
      };
    };

    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach(key => {
      series.push({
        values: [results[key]],
        text: 'Dep ' + key.toString(),
        'data-id': key.toString()
      });
    });

    this.chartConfig.data.series = series;
    saveOriginalData(resultsKeys.length);

    this.translateDepartmentList(resultsKeys.length);

    this.$rootScope.$on('$translateChangeEnd', () => {
      if (!this.chartConfig.level) {
        this.translateDepartmentList(resultsKeys.length);
      }
    });
  }

  setDrilldownData(dataId) {
    this.chartConfig.data.series = this.drillDownDataStructure[dataId].series;
    this.chartConfig.level = 1;

    this.$translate('department.title')
      .then(department => {
        this.chartConfig.data.title.text =
          this.$filter('upperFirstLetter')(department) + ' ' + dataId;
      })
      .catch(() => {
        this.chartConfig.data.title.text = dataId;
      });
  }

  formatPostalCodes(results, dataId) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach(key => {
      series.push({
        values: [results[key]],
        text: key.toString()
      });
    });

    this.drillDownDataStructure[dataId] = { series: series };
    this.setDrilldownData(dataId);
  }

  initChartNodeClickEvent() {
    this.zingchart.node_click = p => {
      const dataId = p['data-id'];
      if (this.drillDownDataStructure[dataId]) {
        this.setDrilldownData(dataId);
        this.zingchart.node_click = null;
      } else {
        this.conservatoryService
          .getAggregateByZipForADepartment(p['data-id'])
          .then(aggregatedData => {
            this.formatPostalCodes(aggregatedData, dataId);
            this.zingchart.node_click = null;
          });
      }
    };
  }

  initChartEvents() {
    this.initChartNodeClickEvent();

    this.zingchart.shape_click = () => {
      this.initChartNodeClickEvent();
      this.chartConfig.data.series = this.originalData.series;
      this.chartConfig.level = 0;
      this.translateDepartmentList(this.originalData.numOfDeps, () => {
        this.zingchart.exec('myChart', 'setdata', {
          data: this.chartConfig.data
        });
      });
    };
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

    this.initChartEvents();
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
  controllerAs: '$ctrl',
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;

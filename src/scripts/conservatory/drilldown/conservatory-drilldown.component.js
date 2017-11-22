import zingchart from '../../../../node_modules/zingchart/index.js';
import conservatoryDrilldownTemplate from './conservatory-drilldown.html';

class ConservatoryDrilldownController {
  constructor(conservatoryService, errorService, $translate, $filter) {
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
    this.$translate = $translate;
    this.$filter = $filter;
    this.drillDownDataStructure = {};
    this.chartData = {
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
    };
  }

  formatDepartments(results) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach(key => {
      series.push({
        values: [results[key]],
        text: 'Dep ' + key.toString(),
        'data-id': key.toString()
      });
    });

    this.chartData.series = series;

    this.$translate('department.list')
      .then(departments => {
        this.chartData.title.text = resultsKeys.length + ' ' + departments;
        this.originalData = angular.copy(this.chartData);
      })
      .catch(() => {
        this.chartData.title.text = resultsKeys.length;
        this.originalData = angular.copy(this.chartData);
      });
  }

  setDrilldownData(dataId) {
    const renderChart = () => {
      zingchart.render({
        id: 'myChart',
        data: this.chartData,
        height: '100%',
        width: '100%'
      });
    };

    this.chartData.series = this.drillDownDataStructure[dataId].series;

    this.$translate('department.title')
      .then(department => {
        this.chartData.title.text = this.$filter('upperFirstLetter')(department) + ' ' + dataId;
        renderChart();
      })
      .catch(() => {
        this.chartData.title.text = dataId;
        renderChart();
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

  initChartClickEvent() {
    zingchart.node_click = p => {
      const dataId = p['data-id'];
      if (this.drillDownDataStructure[dataId]) {
        this.setDrilldownData(dataId);
      } else {
        this.conservatoryService
          .getAggregateByZipForADepartment(p['data-id'])
          .then(aggregatedData => {
            this.formatPostalCodes(aggregatedData, dataId);
          });
      }
      zingchart.node_click = null;
    };
  }

  initChartEvents() {
    this.initChartClickEvent();

    zingchart.shape_click = () => {
      zingchart.exec('myChart', 'destroy');
      zingchart.render({
        id: 'myChart',
        data: this.originalData,
        height: '100%',
        width: '100%'
      });
      this.initChartClickEvent();
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
}

ConservatoryDrilldownController.$inject = [
  'conservatoryService',
  'errorService',
  '$translate',
  '$filter'
];

const conservatoryDrilldown = {
  controllerAs: '$ctrl',
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;

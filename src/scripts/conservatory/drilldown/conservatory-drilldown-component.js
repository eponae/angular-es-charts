import zingchart from '../../../../node_modules/zingchart/index.js';
import conservatoryDrilldownTemplate from './conservatory-drilldown.html';

class ConservatoryDrilldownController {
  constructor(conservatoryService, errorService) {
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
    this.drillDownDataStructure = {};
    this.chartData = {
      type: 'hbar',
      title: {
        backgroundColor: 'transparent',
        fontColor: 'black',
        text: 'Departments'
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
    this.chartData.title.text = resultsKeys.length + ' départements';
    this.originalData = angular.copy(this.chartData);
  }

  setDrilldownData(dataId) {
    this.chartData.title.text = 'Département ' + dataId;
    this.chartData.series = this.drillDownDataStructure[dataId].series;

    zingchart.render({
      id: 'myChart',
      data: this.chartData,
      height: '100%',
      width: '100%'
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
      .catch(() => this.errorService.showSimpleToast('Une erreur est survenue.'));

    this.initChartEvents();
  }
}

ConservatoryDrilldownController.$inject = ['conservatoryService', 'errorService'];

const conservatoryDrilldown = {
  controllerAs: '$ctrl',
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;

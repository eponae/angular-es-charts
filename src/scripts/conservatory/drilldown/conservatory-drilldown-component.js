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
      }
    };
  }

  formatDepartments(results) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach((key) => {
      series.push({
        values: [results[key]],
        text: 'Dep ' + key.toString(),
        'data-id': key.toString()
      });
    });

    this.chartData.series = series;
    this.chartData.title.text = resultsKeys.length + ' départements';
  }

  setDrilldownData(dataId) {
    this.chartData.title.text = 'Département ' + dataId;
    zingchart.exec('myChart', 'setseriesdata', {
      data: this.drillDownDataStructure[dataId].series
    });
  }

  formatPostalCodes(results, dataId) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach((key) => {
      series.push({
        values: [results[key]],
        text: key.toString()
      });
    });

    this.drillDownDataStructure[dataId] = { series: series };
    this.setDrilldownData(dataId);
  }

  $onInit() {
    this.conservatoryService.getAggregateByDepartment()
      .then((data) => {
        this.formatDepartments(data);
      })
      .catch(() => this.errorService.showSimpleToast('Une erreur est survenue.'));

    zingchart.node_click = (p) => {
      const dataId = p['data-id'];
      if (this.drillDownDataStructure[dataId]) {
        this.setDrilldownData(dataId);
      } else {
        this.conservatoryService.getAggregateByZipForADepartment(p['data-id'])
          .then((aggregatedData) => {
            this.formatPostalCodes(aggregatedData, dataId);
          });
      }
    };
  }
}

ConservatoryDrilldownController.$inject = ['conservatoryService', 'errorService'];

const conservatoryDrilldown = {
  controllerAs: '$ctrl',
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;


import zingchart from '../../../../node_modules/zingchart/client/zingchart.min.js';
import conservatoryDrilldownTemplate from './conservatory-drilldown.html';

class ConservatoryDrilldownController {
  constructor(conservatoryService, errorService) {
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
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

  formatData(results) {
    let series = [];

    const resultsKeys = Object.keys(results);

    resultsKeys.forEach((key) => {
      series.push({
        values: [results[key]],
        text: 'Dep ' + key.toString(),
        'data-id': key
      });
    });

    this.chartData.series = series;
    this.chartData.title.text = resultsKeys.length + ' departments';
  }

  $onInit() {
    this.conservatoryService.getAggregateByDepartment()
      .then((data) => {
        this.formatData(data);
        zingchart.node_click = () => {
        };
      })
      .catch(() => this.errorService.showSimpleToast('Une erreur est survenue.'));
  }
}

ConservatoryDrilldownController.$inject = ['conservatoryService', 'errorService'];

const conservatoryDrilldown = {
  controllerAs: '$ctrl',
  controller: ConservatoryDrilldownController,
  template: conservatoryDrilldownTemplate
};

export default conservatoryDrilldown;


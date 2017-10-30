class ConservatoryDetailsController {
  constructor(uiGmapIsReady) {
    this.uiGmapIsReady = uiGmapIsReady;
  }

  $onInit() {
    this.conservatory = this.resolve.conservatory;

    this.showWindow = false;

    this.templateUrl = 'templates/marker-window.html';

    this.myMap = {};

    this.map = {
      coord: {
        latitude: this.conservatory.lat,
        longitude: this.conservatory.lng
      }
    };

    this.marker = {
      coord: {
        latitude: this.conservatory.lat,
        longitude: this.conservatory.lng
      },
      id: 0,
      show: false,
      zoom: 11
    };

    this.uiGmapIsReady.promise(1).then(() => {
      this.myMap.refresh();
    });
  }

  onMarkerClick() {
    this.showWindow = !this.showWindow;
  }

  closeClick() {
    this.showWindow = false;
  }
}

ConservatoryDetailsController.$inject = ['uiGmapIsReady'];

const conservatoryDetails = {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controllerAs: '$ctrl',
  controller: ConservatoryDetailsController,
  templateUrl: './templates/conservatory-details.html'
};

export default conservatoryDetails;

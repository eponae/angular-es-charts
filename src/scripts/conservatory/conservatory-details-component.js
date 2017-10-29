class ConservatoryDetailsController {
  constructor($uibModalInstance, uiGmapIsReady) {
    this.$uibModalInstance = $uibModalInstance;
    this.uiGmapIsReady = uiGmapIsReady;

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

    this.showMap = false;
    this.showWindow = false;

    this.templateUrl = 'templates/marker-window.html';
  }

  $onInit() {
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

const conservatoryDetails = {
  templateUrl: './templates/conservatory-details.html',
  bindings: {
    conservatory: '<',
    close: '&'
  },
  controllerAs: '$ctrl',
  controller: ConservatoryDetailsController
};

export default conservatoryDetails;

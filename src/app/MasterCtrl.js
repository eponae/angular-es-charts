'use strict';
/**
 * Master Controller
 */

angular.module('basics').controller('MasterCtrl', ['$scope', function($scope) {


    /* Initialise Highcharts graphs properties */
    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        lang: {
            loading: 'Chargement...',
            resetZoom: 'Annuler zoom Y',
            rangeSelectorZoom: '',
            drillUpText: "Retour à {series.name}",
            downloadJPEG: "Télécharger image JPEG",
            downloadPDF: "Télécharger document PDF",
            downloadPNG: "Télécharger image PNG",
            downloadSVG: "Télécharger image SVG",
            noData: "Pas de données",
            printChart: "Imprimer graphique"
        }
    });
}]);

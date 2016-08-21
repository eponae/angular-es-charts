'use strict';

angular.module('basics').controller('InitESCtrl', ['$scope', 'esServ', 'jsonDataServ', function($scope, esServ, jsonDataServ) {

    /*Fill ES index with conservatories data*/
    var saveData = function(data) {
        var request = 'conservatory_index/conservatories/';

        esServ.saveData(request, data, {
            then: function(response) {
                console.log("OK");
            },
            catch: function() {

            }
        });
    };

    $scope.saveDataInIndex = function() {
        jsonDataServ.loadDataFromFile('assets/json/les-conservatoires-et-ecoles-de-musique-en-ile-de-france.json', {
            then: function(response) {
                var conservatoriesToSave = response.data;
                for (var i = 0; i < conservatoriesToSave.length; i++) {
                    saveData(conservatoriesToSave[i]);
                }
            },
            catch: function() {}
        });
    };

    $scope.updateSettings = function() {
        var request = 'conservatory_index/';
        var settings = {
            "settings": {
                "analysis": {
                    "analyzer": {
                        "folding": {
                            "tokenizer": "standard",
                            "filter": ["lowercase", "asciifolding"]
                        }
                    }
                }
            }
        };
        esServ.createIndex(request, settings, {
            then: function(response) {
                console.log("OK");
            },
            catch: function() {

            }
        });
    };

    $scope.createIndex = function() {
        var request = 'conservatory_index/_mapping/conservatories';
        var mappings = {
            "properties": {
                "datasetid": {
                    "type": "string",
                    "index": "not_analyzed"
                },
                "fields": {
                    "properties": {
                        "categorie": {
                            "type": "string",
                            "index": "analyzed"
                        },
                        "code_departement": {
                            "type": "string",
                            "index": "not_analyzed"
                        },
                        "cp": {
                            "type": "long"
                        },
                        "denomination_sociale": {
                            "type": "string",
                            "index": "analyzed",
                            "fields": {
                                "folded": {
                                    "type": "string",
                                    "analyzer": "folding"
                                }
                            }
                        },
                        "dep": {
                            "type": "long"
                        },
                        "lat_lon": {
                            "type": "double"
                        },
                        "latitude": {
                            "type": "double"
                        },
                        "longitude": {
                            "type": "double"
                        },
                        "rue_1": {
                            "type": "string",
                            "index": "analyzed"
                        },
                        "rue_2": {
                            "type": "string",
                            "index": "analyzed"
                        },
                        "rue_3": {
                            "type": "string",
                            "index": "analyzed"
                        },
                        "tel": {
                            "type": "string",
                            "index": "analyzed"
                        },
                        "ville": {
                            "type": "string",
                            "index": "not_analyzed",
                            "fields": {
                                "folded": {
                                    "type": "string",
                                    "analyzer": "folding"
                                }
                            }
                        }
                    }
                },
                "geometry": {
                    "properties": {
                        "coordinates": {
                            "type": "double"
                        },
                        "type": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }
                },
                "record_timestamp": {
                    "type": "date",
                    "format": "strict_date_optional_time||epoch_millis"
                },
                "recordid": {
                    "type": "string",
                    "index": "not_analyzed"
                }
            }
        };
        esServ.createIndex(request, mappings, {
            then: function(response) {
                console.log("OK");
            },
            catch: function() {

            }
        });
    };

}]);

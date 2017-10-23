'use strict';

import angular from 'angular';
import ContactController from 'contact-controller';

export default angular.module('conservatories.contact')
    .component('contact', {
        templateUrl: 'contact/contact.html',
        controllerAs: '$ctrl',
        controller: ContactController
    });
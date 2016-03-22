var docSignApp = angular.module('DocumentSigning', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate', 'ui.bootstrap'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when("/", {
        redirectTo: "/usage"
    })
    .when("/usage", {
        templateUrl: "./views/usage/usage.html",
        controller: 'UsageCtrl'
    })
    .when("/admin", {
        templateUrl: "./views/admin/admin.html",
        controller: 'AdminCtrl'
    })
    .when("/docusign", {
        templateUrl: "./views/docusign/docusign.html",
        controller: 'DocuSignCtrl'
    })
    .when("/echosign", {
        templateUrl: "./views/echosign/echosign.html",
        controller: 'EchoSignCtrl'
    })
    .otherwise({redirectTo: '/usage'});
}])

.controller('main', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    function init() {
    }

    $scope.toggleHamburger = function(ele, $event) {
        var mobileLinks = document.getElementsByClassName('mobile-links')[0];
        mobileLinks.classList.toggle('expand');
        $event.stopPropagation();
    };

    $scope.usageView = function() {
        $location.url('usage');
    };
    $scope.adminView = function() {
        $location.url('admin');
    };
    $scope.docusignView = function() {
        $location.url('docusign');
    };
    $scope.echosignView = function() {
        $location.url('echosign');
    };

    init();
}])

.directive('tooltip', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).tooltip({delay: {'show': 1000, 'hide': 100}, placement: attrs.placement});
        }
    };
}]);


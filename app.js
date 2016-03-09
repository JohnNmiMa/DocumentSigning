var portfolioApp = angular.module('DocumentSigning', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/admin", {
        templateUrl: "./views/admin/admin.html",
        controller: 'AdminCtrl'
    })
    .when("/", {
        redirectTo: "/admin"
    })
    .otherwise({redirectTo: '/'});
}])

.controller('main', ['$rootScope', '$scope', function ($rootScope, $scope) {
    function init() {
    }

    $scope.toggleHamburger = function(ele, $event) {
        var mobileLinks = document.getElementsByClassName('mobile-links')[0];
        mobileLinks.classList.toggle('expand');
        $event.stopPropagation();
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


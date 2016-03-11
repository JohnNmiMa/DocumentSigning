docSignApp.controller('DocuSignCtrl', ['$rootScope', '$scope', 'DocuSignService', function($rootScope,   $scope,   docuSignSvc) {
    $rootScope.selectedPage = 'docusign';

    $scope.login = function() {
        docuSignSvc.login()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        }).finally(function() {
        });
    };

    $scope.getAccountInfo = function() {
        docuSignSvc.getAccountInfo()
            .then(function(data) {
                $scope.response = JSON.stringify(data, undefined, 2);
            }).catch(function(result, status, headers, config) {
                $scope.response = JSON.stringify(response, undefined, 2);
            })
    };

    $scope.getTemplates = function() {
        docuSignSvc.getTemplates()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(result, status, headers, config) {
            $scope.response = JSON.stringify(response, undefined, 2);
        })
    };
}]);


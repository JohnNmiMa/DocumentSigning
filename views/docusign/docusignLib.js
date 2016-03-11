docSignApp

.constant('DOCUSIGN_DEMO_URL', 'https://demo.docusign.net/restapi/v2')

.factory('DocuSignService', ['$http', '$q', 'AdminService', 'DOCUSIGN_DEMO_URL', function($http, $q, adminSvc, DOCUSIGN_DEMO_URL) {

    var login_info = {};

    var login = function() {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: DOCUSIGN_DEMO_URL + "/login_information?api_password=true&include_account_id_guid=true&login_settings=all",
                headers: buildCredsHeader()
            };

        if (_.isEmpty(req.headers)) {
            defer.reject({statusText:"Invalid DocuSign credentials header"});
        } else if (_.isEmpty(login_info)) {
            $http(req).then(function(data) {
                login_info = data.data;
                defer.resolve(data.data);
            }, function(response) { defer.reject(response); });
        } else {
            // We've already logged in - return the info
            defer.resolve(login_info);
        }

        return defer.promise;
    };

    var templates = function(loginInfo) {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: loginInfo.loginAccounts[0].baseUrl + "/templates",
                headers: buildCredsHeader()
            };

        $http(req).then(function(data) {
            defer.resolve(data);
        }, function(response) { defer.reject(response); });

        return defer.promise;
    };

    var accounts = function(loginInfo) {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: loginInfo.loginAccounts[0].baseUrl,
                headers: buildCredsHeader()
            };

        $http(req).then(function(data) {
            defer.resolve(data);
        }, function(response) { defer.reject(response); });

        return defer.promise;
    };

    var getAccountInfo = function() {
        return login().then(accounts);
    }
    var getTemplates = function() {
        return login().then(templates);
    };

    /***** Utils *****/
    function buildCredsHeader() {
        var creds = adminSvc.getModel(),
            credsHeader = '',
            header = {};

        if (!_.isEmpty(creds)) {
            credsHeader = '<DocuSignCredentials>' +
                    '<Username>' + creds.username + '</Username>' +
                    '<Password>' + creds.password + '</Password>' +
                    '<IntegratorKey>' + creds.integratorKey + '</IntegratorKey>' +
                '</DocuSignCredentials>';

            header = {
                'Accept': 'applcation/json',
                'Content-Type': 'applcation/json',
                'X-DocuSign-Authentication': credsHeader
            }
        }
        return header;
    }

    return {
        login: login,
        getAccountInfo: getAccountInfo,
        getTemplates: getTemplates
    }
}]);

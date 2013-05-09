angular.module('auth', []).
	factory('authService', ['$rootScope', '$http', function($rootScope, $http) {
		return {

			login: function(credentials) {
				$http.post('/auth/login', credentials).success(function(data, status, headers, config){
					if (data != null && typeof data === 'object') {
						$rootScope.user = data;
					}
				});
			},

			logout: function() {
				$http.post('/auth/logout').success(function(data, status, headers, config){
					delete $rootScope.user;
				});
			}

		}
	}]);

function LoginCtrl($scope, authService) {

	$scope.login = function () {
		var credentials = {
			username: $scope.username,
			password: $scope.password
		};
		authService.login(credentials);

		$scope.username = '';
		$scope.password = '';
	}

	$scope.logout = function () {
		authService.logout();
	}

}
LoginCtrl.$inject = ['$scope', 'authService'];
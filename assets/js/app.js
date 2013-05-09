var app = angular.module('Library', ['auth']);

app.run(['$rootScope', '$http', function($rootScope, $http){
	$http.get('/auth/active').success(function(data, status, headers, config){
		$rootScope.user = data;
	});
}]);
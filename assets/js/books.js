function BookCtrl($scope, $http) {
	
	$http.get('/book').success(function(data, status, headers, config){
		$scope.books = data;
	});

	$scope.add = function () {
		var book = {title: $scope.newBookTitle};
		var n = $scope.books.length;

		$scope.books.push(book);

		$http.post('/book', book).success(function(data, status, headers, config){
			$scope.books[n] = data;
		});

		$scope.newBookTitle = '';
		$scope.order();
	}

	$scope.action = function (id) {
		if ($scope.editToggle && id == $scope.editToggle) {
			return "edit";
		} else if ($scope.checkoutToggle && id == $scope.checkoutToggle) {
			return "checkout";
		} else {
			return false;
		}
	}

	$scope.toggleEdit = function (id) {
		$scope.editToggle = id;
	}

	$scope.toggleCheckout = function (id) {
		$scope.checkoutToggle = id;
	}

	$scope.updateEdit = function (index, id) {
		delete $scope.editToggle;

		$http.put('/book/' + id, $scope.books[index]).success(function(data, status, headers, config){});
	}

	$scope.updateCheckout = function (book) {
		book.checkout = book.checkout || [];
		book.checkout.push({person: book.checkoutName, checkout: new Date()});

		delete book.checkoutName;

		$http.put('/book/' + book.id, book).success(function(data, status, headers, config){});

		delete $scope.checkoutToggle;
	}

	$scope.updateCheckin = function (book) {
		book.checkout[book.checkout.length - 1].checkin = new Date();

		$http.put('/book/' + book.id, book).success(function(data, status, headers, config){});
	}

	$scope.delete = function (index, id) {
		$scope.books.splice(index, 1);

		$http.delete('/book/' + id).success(function(data, status, headers, config){});
	}

	$scope.checkoutCheck = function (index) {
		var checkout = $scope.books[index].checkout || [];

		if (checkout.length && !checkout[checkout.length - 1].checkin) {
			return checkout[checkout.length - 1].person;
		} else {
			return false;
		}
	}
	
}
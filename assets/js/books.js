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
	}

	$scope.edit = function (book) {
		delete book.edit;
		$http.put('/book/' + book.id, book).success(function(data, status, headers, config){});
	}

	$scope.delete = function (index, id) {
		$scope.books.splice(index, 1);

		$http.delete('/book/' + id).success(function(data, status, headers, config){});
	}

	$scope.checkout = function (book) {
		book.checkout = book.checkout || [];
		book.checkout.push({person: book.checkoutName, checkout: new Date()});

		delete book.checkoutName;
		delete book.checking;

		$http.put('/book/' + book.id, book).success(function(data, status, headers, config){});
	}

	$scope.checkin = function (book) {
		book.checkout[book.checkout.length - 1].checkin = new Date();

		$http.put('/book/' + book.id, book).success(function(data, status, headers, config){});
	}

	$scope.checkoutCheck = function (book) {
		if (book.checkout && !book.checkout[book.checkout.length - 1].checkin) {
			return book.checkout[book.checkout.length - 1].person;
		}
		return false;
	}
	
}
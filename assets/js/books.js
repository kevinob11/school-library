function BookCtrl($scope) {
	
	var	socket = io.connect("http://node.local:1337");

	$scope.books = [];

	$scope.getBooks = function () {
		socket.request('/book', {}, function(response) {
			$scope.$apply(function(){
				$scope.books = response;
			});
		});
	}

	$scope.getBooks();

	$scope.add = function () {
		var book = {
			title: $scope.newBookTitle,
		};

		var n = $scope.books.length;
		$scope.books.push(book);

		socket.request('/book/create', book, function(response) {
			$scope.$apply(function(){
				$scope.books[n] = response;
			});
		});

		$scope.newBookTitle = '';
	}

	$scope.editCheck = function (id) {
		if (id == $scope.editing) {
			return "edit";
		}
		else {
			return false;
		}
	}

	$scope.edit = function (id) {
		$scope.editing = id;
	}

	$scope.update = function (index, id) {
		delete $scope.editing;

		var book = {title: $scope.books[index].title};
		socket.request('/book/update/' + id, book, function(response) {})
	}

	$scope.delete = function (index, id) {
		$scope.books.splice(index, 1);

		socket.request('/book/destroy/' + id, {}, function(response) {});
	}
	
}
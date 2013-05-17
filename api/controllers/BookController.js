/*---------------------
	:: Book 
	-> controller
---------------------*/
var BookController = {

	/*---------------------
		We create checkout and checkin functions because we don't want users
		to have to be logged in to use them, but we don't want logged out users
		to be able to update any field in a book. So we turn on auth for the
		update function then build these wrappers for checkin and checkout.
		We pass the entire user to these functions, but we only update the
		checkout field to prevent people using these functions to update users.
	---------------------*/

	checkout: function (req, res) {

		Book.update({id: req.body.id}, {checkout: req.body.checkout}, function(err,book){
			if (err) {
				res.send("Error checking out book.");
			} else {
				res.send("Book checked out successfully.");
			}
		});

	},

	checkin: function (req, res) {

		Book.update({id: req.body.id}, {checkout: req.body.checkout}, function(err,book){
			if (err) {
				res.send("Error checking in book.");
			} else {
				res.send("Book checked in successfully.");
			}
		});

	}

};
module.exports = BookController;
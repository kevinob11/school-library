/*---------------------
	:: Book 
	-> controller
---------------------*/
var BookController = {

	checkout: function (req, res) {
		Book.find(req.body.id).done(function (err, book) {
			if (err) {
				return res.send(err,500);
			} else {
				var date = new Date();
				var name = req.body.name;
				var checkout = book.checkout || [];

				checkout.push({person: name, checkout: date});

				Book.update({
					id: req.body.id
				},{
					checkout: checkout
				}, function (err, book) {
					if (err) {
						return res.send(err,500);
					} else {
						res.json(book);
					}
				})
			}
		});
	},

	checkin: function (req, res) {
		Book.find(req.body.id).done(function (err, book) {
			if (err) {
				return res.send(err,500);
			} else {
				var date = new Date();
				var checkout = book.checkout || [];

				checkout[checkout.length - 1].checkin = date;

				Book.update({
					id: req.body.id
				},{
					checkout: checkout
				}, function (err, book) {
					if (err) {
						return res.send(err,500);
					} else {
						res.json(book);
					}
				})
			}
		});
	}

};
module.exports = BookController;
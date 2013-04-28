/*---------------------
	:: User
	-> model
---------------------*/
module.exports = {

	attributes	: {

		username: {
			defaultsTo: 'testuser'
		},

		password: {
			defaultsTo: 'testpass'
		}
		
	}

};
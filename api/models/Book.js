/*---------------------
	:: Book
	-> model
---------------------*/
module.exports = {

	attributes	: {

		title: {
			type: 'STRING'
			//defaultsTo: 'Default'
		},

		checkout: {
			person: 'STRING',
			checkout: 'STRING',
			checkin: 'STRING'
		}
		
	}

};
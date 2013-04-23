/*---------------------
	:: Book
	-> model
---------------------*/
module.exports = {

	attributes	: {

		title: 'STRING',

		checkout: {
			person: 'STRING',
			checkout: 'STRING',
			checkin: 'STRING'
		}
		
	}

};
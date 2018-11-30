'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = class Record
{
	constructor (level, category, message, metadata = null)
	{
		Object.defineProperty(this, 'level', {
			enumerable : true, value : level
		});

		Object.defineProperty(this, 'category', {
			enumerable : true, value : category
		});

		Object.defineProperty(this, 'message', {
			enumerable : true, value : message
		});

		Object.defineProperty(this, 'date', {
			enumerable : true, value : new Date()
		});

		Object.defineProperty(this, 'metadata', {
			enumerable : true, value : metadata
		});
	}
};

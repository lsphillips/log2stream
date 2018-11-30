'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { Transform } = require('stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function filter (test)
{
	return new Transform({

		transform (record, _, callback)
		{
			let passed;

			try
			{
				passed = test(record);
			}
			catch (error)
			{
				callback(error);

				return;
			}

			if (passed)
			{
				callback(null, record);
			}
			else
			{
				callback(null, null);
			}
		},

		objectMode : true
	});
};

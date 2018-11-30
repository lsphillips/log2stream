'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { Transform } = require('stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

module.exports = function transform (transformer)
{
	return new Transform({

		transform (record, _, callback)
		{
			let result = null, error = null;

			try // to transform.
			{
				result = transformer(record);
			}
			catch (recordTransformError)
			{
				error = recordTransformError;
			}

			callback(error, result);
		},

		objectMode : true
	});
};

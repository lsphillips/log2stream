import { Transform } from 'stream';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function transform (transformer)
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
}

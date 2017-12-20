'use strict';

// Dependencies
// --------------------------------------------------------

const stream = require('stream');

// --------------------------------------------------------

module.exports.Logger        = require('./logger');
module.exports.Record        = require('./record');
module.exports.Level         = require('./level');
module.exports.LoggerFactory = require('./loggerFactory');

// --------------------------------------------------------

/**
 * A function that will test a provided log record.
 *
 * @callback RecordTester
 *
 * @returns {Boolean} `false` if the log record does not pass the test, otherwise `true`.
 *
 * @param {log2stream.Record} The log record to be tested.
 *
 * @memberof log2stream
 */

/**
 * Creates a transform stream that will output the input log records filtered using a provided test.
 *
 * Example usage:
 *
 * ```
 * logger.stream.pipe(
 *      log2stream.filter(function (record)
 *      {
 *          return record.level.isGreaterThanOrEqualTo(log2stream.Level.ERROR);
 *      })
 * );
 * ```
 *
 * **Note:** Any stream you pipe the resulting stream into must have `objectMode` enabled.
 *
 * @returns {stream.Transform} A transform stream that will output filtered log records.
 *
 * @param {log2stream.RecordTester} test A test to determine whether a log record should be filtered or not.
 *
 * @memberof log2stream
 */
module.exports.filter = function filter (test)
{
	return new stream.Transform({

		transform (record, _, callback)
		{
			let passed = test(record);

			if (passed)
			{
				callback(null, record);

				return;
			}

			callback();
		},

		objectMode : true
	});
};

/**
 * A function that will transform a provided log record into something else.
 *
 * @callback RecordTransformer
 *
 * @returns {*} The transformed log record.
 *
 * @param {log2stream.Record} The log record to be transformed.
 *
 * @memberof log2stream
 */

/**
 * Creates a transform stream that will output the input log records, each transformed by a provided transformer.
 *
 * Example usage:
 *
 * ```
 * logger.stream
 *
 *      .pipe(
 *           log2stream.transform(function (record)
 *           {
 *               return `${record.level} [${record.data.toISOString()}] ${record.category} - ${record.message}`;
 *           })
 *      )
 *      .pipe(process.stdout);
 * ```
 *
 * **Note:** When the transformed log record is not a string; any stream you pipe the resulting stream into must have `objectMode` enabled.
 *
 * @returns {stream.Transform} A transform stream that will output transformed log records.
 *
 * @param {log2stream.RecordTransformer} transformer A transformer that will transform a log record into something else.
 *
 * @memberof log2stream
 */
module.exports.transform = function transform (transformer)
{
	return new stream.Transform({

		transform (record, _, callback)
		{
			let result;

			try // to transform log record.
			{
				result = transformer(record);
			}
			catch (error)
			{
				callback(error);

				return;
			}

			callback(null, result);
		},

		objectMode : true
	});
};

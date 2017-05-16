'use strict';

// Dependencies
// --------------------------------------------------------

const stream = require('stream');

// --------------------------------------------------------

const Logger        = require('./logger');
const Record        = require('./record');
const Level         = require('./level');
const LoggerFactory = require('./loggerFactory');

// --------------------------------------------------------

/**
 * Tests a log record; determining whether it shall be filtered or not.
 *
 * @callback RecordTest
 *
 * @returns {Boolean} `false` if the log record is to be filtered, otherwise `true`.
 *
 * @param {log2stream.Record} The log record to be tested.
 *
 * @memberof log2stream
 */

// --------------------------------------------------------

/**
 * Returns a transform stream that will filter the log records given as its input using the provided `test` function.
 *
 * Example usage:
 *
 * ```
 * logger.stream.pipe(
 *      log2stream.filter(function (record)
 *      {
 *          return record.level.isGreaterThanOrEqualTo(
 *              log2stream.stringToLevel('ERROR')
 *          );
 *      })
 * );
 * ```
 *
 * Any stream you pipe the results into must have `objectMode` enabled.
 *
 * @returns {stream.Transform}
 *
 * @param {log2stream.RecordTest} test
 *
 * @memberof log2stream
 */
module.exports.filter = function (test)
{
	return new stream.Transform(
	{
		transform (record, _, callback)
		{
			let passed = test(record);

			if (passed)
			{
				callback(null, record);
			}
			else
			{
				callback();
			}
		},

		objectMode : true
	});
};

// --------------------------------------------------------

/**
 * Transforms a given log record into something else.
 *
 * @callback RecordTransformer
 *
 * @returns {*} The transformed log record.
 *
 * @param {log2stream.Record} The log record to transform.
 *
 * @memberof log2stream
 */

// --------------------------------------------------------

/**
 * Returns a transform stream that will transform the log records given as its input using the provided `transform` function.
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
 * Note: When the transformed log record is not a string; any stream you pipe the results into must have `objectMode` enabled.
 *
 * @return {stream.Transform}
 *
 * @param {log2stream.RecordTransformer} transform
 *
 * @memberof log2stream
 */
module.exports.transform = function (transform)
{
	return new stream.Transform(
	{
		transform (record, _, callback)
		{
			let result;

			try // to transform log record.
			{
				result = transform(record);
			}
			catch (error)
			{
				callback(error);
			}

			callback(null, result);
		},

		objectMode : true
	});
};

// --------------------------------------------------------

/**
 * @ignore
 */
module.exports.Level = Level;

// --------------------------------------------------------

/**
 * @ignore
 */
module.exports.Record = Record;

// --------------------------------------------------------

/**
 * @ignore
 */
module.exports.Logger = Logger;

// --------------------------------------------------------

/**
 * @ignore
 */
module.exports.LoggerFactory = LoggerFactory;

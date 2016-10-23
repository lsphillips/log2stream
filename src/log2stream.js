'use strict';

// Dependencies
// --------------------------------------------------------

const stream = require('stream');

// --------------------------------------------------------

const Logger        = require('./logger');
const Record        = require('./record');
const Level	        = require('./level');
const LoggerFactory = require('./loggerFactory');

// --------------------------------------------------------

/**
 * A simple logging interface that lets you decide what log records go where.
 *
 * @type {LoggerFactory}
 *
 * @module log2stream
 */
module.exports = new LoggerFactory(Level.ALL);

// --------------------------------------------------------

/**
 * Tests a log record; determining whether it shall be filtered or not.
 *
 * @callback filter.test
 *
 * @returns {Boolean} `false` if the log record is to be filtered, otherwise `true`.
 *
 * @param {log2stream.Record} The log record to be tested.
 */

/**
 * Returns a transform stream that will filter the log records given as its input using the provided `test` function.
 *
 * Example usage:
 *
 * ```
 * log2stream.stream.pipe(
 *		log2stream.filter(function (record)
 *		{
 *			 return record.level.isGreaterThanOrEqualTo(
 *          log2stream.stringToLevel('ERROR')
 *       );
 *		})
 * );
 * ```
 *
 * Any stream you pipe the results into must have `objectMode` enabled.
 *
 * @returns {stream.Transform}
 *
 * @param {filter.test} test
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
 * Transforms a given log record.
 *
 * @callback transform.transformer
 *
 * @returns {*} The transformed log record.
 *
 * @param {log2stream.Record} The log record to transform.
 */

/**
 * Returns a transform stream that will transform the log records given as its input using the provided `transform` function.
 *
 * Example usage:
 *
 * ```
 * log2stream.stream
 *
 *		.pipe(
 *			 log2stream.transform(function (record)
 *			 {
 *					return `${record.level} [${record.data.toISOString()}] ${record.category} - ${record.message}`;
 *			 })
 *		)
 *		.pipe(process.stdout);
 * ```
 *
 * @return {stream.Transform}
 *
 * @param {transform.transformer} transformer
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

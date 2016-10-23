'use strict';

// Dependencies
// --------------------------------------------------------

const stream = require('stream');

// --------------------------------------------------------

const Level	 = require('./level');
const Record = require('./record');

// --------------------------------------------------------

/**
 * Represents a logger.
 *
 * @memberof log2stream
 */
class Logger
{
	/**
	 * Creates a new logger.
	 *
	 * @param {String} name	 The name of the logger.
	 * @param {Level}	 level The minimum severity level for the logger.
	 */
	constructor (name, level)
	{
		/**
		 * The name of this logger.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof Logger
		 */
		Object.defineProperty(this, 'name',
		{
			enumerable : true, configurable : false, writable : false, value : name
		});

		// ------------------------------------------------------

		/**
		 * The minimum severity level of this logger.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof Logger
		 */
		Object.defineProperty(this, 'level',
		{
			enumerable : true, configurable : false, writable : true, value : level
		});

		// ------------------------------------------------------

		/**
		 * The stream that log records created by this logger will be written too.
		 *
		 * @instance
		 *
		 * @type {stream.PassThrough}
		 *
		 * @memberof Logger
		 */
		Object.defineProperty(this, 'stream',
		{
			value : new stream.PassThrough(
			{
				objectMode : true

			}).setMaxListeners(Infinity).pause(),

			enumerable : false, configurable : false, writable : false
		});
	}

	// -------------------------------------------------------

	/**
	 * Writes a log record that is useful for debugging an application.
	 *
	 * @param {String} message    The message to log.
	 * @param {Object} [metadata] The metadata to associate with the log record.
	 */
	debug (message, metadata)
	{
		if (this.level.isLessThanOrEqualTo(Level.DEBUG))
		{
			this.stream.write(
				new Record(Level.DEBUG, this.name, message, metadata)
			);
		}
	}

	// -------------------------------------------------------

	/**
	 * Writes a log record that highlights the progress of an application.
	 *
	 * @param {String} message    The message to log.
	 * @param {Object} [metadata] The metadata to associate with the log record.
	 */
	info (message, metadata)
	{
		if (this.level.isLessThanOrEqualTo(Level.INFO))
		{
			this.stream.write(
				new Record(Level.INFO, this.name, message, metadata)
			);
		}
	}

	// -------------------------------------------------------

	/**
	 * Writes a log record that highlights potentially harmful situations, a.k.a warnings.
	 *
	 * @param {String} message    The message to log.
	 * @param {Object} [metadata] The metadata to associate with the log record.
	 */
	warn (message, metadata)
	{
		if (this.level.isLessThanOrEqualTo(Level.WARN))
		{
			this.stream.write(
				new Record(Level.WARN, this.name, message, metadata)
			);
		}
	}

	// -------------------------------------------------------

	/**
	 * Writes a record that highlights errors that wouldn't normally stop the application from running.
	 *
	 * @param {String} message    The message to log.
	 * @param {Object} [metadata] The metadata to associate with the log record.
	 */
	error (message, metadata)
	{
		if (this.level.isLessThanOrEqualTo(Level.ERROR))
		{
			this.stream.write(
				new Record(Level.ERROR, this.name, message, metadata)
			);
		}
	}

	// -------------------------------------------------------

	/**
	 * Writes a record that highlights severe errors that may stop the application from running.
	 *
	 * @param {String} message    The message to log.
	 * @param {Object} [metadata] The metadata to associate with the log record.
	 */
	fatal (message, metadata)
	{
		if (this.level.isLessThanOrEqualTo(Level.FATAL))
		{
			this.stream.write(
				new Record(Level.FATAL, this.name, message, metadata)
			);
		}
	}
}

// --------------------------------------------------------

module.exports = Logger;

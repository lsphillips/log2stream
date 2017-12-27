'use strict';

// Dependencies
// --------------------------------------------------------

const stream = require('stream');

// --------------------------------------------------------

const Level  = require('./level');
const Logger = require('./logger');

// --------------------------------------------------------

/**
 * A factory responsible for creating loggers.
 *
 * @memberof log2stream
 */
class LoggerFactory
{
	/**
	 * Creates a logger factory.
	 *
	 * @param {Level} [level = Level.ALL] The minimum severity level that all created loggers will have.
	 */
	constructor (level = Level.ALL)
	{
		/**
		 * The loggers that have been created using this logger factory.
		 *
		 * @instance
		 *
		 * @type {Array.<Logger>}
		 *
		 * @memberof LoggerFactory
		 */
		Object.defineProperty(this, 'loggers', {
			enumerable : true, value : []
		});

		/**
		 * The minimum severity level that all created loggers will have.
		 *
		 * When set, all created loggers will be updated if a logger hasn't already had its minimum severity level configured.
		 *
		 * @instance
		 *
		 * @type {Level}
		 *
		 * @memberof LoggerFactory
		 */
		Object.defineProperty(this, 'level', {
			enumerable : true, writable : true, value : level
		});

		/**
		 * The stream that all loggers created by this factory will pipe their log records into.
		 *
		 * @private
		 *
		 * @instance
		 *
		 * @type {Stream.Readable}
		 *
		 * @memberof LoggerFactory
		 */
		Object.defineProperty(this, 'stream', {

			value : new stream.PassThrough({
				objectMode : true
			}).setMaxListeners(Infinity).pause()
		});
	}

	/**
	 * Sets the minimum severity level that all created loggers will have.
	 *
	 * When set, all created loggers will be updated if a logger hasn't already had its minimum severity level manually configured.
	 *
	 * @public
	 *
	 * @instance
	 *
	 * @param {log2stream.Level} level           The new minimum severity level.
	 * @param {Boolean}          [force = false] Indicates whether already created loggers that have had their minimum severity level manually configured should have their level changed.
	 */
	setLoggerLevel (level, force = false)
	{
		if (level instanceof Level === false)
		{
			throw new TypeError('The provided minimum severity level is not a severity level.');
		}

		this.loggers.forEach(logger =>
		{
			if (force || logger.level === this.level)
			{
				logger.level = level;
			}
		});

		this.level = level;
	}

	/**
	 * Returns a logger with a provided name.
	 *
	 * If a logger has been previously created with the given `name` by this logger factory, that logger will be returned instead of creating a new one.
	 *
	 * @returns {Logger} An existing logger with the provided name, otherwise a new logger.
	 *
	 * @param {String} name The name of the logger.
	 */
	getLogger (name)
	{
		let logger = this.loggers.find(l => l.name === name);

		if (!logger)
		{
			logger = new Logger(name, this.level);

			logger.stream.pipe(this.stream);

			this.loggers.push(logger);
		}

		return logger;
	}
}

// --------------------------------------------------------

module.exports = LoggerFactory;

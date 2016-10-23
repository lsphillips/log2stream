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
		Object.defineProperty(this, 'loggers',
		{
			enumerable : true, configurable : false, writable : false, value : [],
		});

		// ------------------------------------------------------

		let minimumSeverityLevelForNewLoggers = level;

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
		Object.defineProperty(this, 'level',
		{
			get ()
			{
				return minimumSeverityLevelForNewLoggers;
			},

			set (newMinimumSeverityLevel)
			{
				this.loggers.forEach(function (logger)
				{
					if (logger.level === minimumSeverityLevelForNewLoggers)
					{
						logger.level = newMinimumSeverityLevel;
					}
				});

				minimumSeverityLevelForNewLoggers = newMinimumSeverityLevel;
			},

			enumerable : true, configurable : false
		});

		// ------------------------------------------------------

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
	 * Returns a logger with a provided name.
	 *
	 * If a logger has been previously created with the given `name` by this logger factory, that logger will be returned instead of creating a new one.
	 *
	 * @returns {Logger}
	 *
	 * @param {String} name The name of the logger.
	 */
	getLogger (name)
	{
		let logger = this.loggers.find(function (anExistingLogger)
		{
			return anExistingLogger.name === name;
		});

		if (logger === undefined)
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

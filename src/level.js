'use strict';

/**
 * Represents a severity level.
 *
 * @property {Level} ALL   The lowest possible severity level, it is intended to enable a logger to create a record of all severity levels.
 * @property {Level} DEBUG Details useful for debugging an application.
 * @property {Level} INFO  Progress of an application.
 * @property {Level} WARN  Potentially harmful situations, a.k.a warnings.
 * @property {Level} ERROR Errors that wouldn't normally stop the application from running.
 * @property {Level} FATAL Severe errors that may stop the application from running.
 * @property {Level} OFF   The highest possible severity level, it is intended to disable a logger.
 *
 * @memberof log2stream
 */
class Level
{
	/**
	 * Creates a new severity level.
	 *
	 * @param {String} name     The name of the level.
	 * @param {Number} severity The severity of the level.
	 */
	constructor (name, severity)
	{
		/**
		 * The name of this level.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof Level
		 */
		Object.defineProperty(this, 'name', {
			enumerable : true, configurable : false, writable : false, value : name
		});

		/**
		 * The severity of this level.
		 *
		 * @instance
		 *
		 * @type {Number}
		 *
		 * @memberof Level
		 */
		Object.defineProperty(this, 'severity', {
			enumerable : true, configurable : false, writable : false, value : severity
		});
	}

	/**
	 * Determines whether this level is of equal severity to another level.
	 *
	 * @returns {Boolean} `true` if this level is of equal severity to `level`, otherwise `false`.
	 *
	 * @param {Level} level The level to compare to this level.
	 */
	isEqualTo (level)
	{
		return this.severity === level.severity;
	}

	/**
	 * Determines whether this level is less severe than another level.
	 *
	 * @returns {Boolean} `true` if this level is less severe than `level`, otherwise `false`.
	 *
	 * @param {Level} level The level to compare to this level.
	 */
	isLessThan (level)
	{
		return this.severity < level.severity;
	}

	/**
	 * Determines whether this level is less severe than or equally as severe to another level.
	 *
	 * @returns {Boolean} `true` if this level is less severe than or equally as severe to `level`, otherwise `false`.
	 *
	 * @param {Level} level The level to compare to this level.
	 */
	isLessThanOrEqualTo (level)
	{
		return this.severity <= level.severity;
	}

	/**
	 * Determines whether this level is more severe than another level.
	 *
	 * @returns {Boolean} `true` if this level is more severe than `level`, otherwise `false`.
	 *
	 * @param {Level} level The level to compare to this level.
	 */
	isGreaterThan (level)
	{
		return this.severity > level.severity;
	}

	/**
	 * Determines whether this level is more severe than or equally as severe to another level.
	 *
	 * @returns {Boolean} `true` if this level is more severe than or equally as severe to `level`, otherwise `false`.
	 *
	 * @param {Level} level The level to compare to this level.
	 */
	isGreaterThanOrEqualTo (level)
	{
		return this.severity >= level.severity;
	}

	toString ()
	{
		return this.name;
	}

	toJSON ()
	{
		return this.name;
	}

	/**
	 * Converts a string to a severity level.
	 *
	 * @static
	 *
	 * @returns {Level} The level represented by the provided string. If the conversion fails, the specified default will be returned instead.
	 *
	 * @param {String} stringToConvert       The string to convert into a severity level.
	 * @param {Level}  [defaultLevel = null] The severity level to return if the conversion fails.
	 */
	static toLevel (stringToConvert, defaultLevel = null)
	{
		let level = Level[stringToConvert];

		if (level instanceof Level)
		{
			return level;
		}

		return defaultLevel;
	}
}

// --------------------------------------------------------

Level.ALL   = new Level('ALL',   Number.MIN_VALUE);
Level.DEBUG = new Level('DEBUG', 100);
Level.INFO  = new Level('INFO',  200);
Level.WARN  = new Level('WARN',  300);
Level.ERROR = new Level('ERROR', 400);
Level.FATAL = new Level('FATAL', 500);
Level.OFF   = new Level('OFF',   Number.MAX_VALUE);

// --------------------------------------------------------

module.exports = Level;

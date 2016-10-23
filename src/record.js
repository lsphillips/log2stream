'use strict';

/**
 * Represents a log record.
 *
 * @memberof log2stream
 */
class Record
{
	/**
	 * Creates a new log record.
	 *
	 * @param {Level}  level             The severity level of the record.
	 * @param {String} category          The category of the record.
	 * @param {String} message           The message describing the record.
	 * @param {Object} [metadata = null] The metadata associated with the record.
	 */
	constructor (level, category, message, metadata = null)
	{
		/**
		 * The severity level of this log record.
		 *
		 * @instance
		 *
		 * @type {Level}
		 *
		 * @memberof Record
		 */
		Object.defineProperty(this, 'level',
		{
			enumerable : true, configurable : false, writable : false, value : level
		});

		// ------------------------------------------------------

		/**
		 * The category of this log record.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof Record
		 */
		Object.defineProperty(this, 'category',
		{
			enumerable : true, configurable : false, writable : false, value : category
		});

		// ------------------------------------------------------

		/**
		 * The message describing this log record.
		 *
		 * @instance
		 *
		 * @type {String}
		 *
		 * @memberof Record
		 */
		Object.defineProperty(this, 'message',
		{
			enumerable : true, configurable : false, writable : false, value : message
		});

		// ------------------------------------------------------

		/**
		 * The date and time of when this log record was created.
		 *
		 * @instance
		 *
		 * @type {Date}
		 *
		 * @memberof Record
		 */
		Object.defineProperty(this, 'date',
		{
			enumerable : true, configurable : false, writable : false, value : new Date()
		});

		// ------------------------------------------------------

		/**
		 * The metadata associated with this log record.
		 *
		 * @instance
		 *
		 * @type {Date}
		 *
		 * @memberof Record
		 */
		Object.defineProperty(this, 'metadata',
		{
			enumerable : true, configurable : false, writable : false, value : metadata
		});
	}
}

// --------------------------------------------------------

module.exports = Record;

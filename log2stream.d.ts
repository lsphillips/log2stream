/// <reference types="node" />

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import * as stream from 'stream';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Represents a severity level.
 */
export class Level
{
	/**
	 * Creates a new level.
	 *
	 * @param name     The name of the level.
	 * @param severity The severity of the level, this will be used to compare the level with other levels.
	 */
	constructor(name : string, severity : number);

	/**
	 * The name of this level.
	 */
	readonly name : string;

	/**
	 * Determines whether this level is of equal severity to another level.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.Info.isEqualTo(Level.Info);
	 * // => true
	 *
	 * Level.Info.isEqualTo(Level.Warn);
	 * // => false
	 * ```
	 *
	 * @param level The level to compare to this level.
	 *
	 * @returns `true` if this level is of equal severity to `level`, otherwise `false`.
	 */
	isEqualTo(level : Level) : boolean;

	/**
	 * Determines whether this level is less severe than another level.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.Warn.isLessThan(Level.Error);
	 * // => true
	 *
	 * Level.Warn.isLessThan(Level.Debug);
	 * // => false
	 * ```
	 *
	 * @param level The level to compare to this level.
	 *
	 * @returns `true` if this level is less severe than `level`, otherwise `false`.
	 */
	isLessThan(level : Level) : boolean;

	/**
	 * Determines whether this level is less severe than or equally severe to another level.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.Warn.isLessThanOrEqualTo(Level.Warn);
	 * // => true
	 *
	 * Level.Warn.isLessThanOrEqualTo(Level.Error);
	 * // => true
	 *
	 * Level.Warn.isLessThanOrEqualTo(Level.Debug);
	 * // => false
	 * ```
	 *
	 * @param level The level to compare to this level.
	 *
	 * @returns `true` if this level is less severe than or equally severe to `level`, otherwise `false`.
	 */
	isLessThanOrEqualTo(level : Level) : boolean;

	/**
	 * Determines whether this level is more severe than another level.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.Warn.isGreaterThan(Level.Info);
	 * // => true
	 *
	 * Level.Warn.isGreaterThan(Level.Fatal);
	 * // => false
	 * ```
	 *
	 * @param level The level to compare to this level.
	 *
	 * @returns `true` if this level is more severe than `level`, otherwise `false`.
	 */
	isGreaterThan(level : Level) : boolean;

	/**
	 * Determines whether this level is more severe than or equally as severe to another level.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Warn);
	 * // => true
	 *
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Debug);
	 * // => true
	 *
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Error);
	 * // => false
	 * ```
	 *
	 * @param level The level to compare to this level.
	 *
	 * @returns `true` if this level is more severe than or equally severe to `level`, otherwise `false`.
	 */
	isGreaterThanOrEqualTo(level : Level) : boolean;

	/**
	 * Converts a string into a predefined level. If a level could not be determined, `null` will be returned instead.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * Level.toLevel('Error');
	 * // => Level.Error
	 *
	 * Level.toLevel('Info');
	 * // => Level.Info
	 *
	 * Level.toLevel('Trace');
	 * // => null
	 * ```
	 *
	 * @param string The string to convert into a level.
	 *
	 * @returns The predefined level corresponding to `string`, or `null` if a level could not be determined.
	 */
	static toLevel(string : string) : Level | null;

	/**
	 * A predefined level that represents details useful for debugging an application.
	 */
	static readonly Debug : Level;

	/**
	 * A predefined level that represents progress of an application.
	 */
	static readonly Info : Level;

	/**
	 * A predefined level that represents potentially harmful situations.
	 */
	static readonly Warn : Level;

	/**
	 * A predefined level that represents errors that wouldn't normally stop the application from running.
	 */
	static readonly Error : Level;

	/**
	 * A predefined level that represents errors that wouldn't normally stop the application from running.
	 */
	static readonly Fatal : Level;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Represents a log record produced by a logger.
 */
export class Record
{
	/**
	 * Creates a new log record.
	 *
	 * @param level    The severity level of the record.
	 * @param category The category of the record.
	 * @param message  The message describing the record.
	 * @param metadata The metadata associated with the record.
	 */
	constructor(level : Level, category : string, message : string, metadata? : any);

	/**
	 * The severity level of this log record.
	 */
	readonly level : Level;

	/**
	 * The category of this log record.
	 *
	 * This will likely be the name of the logger that created this log record.
	 */
	readonly category : string;

	/**
	 * The message describing this log record.
	 */
	readonly message : string;

	/**
	 * The date and time of when this log record was created.
	 */
	readonly date : Date;

	/**
	 * The metadata associated with this log record.
	 */
	readonly metadata : any;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Represents a logger.
 */
export class Logger
{
	/**
	 * Creates a new logger.
	 *
	 * @param name The name of the logger.
	 */
	constructor(name : string);

	/**
	 * The name of this logger.
	 */
	readonly name : string;

	/**
	 * The stream that this logger will write log records to.
	 */
	readonly stream : stream.Readable;

	/**
	 * Writes a log record that is useful for debugging an application.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * logger.debug('Something happened.', {
	 *     detail : 'Detail on what happened...'
	 * });
	 * ```
	 *
	 * @param message  The message to describe the log record.
	 * @param metadata The metadata to associate with the log record.
	 */
	debug(message : string, metadata? : any) : void;

	/**
	 * Writes a log record that highlights the progress of an application.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * logger.info('Something happened.', {
	 *     detail : 'Detail on what happened...'
	 * });
	 * ```
	 *
	 * @param message  The message to describe the log record.
	 * @param metadata The metadata to associate with the log record.
	 */
	info(message : string, metadata? : any) : void;

	/**
	 * Writes a log record that highlights potentially harmful situations.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * logger.warn('Something potentially alarming happened.', {
	 *     detail : 'Detail on what happened...'
	 * });
	 * ```
	 *
	 * @param message  The message to describe the log record.
	 * @param metadata The metadata to associate with the log record.
	 */
	warn(message : string, metadata? : any) : void;

	/**
	 * Writes a log record that highlights errors that wouldn't normally stop the application from running.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * logger.error('Something bad happened.', {
	 *     detail : 'Detail on what happened...'
	 * });
	 * ```
	 *
	 * @param message  The message to describe the log record.
	 * @param metadata The metadata to associate with the log record.
	 */
	error(message : string, metadata? : any) : void;

	/**
	 * Writes a log record that highlights severe errors that may stop the application from running.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * logger.fatal('Something really bad happened.', {
	 *     detail : 'Detail on what happened...'
	 * });
	 * ```
	 *
	 * @param message  The message to describe the log record.
	 * @param metadata The metadata to associate with the log record.
	 */
	fatal(message : string, metadata? : any) : void;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Represents a factory responsible for creating loggers.
 */
export class LoggerFactory
{
	/**
	 * The loggers that have been created by this factory.
	 */
	readonly loggers : Logger[];

	/**
	 * The stream that all loggers created by this factory will write log records to.
	 */
	readonly stream : stream.Readable;

	/**
	 * Creates a logger.
	 *
	 * Example usage:
	 *
	 * ``` js
	 * const logger = factory.getLogger('http');
	 *
	 * logger.error('A request has failed.', {
	 *     url : 'https://www.zelda.com'
	 * });
	 * ```
	 *
	 * If a logger already exists with the provided name, then that logger will be returned instead:
	 *
	 * ``` js
	 * factory.getLogger('http') === factory.getLogger('http');
	 * // => true
	 * ```
	 *
	 * @param name The name of the logger.
	 *
	 * @returns The created logger, or the already existing logger with `name` as its name.
	 */
	getLogger(name : string) : Logger;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * A synchronous function that will transform a log record into something else.
 *
 * @param record The log record being transformed.
 *
 * @returns The transformed log record.
 */
export interface RecordTransformer
{
	(record : Record) : any;
}

/**
 * A synchronous function that will determine whether a log record meets some condition(s).
 *
 * @param record The log record being tested.
 *
 * @returns `true` if the record meets the condition(s), otherwise `false`.
 */
export interface RecordTester
{
	(record : Record) : boolean;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Creates a transformation stream that will output the input log record transformed by a given transformer.
 *
 * Example usage:
 *
 * ``` js
 * const formatter = transform(record =>
 * {
 *     return `${record.category} - ${record.message}`;
 * });
 *
 * factory.stream.pipe(formatter);
 * ```
 *
 * @param transform The function that will be used to transform each input log record.
 *
 * @returns A transformation stream that you can pipe a stream of log records into.
 */
export function transform(transform : RecordTransformer) : stream.Transform;

/**
 * Creates a transformation stream that will only output the input log record if said log record passes a given test.
 *
 * Example usage:
 *
 * ``` js
 * const refine = filter(record =>
 * {
 *     return record.level.isGreaterThan(Level.WARN);
 * });
 *
 * factory.stream.pipe(refine);
 * ```
 *
 * @param test The function that will be used to test each input log record.
 *
 * @returns A transformation stream that you can pipe a stream of log records into.
 */
export function filter(test : RecordTester) : stream.Transform;

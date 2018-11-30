/// <reference types="node" />

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import { Readable, Transform } from 'stream';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Represents a severity level.
 */
export class Level
{
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
	 * ```
	 * // true
	 * Level.Info.isEqualTo(Level.Info);
	 *
	 * // false
	 * Level.Info.isEqualTo(Level.Warn);
	 * ```
	 *
	 * @param level The level to compare to this level.
	 */
	isEqualTo(level : Level) : boolean;

	/**
	 * Determines whether this level is less severe than another level.
	 *
	 * Example usage:
	 *
	 * ```
	 * // true
	 * Level.Warn.isLessThan(Level.Error);
	 *
	 * // false
	 * Level.Warn.isLessThan(Level.Debug);
	 * ```
	 *
	 * @param level The level to compare to this level.
	 */
	isLessThan(level : Level) : boolean;

	/**
	 * Determines whether this level is less severe than or equally severe to another level.
	 *
	 * Example usage:
	 *
	 * ```
	 * // true
	 * Level.Warn.isLessThanOrEqualTo(Level.Warn);
	 *
	 * // true
	 * Level.Warn.isLessThanOrEqualTo(Level.Error);
	 *
	 * // false
	 * Level.Warn.isLessThanOrEqualTo(Level.Debug);
	 * ```
	 *
	 * @param level The level to compare to this level.
	 */
	isLessThanOrEqualTo(level : Level) : boolean;

	/**
	 * Determines whether this level is more severe than another level.
	 *
	 * Example usage:
	 *
	 * ```
	 * // true
	 * Level.Warn.isGreaterThan(Level.Info);
	 *
	 * // false
	 * Level.Warn.isGreaterThan(Level.Fatal);
	 * ```
	 *
	 * @param level The level to compare to this level.
	 */
	isGreaterThan(level : Level) : boolean;

	/**
	 * Determines whether this level is more severe than or equally as severe to another level.
	 *
	 * Example usage:
	 *
	 * ```
	 * // true
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Warn);
	 *
	 * // true
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Debug);
	 *
	 * // false
	 * Level.Warn.isGreaterThanOrEqualTo(Level.Error);
	 * ```
	 *
	 * @param level The level to compare to this level.
	 */
	isGreaterThanOrEqualTo(level : Level) : boolean;

	/**
	 * Converts a string to a severity level.
	 *
	 * Example usage:
	 *
	 * ```
	 * Level.toLevel('Error') === Level.Error;
	 * ```
	 *
	 * If a corresponding severity level can't be determined then `null` will be returned.
	 *
	 * @param stringToConvert The string to convert into a severity level.
	 */
	static toLevel(stringToConvert : string) : Level | null;

	/**
	 * Represents details useful for debugging an application.
	 */
	static readonly Debug : Level;

	/**
	 * Represents progress of an application.
	 */
	static readonly Info : Level;

	/**
	 * Represents potentially harmful situations.
	 */
	static readonly Warn : Level;

	/**
	 * Represents errors that wouldn't normally stop the application from running.
	 */
	static readonly Error : Level;

	/**
	 * Represents errors that wouldn't normally stop the application from running.
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
	 * The stream that all log records created by this logger will be written too.
	 */
	readonly stream : Readable;

	/**
	 * Creates a log record that is useful for debugging an application.
	 *
	 * Example usage:
	 *
	 * ```
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
	 * ```
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
	 * ```
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
	 * ```
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
	 * ```
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
	 * The loggers that have already been created by this factory.
	 */
	readonly loggers : Logger[];

	/**
	 * The stream that all loggers created by this factory will write log records to.
	 */
	readonly stream : Readable;

	/**
	 * Creates a logger.
	 *
	 * Example usage:
	 *
	 * ```
	 * const logger = factory.getLogger('http');
	 *
	 * logger.error('A request has failed.', {
	 *     url : 'https://www.zelda.com'
	 * });
	 * ```
	 *
	 * If a logger already exists with the provided name, that logger will be returned instead.
	 *
	 * @param name The name of the logger.
	 */
	getLogger(name : string) : Logger;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * A synchronous function that will transform a log record into something else.
 */
export interface RecordTransformer
{
	(record : Record) : any;
}

/**
 * A synchronous function that will determine whether a log record meets a condition.
 */
export interface RecordTester
{
	(record : Record) : boolean;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * Creates a transform stream that will only output the input log record that passes a test.
 *
 * Example usage:
 *
 * ```
 * const refine = filter(record =>
 * {
 *     return record.level.isGreaterThan(Level.WARN);
 * });
 *
 * factory.stream.pipe(refine);
 * ```
 *
 * @param test A function to determine whether a log record meets a condition.
 */
export function filter(test : RecordTester) : Transform;

/**
 * Creates a transform stream that will output the input log record transformed by a transformer.
 *
 * Example usage:
 *
 * ```
 * const formatter = transform(record =>
 * {
 *     return `${record.category} - ${record.message}`;
 * });
 *
 * factory.stream.pipe(formatter);
 * ```
 *
 * @param transform The function that will be used to transform each log record.
 */
export function transform(transform : RecordTransformer) : Transform;

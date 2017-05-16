// Type definitions for Log2Stream
// --------------------------------------------------------

export class Level
{
	readonly name     : string;
	readonly severity : number;

	// -------------------------------------------------------

	constructor(name : string, severity : number);

	// -------------------------------------------------------

	isEqualTo             (level : Level) : boolean;
	isLessThan            (level : Level) : boolean;
	isLessThanOrEqualTo   (level : Level) : boolean;
	isGreaterThan         (level : Level) : boolean;
	isGreaterThanOrEqualTo(level : Level) : boolean;

	// -------------------------------------------------------

	toString() : string;

	// -------------------------------------------------------

	toJSON() : string;

	// -------------------------------------------------------

	static toLevel(stringToConvert : string, defaultLevel? : Level) : Level | null;

	// -------------------------------------------------------

	static ALL   : Level;
	static DEBUG : Level;
	static INFO  : Level;
	static WARN  : Level;
	static ERROR : Level;
	static FATAL : Level;
	static OFF   : Level;
}

// --------------------------------------------------------

export class Record
{
	readonly level    : Level;
	readonly category : string;
	readonly message  : string;
	readonly date     : Date;
	readonly metadata : any;

	// -------------------------------------------------------

	constructor(level : Level, category : string, message : string, metadata? : any);
}

// --------------------------------------------------------

export class Logger
{
	readonly name   : string;
	readonly stream : NodeJS.ReadableStream;

	// -------------------------------------------------------

	level : Level;

	// -------------------------------------------------------

	constructor(name : string, level : Level);

	// -------------------------------------------------------

	debug(message : string, metadata? : any) : void;
	info (message : string, metadata? : any) : void;
	warn (message : string, metadata? : any) : void;
	error(message : string, metadata? : any) : void;
	fatal(message : string, metadata? : any) : void;
}

// --------------------------------------------------------

export class LoggerFactory
{
	readonly loggers : Logger[];
	readonly stream  : NodeJS.ReadableStream;

	// -------------------------------------------------------

	level : Level;

	// -------------------------------------------------------

	getLogger(name : string) : Logger;
}

// --------------------------------------------------------

export interface RecordTransformer
{
	(record : Record) : any;
}

// --------------------------------------------------------

export interface RecordFilter
{
	(record : Record) : boolean;
}

// --------------------------------------------------------

export function filter(test : RecordFilter) : NodeJS.ReadableStream;

// --------------------------------------------------------

export function transform(transform : RecordTransformer) : NodeJS.ReadableStream;

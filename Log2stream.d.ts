/// <reference types="node" />

// --------------------------------------------------------

import * as stream from 'stream';

// --------------------------------------------------------

export class Level
{
	readonly name : string;
	readonly severity : number;

	constructor(name : string, severity : number);

	isEqualTo(level : Level) : boolean;
	isLessThan(level : Level) : boolean;
	isLessThanOrEqualTo(level : Level) : boolean;
	isGreaterThan(level : Level) : boolean;
	isGreaterThanOrEqualTo(level : Level) : boolean;
	toJSON() : string;

	static toLevel(stringToConvert : string, defaultLevel? : Level) : Level | null;

	static readonly ALL : Level;
	static readonly DEBUG : Level;
	static readonly INFO : Level;
	static readonly WARN : Level;
	static readonly ERROR : Level;
	static readonly FATAL : Level;
	static readonly OFF : Level;
}

// --------------------------------------------------------

export class Record
{
	readonly level : Level;
	readonly category : string;
	readonly message : string;
	readonly date : Date;
	readonly metadata : any;

	constructor(level : Level, category : string, message : string, metadata? : any);
}

// --------------------------------------------------------

export class Logger
{
	level : Level;
	readonly name : string;
	readonly stream : stream.Readable;

	constructor(name : string, level : Level);

	debug(message : string, metadata? : any) : void;
	info(message : string, metadata? : any) : void;
	warn(message : string, metadata? : any) : void;
	error(message : string, metadata? : any) : void;
	fatal(message : string, metadata? : any) : void;
}

// --------------------------------------------------------

export class LoggerFactory
{
	readonly level : Level;
	readonly loggers : Logger[];
	readonly stream : stream.Readable;

	constructor(level : Level);

	setLoggerLevel(level : Level, force? : boolean) : void;
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

export function filter(test : RecordFilter) : stream.Transform;

// --------------------------------------------------------

export function transform(transform : RecordTransformer) : stream.Transform;

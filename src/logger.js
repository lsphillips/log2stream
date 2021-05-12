import { PassThrough } from 'stream';
import Level           from './level.js';
import Record          from './record.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class Logger
{
	constructor (name)
	{
		Object.defineProperty(this, 'name', {
			enumerable : true, value : name
		});

		Object.defineProperty(this, 'stream', {

			value : new PassThrough({
				objectMode : true
			}).setMaxListeners(Infinity).pause()
		});
	}

	debug (message, metadata)
	{
		this.stream.write(
			new Record(Level.Debug, this.name, message, metadata)
		);
	}

	info (message, metadata)
	{
		this.stream.write(
			new Record(Level.Info, this.name, message, metadata)
		);
	}

	warn (message, metadata)
	{
		this.stream.write(
			new Record(Level.Warn, this.name, message, metadata)
		);
	}

	error (message, metadata)
	{
		this.stream.write(
			new Record(Level.Error, this.name, message, metadata)
		);
	}

	fatal (message, metadata)
	{
		this.stream.write(
			new Record(Level.Fatal, this.name, message, metadata)
		);
	}
}

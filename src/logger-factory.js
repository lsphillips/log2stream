import {
	PassThrough
} from 'node:stream';
import Logger from './logger.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class LoggerFactory
{
	constructor ()
	{
		Object.defineProperty(this, 'loggers', {
			enumerable : true, value : []
		});

		Object.defineProperty(this, 'stream', {

			value : new PassThrough({
				objectMode : true
			}).setMaxListeners(Infinity).pause()
		});
	}

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

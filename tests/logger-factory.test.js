import * as stream from 'node:stream';
import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	streamToArray
} from './support/stream-helpers.js';
import {
	Logger,
	Record,
	LoggerFactory
} from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class LoggerFactory', function ()
{
	describe('#loggers', function ()
	{
		it('shall be empty when a new factory is created', function ()
		{
			// Act & Assert.
			assert.strictEqual(new LoggerFactory().loggers.length, 0);
		});

		it('shall be a collection of all loggers that have been created', function ()
		{
			// Setup.
			const factory = new LoggerFactory();

			// Act.
			const loggerA = factory.getLogger('loggerA'),
			      loggerB = factory.getLogger('loggerB'),
			      loggerC = factory.getLogger('loggerC');

			// Assert.
			assert.deepStrictEqual(factory.loggers, [
				loggerA,
				loggerB,
				loggerC
			]);
		});
	});

	describe('#stream', function ()
	{
		it('shall be a stream that is readable', function ()
		{
			// Act & Assert.
			assert.ok(new LoggerFactory().stream instanceof stream.Readable);
		});

		it('shall be a stream that allows an infinite number of listeners', function ()
		{
			// Act & Assert.
			assert.strictEqual(new LoggerFactory().stream.getMaxListeners(), Infinity);
		});

		it('shall be a stream that is initially paused', function ()
		{
			// Act & Assert.
			assert.ok(
				new LoggerFactory().stream.isPaused()
			);
		});
	});

	describe('#getLogger(name)', function ()
	{
		it('shall create and return a logger with its name set to `name`', function ()
		{
			// Setup.
			const factory = new LoggerFactory();

			// Act & Assert.
			assert.ok(factory.getLogger('Test') instanceof Logger);
		});

		it('shall pipe all log records logged by the created logger into LoggerFactory#stream', async function ()
		{
			// Setup.
			const factory = new LoggerFactory();

			// Setup.
			const logger = factory.getLogger('Test');

			// Act.
			logger.info('This is an information message.');

			// Assert.
			const records = await streamToArray(
				factory.stream.end()
			);

			// Assert.
			assert.strictEqual(records.length, 1);

			// Assert.
			assert.ok(records[0] instanceof Record);
		});

		it('shall return an existing logger if one already exists with the provided `name`', function ()
		{
			// Setup.
			const factory = new LoggerFactory();

			// Act & Assert.
			assert.strictEqual(
				factory.getLogger('Test'),
				factory.getLogger('Test')
			);
		});
	});
});

import * as stream from 'node:stream';
import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	Level,
	Logger
} from '../src/log2stream.js';
import {
	streamToArray
} from './support/stream-helpers.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Logger', function ()
{
	describe('constructor(name)', function ()
	{
		it('shall set Logger#name to `name`', function ()
		{
			// Act & Assert.
			assert.strictEqual(new Logger('Test').name, 'Test');
		});
	});

	describe('#stream', function ()
	{
		it('shall be a stream that is readable', function ()
		{
			// Act & Assert.
			assert.ok(new Logger('Test').stream instanceof stream.Readable);
		});

		it('shall be a stream that allows an infinite number of listeners', function ()
		{
			// Act & Assert.
			assert.strictEqual(new Logger('Test').stream.getMaxListeners(), Infinity);
		});

		it('shall be a stream that is initially paused', function ()
		{
			// Act & Assert.
			assert.ok(
				new Logger('Test').stream.isPaused()
			);
		});
	});

	['Debug', 'Info', 'Warn', 'Error', 'Fatal'].forEach(function (level)
	{
		let method = level.toLowerCase();

		describe(`#${method}(message, metadata)`, function ()
		{
			it(`shall write a log record to Logger#stream with the level of said record set to Level.${level}`, async function ()
			{
				// Setup.
				const logger = new Logger('Test');

				// Act.
				logger[method]('This is a message.');

				// Assert.
				const records = await streamToArray(
					logger.stream.end()
				);

				// Assert.
				assert.strictEqual(
					records[0].level, Level[level]
				);
			});

			it('shall write a log record to Logger#stream with the category of said record set to Logger#name', async function ()
			{
				// Setup.
				const logger = new Logger('Test');

				// Act.
				logger[method]('This is a message.');

				// Assert.
				const records = await streamToArray(
					logger.stream.end()
				);

				// Assert.
				assert.strictEqual(records[0].category, 'Test');
			});

			it('shall write a log record to Logger#stream with the message of said record set to `message`', async function ()
			{
				// Setup.
				const logger = new Logger('Test');

				// Act.
				logger[method]('This is a message.');

				// Assert.
				const records = await streamToArray(
					logger.stream.end()
				);

				// Assert.
				assert.strictEqual(records[0].message, 'This is a message.');
			});

			it('shall write a log record to Logger#stream with the associated metadata of said record set to `metadata`', async function ()
			{
				// Setup.
				const metadata = {};

				// Setup.
				const logger = new Logger('Test');

				// Act.
				logger[method]('This is a message.', metadata);

				// Assert.
				const records = await streamToArray(
					logger.stream.end()
				);

				// Assert.
				assert.strictEqual(records[0].metadata, metadata);
			});

			it('shall write a log record to Logger#stream with the associated metadata of said record set to `null` when `metadata` is not provided', async function ()
			{
				// Setup.
				const logger = new Logger('Test');

				// Act.
				logger[method]('This is a message.');

				// Assert.
				const records = await streamToArray(
					logger.stream.end()
				);

				// Assert.
				assert.strictEqual(records[0].metadata, null);
			});
		});
	});
});

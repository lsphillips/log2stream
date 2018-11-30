'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const stream            = require('stream');
const { expect }        = require('chai');
const { Level, Logger } = require('../src/log2stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Logger', function ()
{
	describe('constructor(name)', function ()
	{
		it('shall set Logger#name to `name`', function ()
		{
			// Act.
			let logger = new Logger('Test', Level.ERROR);

			// Assert.
			expect(logger.name).to.equal('Test');
		});
	});

	describe('#stream', function ()
	{
		it('shall be a stream that is readable', function ()
		{
			// Setup.
			let logger = new Logger('Test');

			// Act & Assert.
			expect(logger.stream).to.be.instanceof(stream.Readable);
		});

		it('shall be a stream that allows an infinite number of listeners', function ()
		{
			// Setup.
			let logger = new Logger('Test');

			// Act & Assert.
			expect(
				logger.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		it('shall be a stream that is initially paused', function ()
		{
			// Setup.
			let logger = new Logger('Test');

			// Act & Assert.
			expect(
				logger.stream.isPaused()
			).to.be.true;
		});
	});

	[
		'Debug',
		'Info',
		'Warn',
		'Error',
		'Fatal'

	].forEach(function (level)
	{
		let method = level.toLowerCase();

		describe(`#${method}(message, metadata)`, function ()
		{
			it(`shall write a log record to Logger#stream with the level of said record set to Level.${level}`, function (done)
			{
				// Setup.
				let logger = new Logger('Test');

				// Setup.
				logger.stream.on('data', record =>
				{
					// Assert.
					expect(record.level).to.equal(
						Level[level]
					);

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.');
			});

			it('shall write a log record to Logger#stream with the category of said record set to Logger#name', function (done)
			{
				// Setup.
				let logger = new Logger('Test');

				// Setup.
				logger.stream.on('data', record =>
				{
					// Assert.
					expect(record.category).to.equal('Test');

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.');
			});

			it('shall write a log record to Logger#stream with the message of said record set to `message`', function (done)
			{
				// Setup.
				let logger = new Logger('Test');

				// Setup.
				logger.stream.on('data', record =>
				{
					// Assert.
					expect(record.message).to.equal('This is a message.');

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.');
			});

			it('shall write a log record to Logger#stream with the associated metadata of said record set to `metadata`', function (done)
			{
				let metadata = {};

				// Setup.
				let logger = new Logger('Test');

				// Setup.
				logger.stream.on('data', record =>
				{
					// Assert.
					expect(record.metadata).to.equal(metadata);

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.', metadata);
			});

			it('shall write a log record to Logger#stream with the associated metadata of said record set to `null` when `metadata` is not provided', function (done)
			{
				// Setup.
				let logger = new Logger('Test');

				// Setup.
				logger.stream.on('data', record =>
				{
					// Assert.
					expect(record.metadata).to.be.null;

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.');
			});
		});
	});
});

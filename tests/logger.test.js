'use strict';

// Dependencies
// --------------------------------------------------------

const stream     = require('stream');
const { expect } = require('chai');
const sinon      = require('sinon');

// Subjects
// --------------------------------------------------------

const Level  = require('../src/level');
const Logger = require('../src/logger');

// --------------------------------------------------------

describe('class Logger', function ()
{
	describe('constructor(name, level)', function ()
	{
		it('shall set Logger#name to `name`', function ()
		{
			// Act.
			let logger = new Logger('Test', Level.ERROR);

			// Assert.
			expect(logger.name).to.equal('Test');
		});

		it('shall set Logger#level to `level`', function ()
		{
			// Act.
			let logger = new Logger('Test', Level.ERROR);

			// Assert.
			expect(logger.level).to.equal(Level.ERROR);
		});
	});

	describe('#name', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			expect(function ()
			{
				logger.name = 'Another Test';

			}).to.throw(TypeError);
		});
	});

	describe('#stream', function ()
	{
		it('shall be a `Duplex` stream', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			expect(logger.stream).to.be.instanceof(stream.Duplex);
		});

		it('shall allow for an infinite number of listeners', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			expect(
				logger.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		it('shall be initially paused', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			expect(
				logger.stream.isPaused()
			).to.be.true;
		});

		it('shall not be overwritable', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			expect(function ()
			{
				logger.stream = new stream.PassThrough();

			}).to.throw(TypeError);
		});
	});

	[
		'debug',
		'info',
		'warn',
		'error',
		'fatal'

	].forEach(function (method)
	{
		let nameOfLevel = method.toUpperCase();

		describe(`#${method}(message, metadata)`, function ()
		{
			it(`shall write a log record to Logger#stream only when Level.${nameOfLevel} is greater than or equal to the minimum severity level of the logger`, function ()
			{
				// Setup.
				let logger = new Logger('Test', Level.OFF);

				// Spy.
				let spy = sinon.spy(logger.stream, 'write');

				// Act.
				logger[method]('This is a message.');

				// Assert.
				expect(spy.called).to.be.false;
			});

			it(`shall write a log record to Logger#stream with the level of said record set to Level.${nameOfLevel}`, function (done)
			{
				// Setup.
				let logger = new Logger('Test', Level.ALL);

				// Setup.
				logger.stream.on('data', function (record)
				{
					// Assert.
					expect(record.level).to.equal(
						Level[nameOfLevel]
					);

					done();

				}).resume();

				// Act.
				logger[method]('This is a message.');
			});

			it('shall write a log record to Logger#stream with the category of said record set to Logger#name', function (done)
			{
				// Setup.
				let logger = new Logger('Test', Level.ALL);

				// Setup.
				logger.stream.on('data', function (record)
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
				let logger = new Logger('Test', Level.ALL);

				// Setup.
				logger.stream.on('data', function (record)
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
				let logger = new Logger('Test', Level.ALL);

				// Setup.
				logger.stream.on('data', function (record)
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
				let logger = new Logger('Test', Level.ALL);

				// Setup.
				logger.stream.on('data', function (record)
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

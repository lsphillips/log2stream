/* eslint-env mocha */

'use strict';

// Dependencies
// --------------------------------------------------------

const chai   = require('chai');
const stream = require('stream');
const sinon  = require('sinon');

// --------------------------------------------------------

const Level = require('../src/level');

// --------------------------------------------------------

describe('class Logger', function ()
{
	const Logger = require('../src/logger');

	// -------------------------------------------------------

	describe('constructor(name, level)', function ()
	{
		it('shall set Logger#name to `name`', function ()
		{
			// Act.
			let logger = new Logger('Test', Level.ERROR);

			// Assert.
			chai.expect(logger.name).to.equal('Test');
		});

		// ------------------------------------------------------

		it('shall set Logger#level to `level`', function ()
		{
			// Act.
			let logger = new Logger('Test', Level.ERROR);

			// Assert.
			chai.expect(logger.level).to.equal(Level.ERROR);
		});
	});

	// -------------------------------------------------------

	describe('#name', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			chai.expect(function ()
			{
				logger.name = 'Another Test';

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#stream', function ()
	{
		it('shall be a `Duplex` stream', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			chai.expect(logger.stream).to.be.instanceof(stream.Duplex);
		});

		// ------------------------------------------------------

		it('shall allow for an infinite number of listeners', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			chai.expect(
				logger.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		// ------------------------------------------------------

		it('shall be initially paused', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			chai.expect(
				logger.stream.isPaused()
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall not be overwritable', function ()
		{
			// Setup.
			let logger = new Logger('Test', Level.ERROR);

			// Act & Assert.
			chai.expect(function ()
			{
				logger.stream = new stream.PassThrough();

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	['debug', 'info', 'warn', 'error', 'fatal'].forEach(function (method)
	{
		let nameOfLevel = method.toUpperCase();

		describe(`#${method}(message, metadata)`, function ()
		{
			context('shall write a log record to Logger#stream', function ()
			{
				it(`only when Level.${nameOfLevel} is greater than or equal to the minimum severity level of the logger`, function ()
				{
					// Setup.
					let logger = new Logger('Test', Level.OFF);

					// Setup.
					sinon.spy(logger.stream, 'write');

					// Act.
					logger[method]('This is a message.');

					// Assert.
					chai.expect(logger.stream.write.called).to.be.false;
				});

				// ----------------------------------------------------

				it(`with the level of said record set to Level.${nameOfLevel}`, function (done)
				{
					// Setup.
					let logger = new Logger('Test', Level.ALL);

					// Setup.
					logger.stream.on('data', function (record)
					{
						// Assert.
						chai.expect(record.level).to.equal(
							Level[nameOfLevel]
						);

						done();

					}).resume();

					// Act.
					logger[method]('This is a message.');
				});

				// ----------------------------------------------------

				it('with the category of said record set to Logger#name', function (done)
				{
					// Setup.
					let logger = new Logger('Test', Level.ALL);

					// Setup.
					logger.stream.on('data', function (record)
					{
						// Assert.
						chai.expect(record.category).to.equal('Test');

						done();

					}).resume();

					// Act.
					logger[method]('This is a message.');
				});

				// ----------------------------------------------------

				it('with the message of said record set to `message`', function (done)
				{
					// Setup.
					let logger = new Logger('Test', Level.ALL);

					// Setup.
					logger.stream.on('data', function (record)
					{
						// Assert.
						chai.expect(record.message).to.equal('This is a message.');

						done();

					}).resume();

					// Act.
					logger[method]('This is a message.');
				});

				// ----------------------------------------------------

				it('with the associated metadata of said record set to `metadata`', function (done)
				{
					// Setup.
					let metadata =
					{
					};

					// Setup.
					let logger = new Logger('Test', Level.ALL);

					// Setup.
					logger.stream.on('data', function (record)
					{
						// Assert.
						chai.expect(record.metadata).to.equal(metadata);

						done();

					}).resume();

					// Act.
					logger[method]('This is a message.', metadata);
				});

				// ----------------------------------------------------

				it('with the associated metadata of said record set to `null` when `metadata` is not provided', function (done)
				{
					// Setup.
					let logger = new Logger('Test', Level.ALL);

					// Setup.
					logger.stream.on('data', function (record)
					{
						// Assert.
						chai.expect(record.metadata).to.be.null;

						done();

					}).resume();

					// Act.
					logger[method]('This is a message.');
				});
			});
		});
	});
});

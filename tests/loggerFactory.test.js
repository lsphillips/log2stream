'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const stream                            = require('stream');
const { expect }                        = require('chai');
const { Logger, Record, LoggerFactory } = require('../src/log2stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class LoggerFactory', function ()
{
	describe('#loggers', function ()
	{
		it('shall be empty when a new factory is created', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Assert.
			expect(factory.loggers).to.have.length(0);
		});

		it('shall be a collection of all loggers that have been created', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let loggerA = factory.getLogger('loggerA'),
			    loggerB = factory.getLogger('loggerB'),
			    loggerC = factory.getLogger('loggerC');

			// Assert.
			expect(factory.loggers).to.have.length(3).and.to.include.members([
				loggerA, loggerB, loggerC
			]);
		});
	});

	describe('#stream', function ()
	{
		it('shall be a stream that is readable', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(factory.stream).to.be.instanceof(stream.Readable);
		});

		it('shall be a stream that allows an infinite number of listeners', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(
				factory.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		it('shall be a stream that is initially paused', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(
				factory.stream.isPaused()
			).to.be.true;
		});
	});

	describe('#getLogger(name)', function ()
	{
		it('shall create and return a logger with its name set to `name`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(
				factory.getLogger('Test')
			).to.be.instanceof(Logger);
		});

		it('shall pipe all log records logged by the created logger into LoggerFactory#stream', function (done)
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let logger = factory.getLogger('Test');

			// Setup.
			factory.stream.on('data', record =>
			{
				expect(record).to.be.instanceof(Record);

				done();

			}).resume();

			// Act.
			logger.info('This is an information message.');
		});

		it('shall return an existing logger if one already exists with the provided `name`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let logger = factory.getLogger('Test');

			// Act & Assert.
			expect(
				factory.getLogger('Test')
			).to.equal(logger);
		});
	});
});

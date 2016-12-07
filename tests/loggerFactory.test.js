/* eslint-env mocha */

'use strict';

// Dependencies
// --------------------------------------------------------

const chai   = require('chai');
const stream = require('stream');

// --------------------------------------------------------

const Level  = require('../src/level');
const Logger = require('../src/logger');
const Record = require('../src/record');

// --------------------------------------------------------

describe('class LoggerFactory', function ()
{
	const LoggerFactory = require('../src/loggerFactory');

	// -------------------------------------------------------

	describe('constructor(level)', function ()
	{
		it('shall set LoggerFactory#level to `level`', function ()
		{
			// Act.
			let factory = new LoggerFactory(Level.ERROR);

			// Assert.
			chai.expect(factory.level).to.equal(Level.ERROR);
		});

		// ------------------------------------------------------

		it('shall set LoggerFactory#level to Level.ALL when `level` is not provided', function ()
		{
			// Act.
			let factory = new LoggerFactory();

			// Assert.
			chai.expect(factory.level).to.equal(Level.ALL);
		});
	});

	// -------------------------------------------------------

	describe('#level', function ()
	{
		it('shall update all existing loggers that have not had their minimum severity level explicitly changed', function ()
		{
			// Setup.
			let factory = new LoggerFactory(Level.WARN);

			// Setup.
			let loggerA = factory.getLogger('loggerA'),
					loggerB = factory.getLogger('loggerB'),
					loggerC = factory.getLogger('loggerC');

			// Setup.
			loggerB.level = Level.INFO;

			// Act.
			factory.level = Level.ERROR;

			// Assert.
			chai.expect(loggerA.level).to.equal(Level.ERROR);
			chai.expect(loggerB.level).to.equal(Level.INFO);
			chai.expect(loggerC.level).to.equal(Level.ERROR);
		});

		// ------------------------------------------------------

		it('shall throw a type error when assigned a value that is not an instance of `Level`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(function ()
			{
				factory.level = null;

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#loggers', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(function ()
			{
				factory.loggers = [];

			}).to.throw(TypeError);
		});

		// ------------------------------------------------------

		it('shall be empty when a new factory', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Assert.
			chai.expect(factory.loggers).to.have.length(0);
		});

		// ------------------------------------------------------

		it('shall be a collection of all loggers that have been created', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let loggerA = factory.getLogger('loggerA'),
					loggerB = factory.getLogger('loggerB'),
					loggerC = factory.getLogger('loggerC');

			// Assert.
			chai.expect(factory.loggers).to.have.length(3).and.to.include.members(
			[
				loggerA, loggerB, loggerC
			]);
		});
	});

	// -------------------------------------------------------

	describe('#stream', function ()
	{
		it('shall be a `Duplex` stream', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(factory.stream).to.be.instanceof(stream.Duplex);
		});

		// ------------------------------------------------------

		it('shall allow for an infinite number of listeners', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(
				factory.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		// ------------------------------------------------------

		it('shall be initially paused', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(
				factory.stream.isPaused()
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall not be overwritable', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			chai.expect(function ()
			{
				factory.stream = new stream.PassThrough();

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#getLogger(name)', function ()
	{
		it('shall create and return a logger with its name set to `name` and its level initially set to LoggerFactory#level', function ()
		{
			// Setup.
			let factory = new LoggerFactory(Level.WARN);

			// Act & Assert.
			chai.expect(
				factory.getLogger('Test')
			).to.be.instanceof(Logger).and.to.include(
			{
				level : Level.WARN, name : 'Test'
			});
		});

		// ------------------------------------------------------

		it('shall pipe all log records logged by the created logger into LoggerFactory#stream', function (done)
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let logger = factory.getLogger('Test');

			// Setup.
			factory.stream.on('data', function (record)
			{
				chai.expect(record).to.be.instanceof(Record);

				done();

			}).resume();

			// Act.
			logger.info('This is an information message.');
		});

		// ------------------------------------------------------

		it('shall return an existing logger if one already exists with the provided `name`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let logger = factory.getLogger('Test');

			// Act & Assert.
			chai.expect(
				factory.getLogger('Test')
			).to.equal(logger);
		});
	});
});

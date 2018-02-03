'use strict';

// Dependencies
// --------------------------------------------------------

const stream     = require('stream');
const { expect } = require('chai');

// Subjects
// --------------------------------------------------------

const Level         = require('../src/level');
const Logger        = require('../src/logger');
const Record        = require('../src/record');
const LoggerFactory = require('../src/loggerFactory');

// --------------------------------------------------------

describe('class LoggerFactory', function ()
{
	describe('constructor(level)', function ()
	{
		it('shall set LoggerFactory#level to `level`', function ()
		{
			// Act.
			let factory = new LoggerFactory(Level.ERROR);

			// Assert.
			expect(factory.level).to.equal(Level.ERROR);
		});

		it('shall set LoggerFactory#level to Level.ALL when `level` is not provided', function ()
		{
			// Act.
			let factory = new LoggerFactory();

			// Assert.
			expect(factory.level).to.equal(Level.ALL);
		});
	});

	describe('#loggers', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(function ()
			{
				factory.loggers = [];

			}).to.throw(TypeError);
		});

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
		it('shall be a `Duplex` stream', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(factory.stream).to.be.instanceof(stream.Duplex);
		});

		it('shall allow for an infinite number of listeners', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(
				factory.stream.getMaxListeners()
			).to.equal(Infinity);
		});

		it('shall be initially paused', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(
				factory.stream.isPaused()
			).to.be.true;
		});

		it('shall not be overwritable', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(function ()
			{
				factory.stream = new stream.PassThrough();

			}).to.throw(TypeError);
		});
	});

	describe('#setLoggerLevel(level, force)', function ()
	{
		it('shall set LoggerFactory#level to `level`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act.
			factory.setLoggerLevel(Level.WARN);

			// Assert.
			expect(factory.level).to.equal(Level.WARN);
		});

		it('shall throw a type error when `level` is not an instance of `Level`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Act & Assert.
			expect(function ()
			{
				factory.setLoggerLevel(null);

			}).to.throw(TypeError);
		});

		it('shall update all existing loggers that have not had their minimum severity level manually changed when `force` is `false` or ommitted', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let loggerA = factory.getLogger('loggerA'),
			    loggerB = factory.getLogger('loggerB'),
			    loggerC = factory.getLogger('loggerC');

			// Setup.
			loggerB.level = Level.INFO;

			// Act.
			factory.setLoggerLevel(Level.ERROR);

			// Assert.
			expect(loggerA.level).to.equal(Level.ERROR);
			expect(loggerB.level).to.equal(Level.INFO);
			expect(loggerC.level).to.equal(Level.ERROR);

			// Act.
			factory.setLoggerLevel(Level.WARN, false);

			// Assert.
			expect(loggerA.level).to.equal(Level.WARN);
			expect(loggerB.level).to.equal(Level.INFO);
			expect(loggerC.level).to.equal(Level.WARN);
		});

		it('shall update all existing loggers when `force` is `true`', function ()
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let loggerA = factory.getLogger('loggerA'),
			    loggerB = factory.getLogger('loggerB'),
			    loggerC = factory.getLogger('loggerC');

			// Setup.
			loggerB.level = Level.INFO;

			// Act.
			factory.setLoggerLevel(Level.ERROR, true);

			// Assert.
			expect(loggerA.level).to.equal(Level.ERROR);
			expect(loggerB.level).to.equal(Level.ERROR);
			expect(loggerC.level).to.equal(Level.ERROR);
		});
	});

	describe('#getLogger(name)', function ()
	{
		it('shall create and return a logger with its name set to `name` and its level initially set to LoggerFactory#level', function ()
		{
			// Setup.
			let factory = new LoggerFactory(Level.WARN);

			// Act & Assert.
			expect(
				factory.getLogger('Test')
			).to.be.instanceof(Logger).and.to.include({
				level : Level.WARN, name : 'Test'
			});
		});

		it('shall pipe all log records logged by the created logger into LoggerFactory#stream', function (done)
		{
			// Setup.
			let factory = new LoggerFactory();

			// Setup.
			let logger = factory.getLogger('Test');

			// Setup.
			factory.stream.on('data', function (record)
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

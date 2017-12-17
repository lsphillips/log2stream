'use strict';

// Dependencies
// --------------------------------------------------------

const chai   = require('chai');
const stream = require('stream');

// --------------------------------------------------------

const Logger        = require('../src/logger');
const Record        = require('../src/record');
const Level         = require('../src/level');
const LoggerFactory = require('../src/loggerFactory');

// --------------------------------------------------------

describe('log2stream', function ()
{
	const log2stream = require('../src/log2stream');

	// -------------------------------------------------------

	describe('.Level', function ()
	{
		it('exposes the `Level` type', function ()
		{
			// Assert.
			chai.expect(log2stream.Level).to.equal(Level);
		});
	});

	// -------------------------------------------------------

	describe('.Record', function ()
	{
		it('exposes the `Record` type', function ()
		{
			// Assert.
			chai.expect(log2stream.Record).to.equal(Record);
		});
	});

	// -------------------------------------------------------

	describe('.Logger', function ()
	{
		it('exposes the `Logger` type', function ()
		{
			// Assert.
			chai.expect(log2stream.Logger).to.equal(Logger);
		});
	});

	// -------------------------------------------------------

	describe('.LoggerFactory', function ()
	{
		it('exposes the `LoggerFactory` type', function ()
		{
			// Assert.
			chai.expect(log2stream.LoggerFactory).to.equal(LoggerFactory);
		});
	});

	// -------------------------------------------------------

	describe('.filter(test)', function ()
	{
		context('shall return a stream', function ()
		{
			it('that is a `Transform` stream', function ()
			{
				// Act & Assert.
				chai.expect(
					log2stream.filter(function ()
					{
						return true;
					})
				).to.be.instanceof(stream.Transform);
			});

			// -----------------------------------------------------

			it('that shall filter log records that do not satisfy the `test` function', function (done)
			{
				let anExampleRecord = new Record(Level.ERROR, 'Category', 'This is an error message.');

				// Setup.
				let transformer = log2stream.filter(function (record)
				{
					return record.level === Level.ERROR;
				});

				// Setup.
				transformer.on('data', function (record)
				{
					// Assert.
					chai.expect(record).to.equal(anExampleRecord);

					done();
				});

				// Act.
				transformer.write(
					new Record(Level.WARN, 'Another Category', 'This is a warning message.')
				);

				// Act.
				transformer.write(anExampleRecord);
			});
		});
	});

	// -------------------------------------------------------

	describe('.transform(transform)', function ()
	{
		context('shall return a stream', function ()
		{
			it('that is a `Transform` stream', function ()
			{
				// Act & Assert.
				chai.expect(
					log2stream.transform(function (record)
					{
						return record;
					})
				).to.be.instanceof(stream.Transform);
			});

			// -----------------------------------------------------

			it('that shall transform all log records written to it using the `transform` function', function (done)
			{
				// Setup.
				let transformer = log2stream.transform(function (record)
				{
					return `[${record.level}] ${record.category} - ${record.message}`;
				});

				// Setup.
				transformer.on('data', function (record)
				{
					// Assert.
					chai.expect(record).to.equal('[ERROR] Category - This is an error message.');

					done();
				});

				// Act.
				transformer.write(
					new Record(Level.ERROR, 'Category', 'This is an error message.')
				);
			});
		});
	});
});

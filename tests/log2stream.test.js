'use strict';

// Dependencies
// --------------------------------------------------------

const stream     = require('stream');
const { expect } = require('chai');

// Subjects
// --------------------------------------------------------

const Logger        = require('../src/logger');
const Record        = require('../src/record');
const Level         = require('../src/level');
const LoggerFactory = require('../src/loggerFactory');
const Log2stream    = require('../src/log2stream');

// --------------------------------------------------------

describe('log2stream', function ()
{
	describe('.Level', function ()
	{
		it('exposes the `Level` type', function ()
		{
			// Assert.
			expect(Log2stream.Level).to.equal(Level);
		});
	});

	describe('.Record', function ()
	{
		it('exposes the `Record` type', function ()
		{
			// Assert.
			expect(Log2stream.Record).to.equal(Record);
		});
	});

	describe('.Logger', function ()
	{
		it('exposes the `Logger` type', function ()
		{
			// Assert.
			expect(Log2stream.Logger).to.equal(Logger);
		});
	});

	describe('.LoggerFactory', function ()
	{
		it('exposes the `LoggerFactory` type', function ()
		{
			// Assert.
			expect(Log2stream.LoggerFactory).to.equal(LoggerFactory);
		});
	});

	describe('.filter(test)', function ()
	{
		it('shall return a stream that is a `Transform` stream', function ()
		{
			// Act & Assert.
			expect(
				Log2stream.filter(function ()
				{
					return true;
				})
			).to.be.instanceof(stream.Transform);
		});

		it('shall return a stream that will filter log records that do not satisfy the `test` function', function (done)
		{
			let anExampleRecord = new Record(Level.ERROR, 'Category', 'This is an error message.');

			// Setup.
			let transformer = Log2stream.filter(function (record)
			{
				return record.level === Level.ERROR;
			});

			// Setup.
			transformer.on('data', function (record)
			{
				// Assert.
				expect(record).to.equal(anExampleRecord);

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

	describe('.transform(transform)', function ()
	{
		it('shall return a stream that is a `Transform` stream', function ()
		{
			// Act & Assert.
			expect(
				Log2stream.transform(function (record)
				{
					return record;
				})
			).to.be.instanceof(stream.Transform);
		});

		it('shall return a stream that transforms all log records written to it using the `transform` function', function (done)
		{
			// Setup.
			let transformer = Log2stream.transform(function (record)
			{
				return `[${record.level}] ${record.category} - ${record.message}`;
			});

			// Setup.
			transformer.on('data', function (record)
			{
				// Assert.
				expect(record).to.equal('[ERROR] Category - This is an error message.');

				done();
			});

			// Act.
			transformer.write(
				new Record(Level.ERROR, 'Category', 'This is an error message.')
			);
		});
	});
});

'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const stream        = require('stream');
const { expect }    = require('chai');
const Logger        = require('../src/logger');
const Record        = require('../src/record');
const Level         = require('../src/level');
const LoggerFactory = require('../src/loggerFactory');
const Log2stream    = require('../src/log2stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
		it('shall return a transformation stream', function ()
		{
			// Act & Assert.
			expect(
				Log2stream.filter(function ()
				{
					return true;
				})
			).to.be.instanceof(stream.Transform);
		});

		it('shall return a stream that will filter log records that do not pass the `test` function', function (done)
		{
			let anExampleRecord = new Record(Level.Error, 'Category', 'This is an error message.');

			// Setup.
			let transformer = Log2stream.filter(record =>
			{
				return record.level === Level.Error;
			});

			// Setup.
			transformer.on('data', record =>
			{
				// Assert.
				expect(record).to.equal(anExampleRecord);

				done();
			});

			// Act.
			transformer.write(
				new Record(Level.Warn, 'Another Category', 'This is a warning message.')
			);

			// Act.
			transformer.write(anExampleRecord);
		});

		it('shall return a stream that will emit an error if the `test` function fails', function (done)
		{
			// Setup.
			let transformer = Log2stream.filter(() =>
			{
				throw new Error('The record could not be tested.');
			});

			// Setup.
			transformer.on('error', error =>
			{
				// Assert.
				expect(error).to.be.instanceOf(Error);

				done();
			});

			// Act.
			transformer.write(
				new Record(Level.Warn, 'Another Category', 'This is a warning message.')
			);
		});
	});

	describe('.transform(transform)', function ()
	{
		it('shall return a transformation stream', function ()
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
			let transformer = Log2stream.transform(record =>
			{
				return `[${record.level}] ${record.category} - ${record.message}`;
			});

			// Setup.
			transformer.on('data', record =>
			{
				// Assert.
				expect(record).to.equal('[Error] Category - This is an error message.');

				done();
			});

			// Act.
			transformer.write(
				new Record(Level.Error, 'Category', 'This is an error message.')
			);
		});

		it('shall return a stream that will emit an error if the `transform` function fails', function (done)
		{
			// Setup.
			let transformer = Log2stream.transform(() =>
			{
				throw new Error('The record could not be transformed.');
			});

			// Setup.
			transformer.on('error', error =>
			{
				// Assert.
				expect(error).to.be.instanceOf(Error);

				done();
			});

			// Act.
			transformer.write(
				new Record(Level.Warn, 'Another Category', 'This is a warning message.')
			);
		});
	});
});

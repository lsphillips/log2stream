'use strict';

// Dependencies
// --------------------------------------------------------

const chai  = require('chai');
const sinon = require('sinon');

// --------------------------------------------------------

const Level = require('../src/level');

// --------------------------------------------------------

describe('class Record', function ()
{
	const Record = require('../src/record');

	// -------------------------------------------------------

	describe('constructor(level, category, message, metadata = null)', function ()
	{
		it('shall set Record#level to `level`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(record.level).to.equal(Level.ERROR);
		});

		// ------------------------------------------------------

		it('shall set Record#category to `category`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(record.category).to.equal('Test');
		});

		// ------------------------------------------------------

		it('shall set Record#message to `message`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(record.message).to.equal('This is an error message.');
		});

		// ------------------------------------------------------

		it('shall set Record#date to the date of which the log record was created', sinon.test(function ()
		{
			// Setup.
			this.clock.tick(699089400000);

			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(
				record.date.toISOString()
			).to.equal('1992-02-26T07:30:00.000Z');
		}));

		// ------------------------------------------------------

		it('shall set Record#metadata to `metadata`', function ()
		{
			let metadata = {};

			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.', metadata);

			// Assert.
			chai.expect(record.metadata).to.equal(metadata);
		});

		// ------------------------------------------------------

		it('shall set Record#metadata to `null` when `metadata` is not provided', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(record.metadata).to.be.null;
		});
	});

	// -------------------------------------------------------

	describe('#level', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Act & Assert.
			chai.expect(function ()
			{
				record.level = Level.WARN;

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#category', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Act & Assert.
			chai.expect(function ()
			{
				record.category = 'Another Test';

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#message', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Act & Assert.
			chai.expect(function ()
			{
				record.message = 'This is not really an error message.';

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#date', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Act & Assert.
			chai.expect(function ()
			{
				record.date = new Date();

			}).to.throw(TypeError);
		});

		// ------------------------------------------------------

		it('shall be an instance of `Date`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			chai.expect(record.date).to.be.instanceof(Date);
		});
	});

	// -------------------------------------------------------

	describe('#metadata', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.',
			{
			});

			// Act & Assert.
			chai.expect(function ()
			{
				record.metadata = {};

			}).to.throw(TypeError);
		});
	});
});

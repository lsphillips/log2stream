import sinon             from 'sinon';
import { expect }        from 'chai';
import { Level, Record } from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Record', function ()
{
	let clock = null;

	beforeEach(function ()
	{
		clock = sinon.useFakeTimers();
	});

	afterEach(function ()
	{
		clock.restore();
	});

	describe('constructor(level, category, message, metadata = null)', function ()
	{
		it('shall set Record#level to `level`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			expect(record.level).to.equal(Level.ERROR);
		});

		it('shall set Record#category to `category`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			expect(record.category).to.equal('Test');
		});

		it('shall set Record#message to `message`', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			expect(record.message).to.equal('This is an error message.');
		});

		it('shall set Record#date to the date of which the log record was created', function ()
		{
			// Setup.
			clock.tick(699089400000);

			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			expect(record.date).to.be.instanceof(Date);

			// Assert.
			expect(
				record.date.toISOString()
			).to.equal('1992-02-26T07:30:00.000Z');
		});

		it('shall set Record#metadata to `metadata`', function ()
		{
			let metadata = {};

			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.', metadata);

			// Assert.
			expect(record.metadata).to.equal(metadata);
		});

		it('shall set Record#metadata to `null` when `metadata` is not provided', function ()
		{
			// Act.
			let record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			expect(record.metadata).to.be.null;
		});
	});
});

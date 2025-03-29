import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	Level,
	Record
} from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Record', function ()
{
	describe('constructor(level, category, message, metadata = null)', function ()
	{
		it('shall set Record#level to `level`', function ()
		{
			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			assert.strictEqual(record.level, Level.ERROR);
		});

		it('shall set Record#category to `category`', function ()
		{
			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			assert.strictEqual(record.category, 'Test');
		});

		it('shall set Record#message to `message`', function ()
		{
			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			assert.strictEqual(record.message, 'This is an error message.');
		});

		it('shall set Record#date to the date of which the log record was created', function ({
			mock
		})
		{
			// Setup.
			mock.timers.enable({
				apis : ['Date'], now : 699089400000
			});

			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			assert.ok(record.date instanceof Date);

			// Assert.
			assert.strictEqual(record.date.toISOString(), '1992-02-26T07:30:00.000Z');
		});

		it('shall set Record#metadata to `metadata`', function ()
		{
			// Setup.
			const metadata = {};

			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.', metadata);

			// Assert.
			assert.strictEqual(record.metadata, metadata);
		});

		it('shall set Record#metadata to `null` when `metadata` is not provided', function ()
		{
			// Act.
			const record = new Record(Level.ERROR, 'Test', 'This is an error message.');

			// Assert.
			assert.strictEqual(record.metadata, null);
		});
	});
});

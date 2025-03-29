import {
	Transform
} from 'node:stream';
import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	streamToArray
} from './support/stream-helpers.js';
import {
	Record,
	Level,
	filter
} from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('filter(test)', function ()
{
	it('shall return a transformation stream', function ()
	{
		// Act.
		const stream = filter(() => true);

		// Assert.
		assert.ok(stream instanceof Transform);
	});

	it('shall return a stream that will filter log records that do not pass the `test` function', async function ()
	{
		const record = new Record(Level.Error, 'Category', 'This is an error message.');

		// Act.
		const stream = filter(r => r.level === Level.Error);

		// Setup.
		stream.write(
			new Record(Level.Warn, 'Another Category', 'This is a warning message.')
		);
		stream.write(record);

		// Setup.
		const records = await streamToArray(
			stream.end()
		);

		// Assert.
		assert.strictEqual(records.length, 1);

		// Assert.
		assert.strictEqual(records[0], record);
	});

	it('shall return a stream that will emit an error if the `test` function fails', async function ()
	{
		// Setup.
		const stream = filter(() =>
		{
			throw new Error('The record could not be tested.');
		});

		// Act.
		stream.write(
			new Record(Level.Warn, 'Another Category', 'This is a warning message.')
		);

		// Assert.
		await assert.rejects(async () =>
		{
			await streamToArray(stream);

		}, Error);
	});
});

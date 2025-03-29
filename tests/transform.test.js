import {
	Transform
} from 'node:stream';
import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	Record,
	Level,
	transform
} from '../src/log2stream.js';
import {
	streamToArray
} from './support/stream-helpers.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('transform(transform)', function ()
{
	it('shall return a transformation stream', function ()
	{
		// Act.
		const stream = transform(record => record);

		// Assert.
		assert.ok(stream instanceof Transform);
	});

	it('shall return a stream that transforms all log records written to it using the `transform` function', async function ()
	{
		// Act.
		const stream = transform(record => `[${record.level}] ${record.category} - ${record.message}`);

		// Setup.
		stream.write(
			new Record(Level.Error, 'Category', 'This is an error message.')
		);

		// Setup.
		const records = await streamToArray(
			stream.end()
		);

		// Assert.
		assert.strictEqual(records[0], '[Error] Category - This is an error message.');
	});

	it('shall return a stream that will emit an error if the `transform` function fails', async function ()
	{
		// Act.
		const stream = transform(() =>
		{
			throw new Error('The record could not be transformed.');
		});

		// Setup.
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

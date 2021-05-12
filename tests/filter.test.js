import * as stream               from 'stream';
import { expect }                from 'chai';
import { Record, Level, filter } from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('filter(test)', function ()
{
	it('shall return a transformation stream', function ()
	{
		// Act & Assert.
		expect(
			filter(() => true)
		).to.be.instanceof(stream.Transform);
	});

	it('shall return a stream that will filter log records that do not pass the `test` function', function (done)
	{
		let anExampleRecord = new Record(Level.Error, 'Category', 'This is an error message.');

		// Setup.
		let transformer = filter(record =>
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
		let transformer = filter(() =>
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

import * as stream                  from 'stream';
import { expect }                   from 'chai';
import { Record, Level, transform } from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('transform(transform)', function ()
{
	it('shall return a transformation stream', function ()
	{
		// Act & Assert.
		expect(
			transform(record => record)
		).to.be.instanceof(stream.Transform);
	});

	it('shall return a stream that transforms all log records written to it using the `transform` function', function (done)
	{
		// Setup.
		let transformer = transform(record =>
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
		let transformer = transform(() =>
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

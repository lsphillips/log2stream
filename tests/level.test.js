import {
	describe,
	it
} from 'node:test';
import assert from 'node:assert';
import {
	Level
} from '../src/log2stream.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Level', function ()
{
	describe('constructor(name, severity)', function ()
	{
		it('shall set Level#name to `name`', function ()
		{
			// Act.
			const level = new Level('Trace', 10);

			// Assert.
			assert.strictEqual(level.name, 'Trace');
		});

		it('shall set Level#severity to `severity`', function ()
		{
			// Act.
			const level = new Level('Trace', 10);

			// Assert.
			assert.strictEqual(level.severity, 10);
		});
	});

	describe('#toString()', function ()
	{
		it('shall return the name of the level', function ()
		{
			// Act.
			const level = new Level('Trace', 10);

			// Assert.
			assert.strictEqual(level.toString(), 'Trace');
		});
	});

	describe('#toJSON()', function ()
	{
		it('shall return the name of the level', function ()
		{
			// Act.
			const level = new Level('Trace', 10);

			// Assert.
			assert.strictEqual(level.toString(), 'Trace');
		});
	});

	describe('.toLevel(string)', function ()
	{
		it('shall return the predefined level with `string` as its name', function ()
		{
			// Act & Assert.
			assert.strictEqual(Level.toLevel('Error'), Level.Error);
		});

		it('shall return `null` if no predefined level exists with `string` as its name', function ()
		{
			// Act & Assert.
			assert.strictEqual(Level.toLevel('Trace'), null);
		});
	});

	describe('#isEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 10);

			// Act & Assert.
			assert.strictEqual(level.isEqualTo(
				new Level('Debug', 10)
			), true);
		});

		it('shall return `false` when the level severity is not equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 10);

			// Act & Assert.
			assert.strictEqual(level.isEqualTo(
				new Level('Trace', 15)
			), false);
		});
	});

	describe('#isGreaterThan(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThan(
				new Level('Trace', 5)
			), true);
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThan(
				new Level('Trace', 10)
			), false);
		});

		it('shall return `false` when the level severity is not greater than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 5);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThan(
				new Level('Debug', 10)
			), false);
		});
	});

	describe('#isGreaterThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThanOrEqualTo(
				new Level('Trace', 5)
			), true);
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThanOrEqualTo(
				new Level('Trace', 10)
			), true);
		});

		it('shall return `false` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 5);

			// Act & Assert.
			assert.strictEqual(level.isGreaterThanOrEqualTo(
				new Level('Debug', 10)
			), false);
		});
	});

	describe('#isLessThan(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 5);

			// Act & Assert.
			assert.strictEqual(level.isLessThan(
				new Level('Debug', 10)
			), true);
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isLessThan(
				new Level('Trace', 10)
			), false);
		});

		it('shall return `false` when the level severity is not less than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isLessThan(
				new Level('Trace', 5)
			), false);
		});
	});

	describe('#isLessThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Trace', 5);

			// Act & Assert.
			assert.strictEqual(level.isLessThanOrEqualTo(
				new Level('Debug', 10)
			), true);
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isLessThanOrEqualTo(
				new Level('Trace', 10)
			), true);
		});

		it('shall return `false` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			const level = new Level('Debug', 10);

			// Act & Assert.
			assert.strictEqual(level.isLessThanOrEqualTo(
				new Level('Trace', 5)
			), false);
		});
	});

	describe('.Debug', function ()
	{
		it('shall be a predefined level with the name `Debug`', function ()
		{
			// Assert.
			assert.ok(Level.Debug instanceof Level);

			// Assert.
			assert.strictEqual(Level.Debug.name, 'Debug');
		});

		it('shall be less severe than Level.Info', function ()
		{
			// Assert.
			assert.ok(Level.Debug.severity < Level.Info.severity);
		});
	});

	describe('.Info', function ()
	{
		it('shall be a predefined level with the name `Info`', function ()
		{
			// Assert.
			assert.ok(Level.Info instanceof Level);

			// Assert.
			assert.strictEqual(Level.Info.name, 'Info');
		});

		it('that shall be more severe than Level.Debug but less severe than Level.Warn', function ()
		{
			// Assert.
			assert.ok(Level.Info.severity > Level.Debug.severity);

			// Assert.
			assert.ok(Level.Info.severity < Level.Warn.severity);
		});
	});

	describe('.Warn', function ()
	{
		it('shall be a predefined level with the name `Warn`', function ()
		{
			// Assert.
			assert.ok(Level.Warn instanceof Level);

			// Assert.
			assert.strictEqual(Level.Warn.name, 'Warn');
		});

		it('that shall be more severe than Level.Info but less severe than Level.Error', function ()
		{
			// Assert.
			assert.ok(Level.Warn.severity > Level.Info.severity);

			// Assert.
			assert.ok(Level.Warn.severity < Level.Error.severity);
		});
	});

	describe('.Error', function ()
	{
		it('shall be a predefined level with the name `Error`', function ()
		{
			// Assert.
			assert.ok(Level.Error instanceof Level);

			// Assert.
			assert.strictEqual(Level.Error.name, 'Error');
		});

		it('that shall be more severe than Level.Warn but less severe than Level.Fatal', function ()
		{
			// Assert.
			assert.ok(Level.Error.severity > Level.Warn.severity);

			// Assert.
			assert.ok(Level.Error.severity < Level.Fatal.severity);
		});
	});

	describe('.Fatal', function ()
	{
		it('shall be a predefined level with the name `Fatal`', function ()
		{
			// Assert.
			assert.ok(Level.Fatal instanceof Level);

			// Assert.
			assert.strictEqual(Level.Fatal.name, 'Fatal');
		});

		it('that shall be more severe than Level.Error', function ()
		{
			// Assert.
			assert.ok(Level.Fatal.severity > Level.Error.severity);
		});
	});
});

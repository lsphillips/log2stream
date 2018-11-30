'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const { expect } = require('chai');
const { Level }  = require('../src/log2stream');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('class Level', function ()
{
	describe('constructor(name, severity)', function ()
	{
		it('shall set Level#name to `name`', function ()
		{
			// Act.
			let level = new Level('Trace', 10);

			// Assert.
			expect(level.name).to.equal('Trace');
		});

		it('shall set Level#severity to `severity`', function ()
		{
			// Act.
			let level = new Level('Trace', 10);

			// Assert.
			expect(level.severity).to.equal(10);
		});
	});

	describe('#toString()', function ()
	{
		it('shall return the name of the level', function ()
		{
			// Act.
			let level = new Level('Trace', 10);

			// Assert.
			expect(
				level.toString()
			).to.equal('Trace');
		});
	});

	describe('#toJSON()', function ()
	{
		it('shall return the name of the level', function ()
		{
			// Act.
			let level = new Level('Trace', 10);

			// Assert.
			expect(
				level.toString()
			).to.equal('Trace');
		});
	});

	describe('.toLevel(stringToConvert)', function ()
	{
		it('shall return the defined level with `stringToConvert` as its name', function ()
		{
			// Act & Assert.
			expect(
				Level.toLevel('Error')
			).to.equal(Level.Error);
		});

		it('shall return `null` if no defined level exists with `stringToConvert` as its name', function ()
		{
			// Act & Assert.
			expect(
				Level.toLevel('Trace')
			).to.equal(null);
		});
	});

	describe('#isEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 10);

			// Act & Assert.
			expect(
				level.isEqualTo(
					new Level('Debug', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is not equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 10);

			// Act & Assert.
			expect(
				level.isEqualTo(
					new Level('Trace', 15)
				)
			).to.be.false;
		});
	});

	describe('#isGreaterThan(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('Trace', 5)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('Trace', 10)
				)
			).to.be.false;
		});

		it('shall return `false` when the level severity is not greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 5);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('Debug', 10)
				)
			).to.be.false;
		});
	});

	describe('#isGreaterThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('Trace', 5)
				)
			).to.be.true;
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('Trace', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 5);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('Debug', 10)
				)
			).to.be.false;
		});
	});

	describe('#isLessThan(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 5);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('Debug', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('Trace', 10)
				)
			).to.be.false;
		});

		it('shall return `false` when the level severity is not less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('Trace', 5)
				)
			).to.be.false;
		});
	});

	describe('#isLessThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Trace', 5);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('Debug', 10)
				)
			).to.be.true;
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('Trace', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('Debug', 10);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('Trace', 5)
				)
			).to.be.false;
		});
	});

	describe('.Debug', function ()
	{
		it('shall be a predefined level with the name `Debug`', function ()
		{
			// Assert.
			expect(Level.Debug).to.be.instanceof(Level);

			// Assert.
			expect(Level.Debug.name).to.equal('Debug');
		});

		it('shall be less severe than Level.Info', function ()
		{
			// Assert.
			expect(Level.Debug.severity).to.be.below(Level.Info.severity);
		});
	});

	describe('.Info', function ()
	{
		it('shall be a predefined level with the name `Info`', function ()
		{
			// Assert.
			expect(Level.Info).to.be.instanceof(Level);

			// Assert.
			expect(Level.Info.name).to.equal('Info');
		});

		it('that shall be more severe than Level.Debug but less severe than Level.Warn', function ()
		{
			// Assert.
			expect(Level.Info.severity).to.be.above(Level.Debug.severity);

			// Assert.
			expect(Level.Info.severity).to.be.below(Level.Warn.severity);
		});
	});

	describe('.Warn', function ()
	{
		it('shall be a predefined level with the name `Warn`', function ()
		{
			// Assert.
			expect(Level.Warn).to.be.instanceof(Level);

			// Assert.
			expect(Level.Warn.name).to.equal('Warn');
		});

		it('that shall be more severe than Level.Info but less severe than Level.Error', function ()
		{
			// Assert.
			expect(Level.Warn.severity).to.be.above(Level.Info.severity);

			// Assert.
			expect(Level.Warn.severity).to.be.below(Level.Error.severity);
		});
	});

	describe('.Error', function ()
	{
		it('shall be a predefined level with the name `Error`', function ()
		{
			// Assert.
			expect(Level.Error).to.be.instanceof(Level);

			// Assert.
			expect(Level.Error.name).to.equal('Error');
		});

		it('that shall be more severe than Level.Warn but less severe than Level.Fatal', function ()
		{
			// Assert.
			expect(Level.Error.severity).to.be.above(Level.Warn.severity);

			// Assert.
			expect(Level.Error.severity).to.be.below(Level.Fatal.severity);
		});
	});

	describe('.Fatal', function ()
	{
		it('shall be a predefined level with the name `Fatal`', function ()
		{
			// Assert.
			expect(Level.Fatal).to.be.instanceof(Level);

			// Assert.
			expect(Level.Fatal.name).to.equal('Fatal');
		});

		it('that shall be more severe than Level.Error', function ()
		{
			// Assert.
			expect(Level.Fatal.severity).to.be.above(Level.Error.severity);
		});
	});
});

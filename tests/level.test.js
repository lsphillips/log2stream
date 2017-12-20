'use strict';

// Dependencies
// --------------------------------------------------------

const { expect } = require('chai');

// Subjects
// --------------------------------------------------------

const Level = require('../src/level');

// --------------------------------------------------------

describe('class Level', function ()
{
	describe('constructor(name, severity)', function ()
	{
		it('shall set Level#name to `name`', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			expect(level.name).to.equal('TRACE');
		});

		it('shall set Level#severity to `severity`', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			expect(level.severity).to.equal(10);
		});
	});

	describe('#name', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			expect(function ()
			{
				level.name = 'DEBUG';

			}).to.throw(TypeError);
		});
	});

	describe('#severity', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			expect(function ()
			{
				level.severity = 15;

			}).to.throw(TypeError);
		});
	});

	describe('#toString()', function ()
	{
		it('shall return the name of the level a.k.a. Level#name', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			expect(
				level.toString()
			).to.equal('TRACE');
		});
	});

	describe('#toJSON()', function ()
	{
		it('shall return the name of the level a.k.a. Level#name', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			expect(
				level.toString()
			).to.equal('TRACE');
		});
	});

	describe('.toLevel(levelToTranslate, defaultLevel = null)', function ()
	{
		it('shall return the pre-defined level with `levelToTranslate` as its name', function ()
		{
			// Act & Assert.
			expect(
				Level.toLevel('ERROR')
			).to.equal(Level.ERROR);
		});

		it('shall return `defaultLevel` if no pre-defined level exists with `levelToTranslate` as its name', function ()
		{
			// Act & Assert.
			expect(
				Level.toLevel('TRACE', Level.INFO)
			).to.equal(Level.INFO);
		});

		it('shall return `null` if no pre-defined level exists with `levelToTranslate` as its name and `defaultLevel` was not provided', function ()
		{
			// Act & Assert.
			expect(
				Level.toLevel('TRACE')
			).to.equal(null);
		});
	});

	describe('#isEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			expect(
				level.isEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is not equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			expect(
				level.isEqualTo(
					new Level('TRACE', 15)
				)
			).to.be.false;
		});
	});

	describe('#isGreaterThan(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('TRACE', 5)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('TRACE', 10)
				)
			).to.be.false;
		});

		it('shall return `false` when the level severity is not greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			expect(
				level.isGreaterThan(
					new Level('DEBUG', 10)
				)
			).to.be.false;
		});
	});

	describe('#isGreaterThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('TRACE', 5)
				)
			).to.be.true;
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('TRACE', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			expect(
				level.isGreaterThanOrEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.false;
		});
	});

	describe('#isLessThan(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('TRACE', 10)
				)
			).to.be.false;
		});

		it('shall return `false` when the level severity is not less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isLessThan(
					new Level('TRACE', 5)
				)
			).to.be.false;
		});
	});

	describe('#isLessThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('TRACE', 10)
				)
			).to.be.true;
		});

		it('shall return `false` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			expect(
				level.isLessThanOrEqualTo(
					new Level('TRACE', 5)
				)
			).to.be.false;
		});
	});

	describe('.ALL', function ()
	{
		it('shall be a predefined level with the name `ALL`', function ()
		{
			// Assert.
			expect(Level.ALL).to.be.instanceof(Level);

			// Assert.
			expect(Level.ALL.name).to.equal('ALL');
		});

		it('shall be the least severe level that can be defined', function ()
		{
			// Assert.
			expect(Level.ALL.severity).to.equal(Number.MIN_VALUE);
		});
	});

	describe('.DEBUG', function ()
	{
		it('shall be a predefined level with the name `DEBUG`', function ()
		{
			// Assert.
			expect(Level.DEBUG).to.be.instanceof(Level);

			// Assert.
			expect(Level.DEBUG.name).to.equal('DEBUG');
		});

		it('shall be more severe than Level.ALL but less severe than Level.INFO', function ()
		{
			// Assert.
			expect(Level.DEBUG.severity).to.be.above(Level.ALL.severity);

			// Assert.
			expect(Level.DEBUG.severity).to.be.below(Level.INFO.severity);
		});
	});

	describe('.INFO', function ()
	{
		it('shall be a predefined level with the name `INFO`', function ()
		{
			// Assert.
			expect(Level.INFO).to.be.instanceof(Level);

			// Assert.
			expect(Level.INFO.name).to.equal('INFO');
		});

		it('that shall be more severe than Level.DEBUG but less severe than Level.WARN', function ()
		{
			// Assert.
			expect(Level.INFO.severity).to.be.above(Level.DEBUG.severity);

			// Assert.
			expect(Level.INFO.severity).to.be.below(Level.WARN.severity);
		});
	});

	describe('.WARN', function ()
	{
		it('shall be a predefined level with the name `WARN`', function ()
		{
			// Assert.
			expect(Level.WARN).to.be.instanceof(Level);

			// Assert.
			expect(Level.WARN.name).to.equal('WARN');
		});

		it('that shall be more severe than Level.INFO but less severe than Level.ERROR', function ()
		{
			// Assert.
			expect(Level.WARN.severity).to.be.above(Level.INFO.severity);

			// Assert.
			expect(Level.WARN.severity).to.be.below(Level.ERROR.severity);
		});
	});

	describe('.ERROR', function ()
	{
		it('shall be a predefined level with the name `ERROR`', function ()
		{
			// Assert.
			expect(Level.ERROR).to.be.instanceof(Level);

			// Assert.
			expect(Level.ERROR.name).to.equal('ERROR');
		});

		it('that shall be more severe than Level.WARN but less severe than Level.FATAL', function ()
		{
			// Assert.
			expect(Level.ERROR.severity).to.be.above(Level.WARN.severity);

			// Assert.
			expect(Level.ERROR.severity).to.be.below(Level.FATAL.severity);
		});
	});

	describe('.FATAL', function ()
	{
		it('shall be a predefined level with the name `FATAL`', function ()
		{
			// Assert.
			expect(Level.FATAL).to.be.instanceof(Level);

			// Assert.
			expect(Level.FATAL.name).to.equal('FATAL');
		});

		it('that shall be more severe than Level.ERROR but less severe than Level.OFF', function ()
		{
			// Assert.
			expect(Level.FATAL.severity).to.be.above(Level.ERROR.severity);

			// Assert.
			expect(Level.FATAL.severity).to.be.below(Level.OFF.severity);
		});
	});

	describe('.OFF', function ()
	{
		it('shall be a predefined level with the name `OFF`', function ()
		{
			// Assert.
			expect(Level.OFF).to.be.instanceof(Level);

			// Assert.
			expect(Level.OFF.name).to.equal('OFF');
		});

		it('that shall be the most severe level that can be defined', function ()
		{
			// Assert.
			expect(Level.OFF.severity).to.equal(Number.MAX_VALUE);
		});
	});
});

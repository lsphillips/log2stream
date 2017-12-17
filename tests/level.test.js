'use strict';

// Dependencies
// --------------------------------------------------------

const chai = require('chai');

// --------------------------------------------------------

describe('class Level', function ()
{
	const Level = require('../src/level');

	// -------------------------------------------------------

	describe('constructor(name, severity)', function ()
	{
		it('shall set Level#name to `name`', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			chai.expect(level.name).to.equal('TRACE');
		});

		// ------------------------------------------------------

		it('shall set Level#severity to `severity`', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			chai.expect(level.severity).to.equal(10);
		});
	});

	// -------------------------------------------------------

	describe('#name', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			chai.expect(function ()
			{
				level.name = 'DEBUG';

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#severity', function ()
	{
		it('shall not be overwritable', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			chai.expect(function ()
			{
				level.severity = 15;

			}).to.throw(TypeError);
		});
	});

	// -------------------------------------------------------

	describe('#toString()', function ()
	{
		it('shall return the name of the level a.k.a. Level#name', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			chai.expect(
				level.toString()
			).to.equal('TRACE');
		});
	});

	// -------------------------------------------------------

	describe('#toJSON()', function ()
	{
		it('shall return the name of the level a.k.a. Level#name', function ()
		{
			// Act.
			let level = new Level('TRACE', 10);

			// Assert.
			chai.expect(
				level.toString()
			).to.equal('TRACE');
		});
	});

	// -------------------------------------------------------

	describe('.toLevel(levelToTranslate, defaultLevel = null)', function ()
	{
		it('shall return the pre-defined level with `levelToTranslate` as its name', function ()
		{
			// Act & Assert.
			chai.expect(
				Level.toLevel('ERROR')
			).to.equal(Level.ERROR);
		});

		// ------------------------------------------------------

		it('shall return `defaultLevel` if no pre-defined level exists with `levelToTranslate` as its name', function ()
		{
			// Act & Assert.
			chai.expect(
				Level.toLevel('TRACE', Level.INFO)
			).to.equal(Level.INFO);
		});

		// ------------------------------------------------------

		it('shall return `null` if no pre-defined level exists with `levelToTranslate` as its name and `defaultLevel` was not provided', function ()
		{
			// Act & Assert.
			chai.expect(
				Level.toLevel('TRACE')
			).to.equal(null);
		});
	});

	// -------------------------------------------------------

	describe('#isEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			chai.expect(
				level.isEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is not equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 10);

			// Act & Assert.
			chai.expect(
				level.isEqualTo(
					new Level('TRACE', 15)
				)
			).to.be.false;
		});
	});

	// -------------------------------------------------------

	describe('#isGreaterThan(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isGreaterThan(
					new Level('TRACE', 5)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isGreaterThan(
					new Level('TRACE', 10)
				)
			).to.be.false;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is not greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			chai.expect(
				level.isGreaterThan(
					new Level('DEBUG', 10)
				)
			).to.be.false;
		});
	});

	// -------------------------------------------------------

	describe('#isGreaterThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isGreaterThanOrEqualTo(
					new Level('TRACE', 5)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isGreaterThanOrEqualTo(
					new Level('TRACE', 10)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			chai.expect(
				level.isGreaterThanOrEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.false;
		});
	});

	// -------------------------------------------------------

	describe('#isLessThan(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			chai.expect(
				level.isLessThan(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isLessThan(
					new Level('TRACE', 10)
				)
			).to.be.false;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is not less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isLessThan(
					new Level('TRACE', 5)
				)
			).to.be.false;
		});
	});

	// -------------------------------------------------------

	describe('#isLessThanOrEqualTo(level)', function ()
	{
		it('shall return `true` when the level severity is less than that of `level`', function ()
		{
			// Setup.
			let level = new Level('TRACE', 5);

			// Act & Assert.
			chai.expect(
				level.isLessThanOrEqualTo(
					new Level('DEBUG', 10)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `true` when the level severity is equal to that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isLessThanOrEqualTo(
					new Level('TRACE', 10)
				)
			).to.be.true;
		});

		// ------------------------------------------------------

		it('shall return `false` when the level severity is greater than that of `level`', function ()
		{
			// Setup.
			let level = new Level('DEBUG', 10);

			// Act & Assert.
			chai.expect(
				level.isLessThanOrEqualTo(
					new Level('TRACE', 5)
				)
			).to.be.false;
		});
	});

	// -------------------------------------------------------

	context('has some levels pre-defined:', function ()
	{
		describe('.ALL', function ()
		{
			it('that shall be the least severe level that can be defined', function ()
			{
				// Assert.
				chai.expect(Level.ALL).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.ALL.name).to.equal('ALL');

				// Assert.
				chai.expect(Level.ALL.severity).to.equal(Number.MIN_VALUE);
			});
		});

		// ------------------------------------------------------

		describe('.DEBUG', function ()
		{
			it('that shall be more severe than Level.ALL but less severe than Level.INFO', function ()
			{
				// Assert.
				chai.expect(Level.DEBUG).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.DEBUG.name).to.equal('DEBUG');

				// Assert.
				chai.expect(
					Level.DEBUG.severity > Level.ALL.severity && Level.DEBUG.severity < Level.INFO.severity
				).to.be.true;
			});
		});

		// ------------------------------------------------------

		describe('.INFO', function ()
		{
			it('that shall be more severe than Level.DEBUG but less severe than Level.WARN', function ()
			{
				// Assert.
				chai.expect(Level.INFO).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.INFO.name).to.equal('INFO');

				// Assert.
				chai.expect(
					Level.INFO.severity > Level.DEBUG.severity && Level.INFO.severity < Level.WARN.severity
				).to.be.true;
			});
		});

		// ------------------------------------------------------

		describe('.WARN', function ()
		{
			it('that shall be more severe than Level.INFO but less severe than Level.ERROR', function ()
			{
				// Assert.
				chai.expect(Level.WARN).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.WARN.name).to.equal('WARN');

				// Assert.
				chai.expect(
					Level.WARN.severity > Level.INFO.severity && Level.WARN.severity < Level.ERROR.severity
				).to.be.true;
			});
		});

		// ------------------------------------------------------

		describe('.ERROR', function ()
		{
			it('that shall be more severe than Level.WARN but less severe than Level.FATAL', function ()
			{
				// Assert.
				chai.expect(Level.ERROR).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.ERROR.name).to.equal('ERROR');

				// Assert.
				chai.expect(
					Level.ERROR.severity > Level.WARN.severity && Level.ERROR.severity < Level.FATAL.severity
				).to.be.true;
			});
		});

		// ------------------------------------------------------

		describe('.FATAL', function ()
		{
			it('that shall be more severe than Level.ERROR but less severe than Level.OFF', function ()
			{
				// Assert.
				chai.expect(Level.FATAL).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.FATAL.name).to.equal('FATAL');

				// Assert.
				chai.expect(
					Level.FATAL.severity > Level.ERROR.severity && Level.FATAL.severity < Level.OFF.severity
				).to.be.true;
			});
		});

		// ------------------------------------------------------

		describe('.OFF', function ()
		{
			it('that shall be the most severe level that can be defined', function ()
			{
				// Assert.
				chai.expect(Level.ALL).to.be.instanceof(Level);

				// Assert.
				chai.expect(Level.ALL.name).to.equal('ALL');

				// Assert.
				chai.expect(Level.OFF.severity).to.equal(Number.MAX_VALUE);
			});
		});
	});
});

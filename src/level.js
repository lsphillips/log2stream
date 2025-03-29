class Level
{
	constructor (name, severity)
	{
		Object.defineProperty(this, 'name', {
			enumerable : true, value : name
		});

		Object.defineProperty(this, 'severity', {
			value : severity
		});
	}

	isEqualTo (level)
	{
		return this.severity === level.severity;
	}

	isLessThan (level)
	{
		return this.severity < level.severity;
	}

	isLessThanOrEqualTo (level)
	{
		return this.severity <= level.severity;
	}

	isGreaterThan (level)
	{
		return this.severity > level.severity;
	}

	isGreaterThanOrEqualTo (level)
	{
		return this.severity >= level.severity;
	}

	toString ()
	{
		return this.name;
	}

	toJSON ()
	{
		return this.name;
	}

	static toLevel (string)
	{
		const level = Level[string];

		if (level instanceof Level)
		{
			return level;
		}

		return null;
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Level.Debug = new Level('Debug', 1);
Level.Info  = new Level('Info',  2);
Level.Warn  = new Level('Warn',  3);
Level.Error = new Level('Error', 4);
Level.Fatal = new Level('Fatal', 5);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Level;

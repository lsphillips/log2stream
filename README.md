# Log2stream

[![Available from NPM](https://img.shields.io/npm/v/log2stream.svg?maxAge=900)](https://www.npmjs.com/package/log2stream)
[![Built using Travis](https://img.shields.io/travis/lsphillips/Log2stream/master.svg?maxAge=900)](https://travis-ci.org/lsphillips/Log2stream)

A logging library with an interface inspired by Log4j but removes the concepts of appenders and layouts in favour of streams.

## Usage

The TL;DR is that there are factories (usually one) which create loggers which each create log records of various severity levels that you can format, filter and manipulate freely using streams.

### Logger Factories

Loggers are created by a factory.

``` js
const factory = new log2stream.LoggerFactory(Level.WARN);
```

This will create a factory that will create loggers with a minimum severity level of `WARN`.

#### Creating Loggers

Creating loggers is simple:

``` js
const logger = factory.getLogger('category');
```

**Note:** You can only have one logger instance with a given category. Any subsequent attempts to create a logger with the same category using the same factory will return the same logger. For example, this would evaluate to be `true`:

``` js
factory.getLogger('category') === factory.getLogger('category');
```

All loggers are an instance of `log2stream.Logger`. You can retrieve all loggers that have been created by a factory by accessing `factory.loggers`.

#### The factory stream

All log records created by a logger are piped to the stream of the factory responsible for it.

``` js
let aWritableStream = new stream.Writable(
{
    write (record, _, callback)
    {
        // ...
    },

    objectMode : true // important!
});

factory.stream.pipe(aWritableStream);
```

**Note:** Any stream you pipe the factory stream into must have `objectMode` enabled, as log records are being streamed, not strings. Read further at the [Node.js stream documentation](https://nodejs.org/api/stream.html#stream_object_mode).

### Using a logger

You can create log records that highlight severe errors that may stop the application from running:

``` js
logger.fatal('This is a fatal message.');
```

You can create log records that highlight errors that wouldn't normally stop the application from running.

``` js
logger.error('This is an error message.');
```

You can create log records that highlight potentially harmful situations, a.k.a warnings.

``` js
logger.warn('This is a warning message.');
```

You can create log records that highlight the progress of an application.

``` js
logger.info('This is an information message.');
```

You can create log records that are useful for debugging an application.

``` js
logger.debug('This is a debug message.');
```

In addition to logging a string message, you may also provide additional metadata:

``` js
logger.warn('This is a warning message.',
{
    anything : 'something'
});
```

#### The logger stream

All log records created by a logger that have a severity level higher than or equal to the minimum severity level of said logger are piped to its own stream.

``` js
let aWritableStream = new stream.Writable(
{
    write (record, _, callback)
    {
        // ...
    },

    objectMode : true // Important!
});

logger.stream.pipe(aWritableStream);
```

**Note:** As mentioned earlier, the factory responsible for a logger will automatically pipe the stream of said logger into its own stream.

### Severity levels

There are 5 levels of severity a log record can take: (in order of severity)

  - `FATAL` - Severe errors that may stop the application from running. Created by `logger.fatal()`.
  - `ERROR` - Errors that wouldn't normally stop the application from running. Created by `logger.error()`.
  - `WARN`  - Potentially harmful situations, a.k.a warnings. Created by `logger.warn()`.
  - `INFO`  - Progress of an application. Created by `logger.info()`.
  - `DEBUG` - Details useful for debugging an application. Created by `logger.debug()`.

Loggers will only create log records with a severity level higher than or equal to its minimum severity level. For example, if the logger level is `WARN`, then an attempt to create a record with `logger.info()` will do nothing.

These levels are exposed through the `log2stream.Level` type.

#### Configuring severity levels

You can set the minimum severity level for a logger:

``` js
logger.level = log2stream.Level.ERROR;
```

However, you normally want to control logging at the application level, not at the module level. In that case you probably want to set the minimum severity level of the factory:

``` js
factory.setLoggerLevel(log2stream.Level.ERROR);
```

This will mean that any loggers created in the future will have its minimum severity level set to `ERROR`. This will also update the minimum severity level of all loggers it is responsible for to level `ERROR`. If a logger has had its minimum severity level explicitly set, the factory responsible for it will never update the minimum severity level of said logger.

If you want to override the minimum severity level of all created loggers regardless of whether a logger has been explicitly configured or not, then you can use the `force` flag:

``` js
factory.setLoggerLevel(log2stream.Level.ERROR, true);
```

#### Disabling logging

To disable all logging from a logger or factory, simply set its minimum severity level to `OFF`:

``` js
factory.level = log2stream.Level.OFF;
```

There is also the severity level `ALL` which allows log records of any severity level to be created:

``` js
factory.level = log2stream.Level.ALL;
```

### Manipulating log records

As mentioned earlier, Log2stream does not have the concept of appenders and layouts. You have to do that yourself using streams.

#### Log records

A log record is just an instance of `log2stream.Record`, which is just a dumb object with these properties:

  - `level`    - The severity level of the log record. An instance of `log2stream.Level`.
  - `category` - The category of the log record. Matches the category of the logger that created it.
  - `message`  - The message describing the log record.
  - `date`     - The date of which the log record was created. This is a `Date` object.
  - `metadata` - Any metadata associated with the log record. Defaults to `null`.

#### Formatting log records

To format log records you will have to pipe the stream of a factory (or logger) into a transform stream. Log2stream provides a utility to help you achieve this:

``` js
let formatter = log2stream.transform(function (record)
{
    return `${record.category} - ${record.message}`;
});

factory.stream.pipe(formatter).pipe(process.stdout);
```

#### Filtering log records

There could be times when you want to filter log records. An example would be to pipe all log records of a severity level greater than `WARN` into the `stderr` stream.

To achieve this you will have to pipe the stream of a factory (or logger) into a transform stream. Log2stream provides a utility to help you achieve this as well:

``` js
let filter = log2stream.filter(function (record)
{
    return record.level.isGreaterThan(log2stream.Level.WARN);
});

factory.stream.pipe(filter).pipe(formatter).pipe(process.stderr);
```

## Getting started

It's available through the Node Package Manager (NPM), so you can install it like so:

``` sh
npm install log2stream
```

## Development

This project doesn't have much of a build process. It does have tests though; which you can run like so:

``` sh
npm test
```

This also runs code quality checks using ESLint. Please refer to the `.eslintrc` file to familiar yourself with the rules.

## License

This project is released under the MIT License.

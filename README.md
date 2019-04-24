# Log2stream

[![Available from NPM](https://img.shields.io/npm/v/log2stream.svg?maxAge=900)](https://www.npmjs.com/package/log2stream)
[![Built using Travis](https://img.shields.io/travis/lsphillips/Log2stream/master.svg?maxAge=900)](https://travis-ci.org/lsphillips/Log2stream)

A logging library with an interface inspired by Log4j but removes the concepts of appenders and layouts in favour of streams.

## Usage

The TL;DR is that there are factories (usually one) which create loggers which each create log records of various severity levels that you can format, filter and persist freely using streams.

### Logger Factories

Loggers are created by a factory:

``` js
const factory = new log2stream.LoggerFactory();
```

#### Creating Loggers

Creating loggers is simple:

``` js
const logger = factory.getLogger('name');
```

**Note:** You can only have one logger instance with a given name. Any subsequent attempts to create a logger with the same name will result in the same logger being returned. For example, this would be true:

``` js
factory.getLogger('name') === factory.getLogger('name');
```

### Using a logger

You can create log records that highlight severe errors that may stop the application from running:

``` js
logger.fatal('This is a fatal error message.');
```

You can create log records that highlight errors that wouldn't normally stop the application from running.

``` js
logger.error('This is an error message.');
```

You can create log records that highlight potentially harmful situations.

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
    detail : 'Detail of what happened...'
});
```

#### Severity levels

There are 5 predefined levels of severity a log record can have:

| Level | Corresponding logger method    | Description                                                      |
| ----- | ------------------------------ | ---------------------------------------------------------------- |
| Fatal | `logger.fatal()`               | Severe errors that may stop the application from running.        |
| Error | `logger.error()`               | Errors that wouldn't normally stop the application from running. |
| Warn  | `logger.warn()`                | Potentially harmful situations.                                  |
| Info  | `logger.info()`                | Progress of an application.                                      |
| Debug | `logger.debug()`               | Details useful for debugging an application.                     |

These levels are all exposed via the `log2stream.Level` type.

### Log record streams

All log records created by a logger are written to their own stream:

``` js
const target = new stream.Writable(
{
  write (record, _, callback)
  {
    // ...
  },

  objectMode : true // Important!
});

logger.stream.pipe(target);
```

Additionally, all log records created by a logger are automatically written to the stream of the factory responsible for creating it:

```
factory.stream.pipe(target);
```

**Note:** Any stream you pipe the logger or factory streams into must have `objectMode` enabled, as log records are being streamed, not strings or buffers. Read further at the [Node.js stream documentation](https://nodejs.org/api/stream.html#stream_object_mode).

#### Log record structure

| Property   | Type     | Description                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------- |
| `level`    | `Level`  | The severity level. See [Severity levels](#severity-levels)                     |
| `category` | `string` | The name of the logger that created the record.                                 |
| `message`  | `string` | The message describing the record.                                              |
| `date`     | `Date`   | The date and time the record was created.                                       |
| `metadata` | `any`    | The optional data assocated with the record.                                    |

#### Formatting log records

To manipulate log records you will have to pipe the stream of a factory (or logger) into a transformation stream. A utility is provided to help you achieve this:

``` js
const formatter = log2stream.transform(record =>
{
    return `${record.category} - ${record.message}`;
});

factory.stream.pipe(formatter);
```

#### Filtering log records

There could be times when you want to filter log records. An example would be to pipe all log records of a severity level greater than `Warn` into the `stderr` stream.

To achieve this you will have to pipe the stream of a factory (or logger) into a filter stream. A utility is provided to help you achieve this:

``` js
const refine = log2stream.filter(record =>
{
    return record.level.isGreaterThan(Level.Warn);
});

factory.stream.pipe(filter);
```

## Getting started

This project is available through the Node Package Manager (NPM), so you can install it like so:

``` sh
npm install log2stream
```

**Please Note:** Versions of Node lower than **v6.0.0** are not supported.

## Development

This project doesn't have much of a build process. It does have tests though; which you can run like so:

``` sh
npm test
```

This also runs code quality checks using ESLint. Please refer to the `.eslintrc` files to familiar yourself with the rules.

## License

This project is released under the MIT License.

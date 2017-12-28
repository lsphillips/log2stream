# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] (2017-12-28)

### Fixed

- The TypeScript type definitions for `LoggerFactory` have been updated.

## [2.0.0] (2017-12-20)

### Added

- Introduced a new `LoggerFactory` method:

  ```
  LoggerFactory#setLoggerLevel(level, force = false)
  ````

  This will set the level of future loggers and update the level of all existing loggers created by the factory. If `force` is set to `true`, all existing loggers will be updated regardless of whether a logger has been manually updated.

### Changed

- `LoggerFactory#level` is now readonly; use the newly added `LoggerFactory#setLoggerLevel()` method instead.

### Fixed

- Updated `log2stream.transform()` to not output a raw log record if the transformer throws an error.

## [1.0.1] (2017-05-16)

### Fixed

- Changed the reference to the TypeScript type definitions.

## [1.0.0] (2017-05-16)

The initial public release.

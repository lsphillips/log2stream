# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 3.1.2 - 2024-05-26

### Changed

- Updated the type definition dependencies.
- Updated the package metadata reflecting the repository move.

## 3.1.1 - 2021-05-16

### Changed

- This module now exports minified single file entry points, making this package much more lightweight.

## 3.1.0 - 2021-05-11

### Added

- This module has two different versions of this module, a CommonJS version for when it is being imported using `require` and an ESM version for when it is being imported using `import`.

### Changed

- Support for Node.js version `10.x.x` has been dropped.

## 3.0.1 - 2018-12-02

### Changed

- Updated the documentation.

## 3.0.0 - 2018-11-30

### Added

- Introduced documentation to the Typescript type definitons.

### Changed

- Loggers and factories no longer have a minimum severity level associated with them. Loggers will always produce log records.
- Levels are now named using pascal case rather that uppercase, for example `Level.ERROR` is now `Level.Error`.

### Removed

- `Level.toLevel()` no longer accepts a second argument to return a default if a corresponding level can't be found.
- `Level.Off` and `Level.All` no longer exist.

### Fixed

- `log2stream.transform()` will correctly fail when the provided transformer function fails.
- `log2stream.filter()` will correctly fail when the provided test function fails.

## 2.0.1 - 2017-12-28

### Fixed

- The TypeScript type definitions for `LoggerFactory` have been updated.

## 2.0.0 - 2017-12-20

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

## 1.0.1 - 2017-05-16

### Fixed

- Changed the reference to the TypeScript type definitions.

## 1.0.0 - 2017-05-16

The initial public release.

# assert-package-lock-is-consistent

[![NPM version][npm-image]][npm-url]
[![dependencies: none][dependencies-none-image]][dependencies-none-url]
[![code style: prettier][prettier-image]][prettier-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
[![License MIT][license-image]][license-url]

Assert that `package-lock.json` is consistent with `package.json`, that is,
both files have the same dependencies.

## Install

Requires `node@14` or higher:

```sh
npm install assert-package-lock-is-consistent --save-dev
```

## Usage

This package verifies that `package-lock.json` and `package.json` files in your project
have the same dependencies (`dependencies`, `devDependencies`, `peerDependencies`, and
`optionalDependencies`).

If some dependency exists only in one file, or if the versions of some dependency
in these files are different, the package throws an exception with a list of all such differences
(prints a list and returns code `1` in `CLI`).

Dependency versions may difference if someone, for example, forgets to update `package-lock.json`
file or include it in a commit.

The package works with `package-lock.json` file version 2 (`npm@7` or higher).

### CLI

Assert that `package-lock.json` has the same dependencies as `package.json`:

```sh
npx assert-package-lock-is-consistent
```

### JavaScript/TypeScript API

```js
import assertPackageLockIsConsistent from 'assert-package-lock-is-consistent';
// or
import {assertPackageLockIsConsistent} from 'assert-package-lock-is-consistent';

// assert that package-lock.json has the same dependencies as package.json
assertPackageLockIsConsistent();
```

## License

[MIT][license-url]

[conventional-commits-image]: https://img.shields.io/badge/Conventional_Commits-1.0.0-yellow.svg 'Conventional Commits'
[conventional-commits-url]: https://conventionalcommits.org
[dependencies-none-image]: https://img.shields.io/badge/dependencies-none-success.svg 'No dependencies'
[dependencies-none-url]: https://github.com/uid11/assert-package-lock-is-consistent/blob/main/package.json
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg 'The MIT License'
[license-url]: https://github.com/uid11/assert-package-lock-is-consistent/blob/main/LICENSE
[npm-image]: https://img.shields.io/npm/v/assert-package-lock-is-consistent.svg 'assert-package-lock-is-consistent'
[npm-url]: https://www.npmjs.com/package/assert-package-lock-is-consistent
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg 'Prettier code style'
[prettier-url]: https://github.com/prettier/prettier

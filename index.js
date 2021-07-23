#!/usr/bin/env node

'use strict';

const {readFileSync} = require('fs');

const {compare} = new Intl.Collator('en');
const DEPS_NAMES = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

const copyObjectWithoutPrototype = (object) => Object.assign(Object.create(null), object);

const parseDepsAndAddErrors = ({depsName, deps, errors, lockDeps, optionalDeps}) => {
  const names = new Set([...Object.keys(deps), ...Object.keys(lockDeps)].sort(compare));

  for (const name of names) {
    if (name in deps && !(name in lockDeps)) {
      errors.push(
        `Dependency "${name}" is present in the package.json's ${depsName} and is absent in the package-lock.json's ${depsName}`,
      );

      continue;
    }

    if (!(name in deps) && name in lockDeps) {
      if (depsName === 'dependencies' && name in optionalDeps) {
        continue;
      }

      errors.push(
        `Dependency "${name}" is absent in the package.json's ${depsName} and is present in the package-lock.json's ${depsName}`,
      );

      continue;
    }

    if (deps[name] !== lockDeps[name]) {
      errors.push(
        `Dependency "${name}" has version "${deps[name]}" in the package.json's ${depsName} and has version "${lockDeps[name]}" in the package-lock.json's ${depsName}`,
      );
    }
  }
};

const readAndParseJsonFile = (pathToJsonFile) => {
  const fileText = readFileSync(pathToJsonFile, 'utf8');

  return JSON.parse(fileText);
};

const assertPackageLockIsConsistent = () => {
  const packageJson = readAndParseJsonFile('package.json');
  const packageLockJson = readAndParseJsonFile('package-lock.json');

  const optionalDeps = copyObjectWithoutPrototype(packageJson.optionalDependencies);
  const packageJsonFromLock = packageLockJson.packages[''];

  const errors = [];

  for (const depsName of DEPS_NAMES) {
    const deps = copyObjectWithoutPrototype(packageJson[depsName]);
    const lockDeps = copyObjectWithoutPrototype(packageJsonFromLock[depsName]);

    parseDepsAndAddErrors({depsName, deps, errors, lockDeps, optionalDeps});
  }

  if (errors.length !== 0) {
    throw new AssertPackageLockIsConsistentError(errors);
  }

  console.log('[OK] package-lock.json is consistent with package.json!');
};

class AssertPackageLockIsConsistentError extends Error {
  constructor(errors) {
    super(
      `package-lock.json is not consistent with package.json.\nThese files contain the following ${
        errors.length
      } differences in dependencies: ${errors.join('\n')}`,
    );
  }
}

if (require.main && require.main.id === module.id) {
  assertPackageLockIsConsistent();
}

module.exports = assertPackageLockIsConsistent;
module.exports.default = assertPackageLockIsConsistent;
module.exports.assertPackageLockIsConsistent = assertPackageLockIsConsistent;

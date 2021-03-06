const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsconfig = require('./tsconfig.json')

process.env.JEST_ENV = "test";


const tsPaths = pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' })
delete tsPaths["^\\$app/(.*)$"]

// const ignoreModules = [
//   "svelte-awesome",
// ].join("|")

module.exports = {
  "transform": {
    "^.+\\.svelte$": [
      "<rootDir>/scripts/svelte-jester/transform.cjs",
      {
        "preprocess": true,
        env: {
          JEST_ENV: process.env.JEST_ENV,
          NODE_ENV: process.env.NODE_ENV
        }
      }
    ],
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest",
  },
  "moduleFileExtensions": [
    "cjs",
    "js",
    "ts",
    "svelte"
  ],
  "setupFilesAfterEnv": [
    "@testing-library/jest-dom/extend-expect"
  ],
  "modulePathIgnorePatterns": [
    ".history",
    "battlecry"
  ],
  moduleNameMapper: {
    ...tsPaths,
    "svelte-awesome": "<rootDir>/__mocks__/svelte-awesome/Icon.svelte",
    /**
     * Just adding "svelte-awesome/icons": "identity-object-proxy" didn't make it.
     * It's something between automocking and module resolving. Weird, but this way it works.
     */
  },
  // transformIgnorePatterns: [`/node_modules/(?!(${ ignoreModules }))`]
}

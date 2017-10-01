# Contribute

Changes and improvements are more than welcome! Feel free to fork and open a pull request.

Please follow those guidelines to have a bigger chance of your contribution being merged.

## Pull Request Guidelines

- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- Make sure `npm test` passes. (see [development setup](#development-setup))

- If adding new feature:
  - Add accompanying test case.
  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

## Development Setup

You will need [Node.js](http://nodejs.org) **version 6+** and [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (needed for running Selenium server during e2e tests).

After cloning the repo, run:

``` bash
$ npm install
& typings install
& npm run build:all
```

Start server
```
npm start
```

## Project Structure

- **`build`**: contains built files for distribution

- **`meta`**: contains the different webpack configurations for client, extensions, and server 

- **`src`**: contains the source code, obviously. The codebase is written in ES2015 with [Typescript](https://www.typescriptlang.org/).

    - **`clients`**: contains the mobile client and the extension
    
    - **`communication`**: contains helpers and constants for communication shared across the entired codebase
    
    - **`server`**: as the name suggests

- **`typings/typings-custom`**: contains type declarations for [Typescript](https://www.typescriptlang.org/). These declarations are loaded **globally** and you will see them used in type annotations in normal source code.

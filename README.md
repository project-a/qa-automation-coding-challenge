# QA Automation Coding Challenge

Web UI tests in using page object pattern


### Based on ###

* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Playwright](https://github.com/microsoft/playwright) - Node library to automate e2e browser tests
* [Jest](https://jestjs.io/) - Test framework (already included in testing-library)
* [Chai](http://chaijs.com/) - Assertion library
* [Allure](https://docs.qameta.io/allure/) - Nice reports :)

### Prerequisites ###

* [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (to generate report)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)

### Set up ###

First, install all dependencies using running [yarn](https://yarnpkg.com/) from root folder as current working directory

```
#!bash
yarn
```

### Starting web application ###
Next step is starting web application (SUT)

```
#!bash
yarn start
```

### Running e2e tests ###

Run e2e tests

```
#!bash
yarn test-e2e
```

### Running tests ###

Run all tests (if interested in unit tests also)

```
#!bash
yarn test
```

### Running report ###

Run the following command from project root

```
#!bash
yarn open-report
```


## Problems found
* Unit test was broken
* More than 30 repositories is not supported


## Testing code improvements
* Add more logging and reporting bindings (for steps etc)
* Move browser init to other place
* Get port of the application instead of hardcoding
* Organize application code better (maybe move to other folders etc)
* User docker container to be sure environment isolated and all needed software installed
* Mocked test is a bit ugly, didn't want to spend much time on it
* See other TODOs ¯\_(ツ)_/¯ 

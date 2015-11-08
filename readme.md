# Universal JavaScript Module Generator [![Build Status](https://secure.travis-ci.org/alferov/generator-ujsm.png?branch=master)](https://travis-ci.org/alferov/generator-ujsm)

![ujsm](media/ujsm.png)

> A Yeoman generator for creating universal JavaScript modules that work everywhere using ES2015, Babel, Webpack, Mocha, Chai, Karma, Isparta, and ESLint

## Features
1. **ES2015** - Universal JavaScript Module Boilerplate (UJSM) uses Babel to transpile ES2015 source code.
There are several reasons to use ES2015 alongside with transpilation:
  - The transpiled code will work with legacy Node versions;
  - Since we're going to run this module in the browsers, it will be necessary
to provide cross-browser compatibility;
  - Seamless migration after you decide to drop 0.x.x support;
1. **ES2015 Tests** - Mocha flag `--compilers js:babel-core/register` (it's already preconfigured in the npm `npm run test-server` script) allows to transpile Mocha tests written with ES2015 on the fly.
1. **Universal Tests** - UJSM uses [Karma](https://github.com/karma-runner/karma#but-i-still-want-to-use-_insert-testing-library_) to make sure that code works in the browser. It runs the same set of Mocha tests but in a browser at this time. A npm script `test-browser` does the job.
1. **UMD** - Webpack is preconfigured to integrate the [Universal Module Definition](https://github.com/umdjs/umd) (UMD) API (which provides compatibility with the most popular script loaders) to the ouput script.
1. **TDD** - The package has a particular npm script `npm run tdd` (and `npm run tdd-browser` for the browser testing) to start a Mocha watch task that reruns tests on file changes.
1. **Git Hooks** - Every time before commiting, [husky](https://github.com/typicode/husky) runs npm tasks conveniently configured in the package.json (in this case it automatically starting both `test` and `build` tasks). You can temporary disable this feature by adding `--no-verify` flag (i.e `$ git commit -am "Beep bop" --no-verify`). The list of all available hooks can be found [here](https://github.com/typicode/husky/blob/master/hooks.json).

## Installation
```bash
# Install Yeoman and the UJSM generator globally
$ npm install -g yo generator-ujsm

# Make a new folder & open it
$ mkdir my-shiny-module && cd $_

# Run the generator
$ yo ujsm
```

## Workflow
- `npm run build` - Build task that generates both minified and non-minified scripts;
- `npm run test-server` - Run Mocha tests once;
- `npm run test-browser` - Run Mocha tests in the browser using Karma once;
- `npm run test` - Shortcut for `npm run test-server && npm run test-browser`;
- `npm run tdd` - Run Mocha tests & watch files for changes;
- `npm run tdd-browser` - Run Karma (w/ Mocha) tests & watch files for changes;
- `npm run coverage` - Run Isparta, a code coverage tool;

## Related
[ujsm](https://github.com/alferov/ujsm) - The original boilerplate;

## Possible Windows Issues
##### Error

```
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYT
HON env variable
```

##### Solution
http://stackoverflow.com/questions/21365714/nodejs-error-installing-with-npm

##### Error
```
Error: EPERM, operation not permitted 'C:\...\node_modules\phantomjs\tmp\phantomjs-1.7.0-windows'
```

##### Solution
```
$ npm cache clean
```

## License
MIT © [Philipp Alferov](https://github.com/alferov)

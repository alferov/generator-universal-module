# Universal JavaScript Module Generator [![Build Status](https://secure.travis-ci.org/alferov/generator-ujsm.png?branch=master)](https://travis-ci.org/alferov/generator-ujsm)

![ujsm](media/ujsm.png)

> A Yeoman generator for creating universal JavaScript modules that work everywhere using ES2015, Babel, Webpack, Mocha, Chai, Karma, Isparta, and ESLint

## Features
1. **ES2015** - Universal JavaScript Module Boilerplate (UJSM) uses Babel to transpile ES2015 source code.
UJSM leverages transpilation because:
  - A lot of open-source packages still don't have proper support of Node >= 4.x;
  - Since we're going to run this module in the browsers, it will be necessary
to provide cross-browser compatibility;
  - The transpiled code will work with legacy Node versions;
  - It will be easy to migrate once Node >= 4.x ecosystem is more stable;
1. **ES2015 Tests** - Mocha flag `--compilers js:babel-core/register` (it's already preconfigured in the npm `test` script) allows to transpile Mocha tests written with ES2015 on the fly.
1. **Universal Tests** - UJSM uses Karma (alongside with Mocha and Chai) to test the code in the browser. A npm script `test-browser` does the job.
1. **UMD** - Webpack prepends the [UMD](https://github.com/umdjs/umd) pattern (which provides compatibility with the most popular script loaders) to the output script.
1. **TDD** - The package has a particular npm script (`npm run tdd`) to start a Mocha watch task that reruns tests on file changes.
1. **Pre-commit Hook** - Every time before commiting, [husky](https://github.com/typicode/husky) runs npm tasks conveniently configured in the package.json (in this case it automatically starting both `test` and `build` tasks). You can temporary disable this feature by adding `--no-verify` flag (i.e `$ git commit -am "Beep bop" --no-verify`). The list of all available hooks can be found [here](https://github.com/typicode/husky/blob/master/hooks.json).

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

## Resources
[ujsm](https://github.com/alferov/ujsm) - The original boilerplate;

## License
MIT © [Philipp Alferov](https://github.com/alferov)

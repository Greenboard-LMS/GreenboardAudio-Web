# Contributing Guide

This guide will help you get the project up and running, get situated with the development workflow, and inform you of the standards used in this project that are checked before the code is pushed to production.

## Cloning

The first step is to clone the project. If you have not already, get the project locally using the following command:

`git clone https://github.com/Borumer/Flytrap-Web`

Using either GitHub Desktop or the command line, connect your local repository to a fork of Flytrap-Web.

## Minifying JavaScript Files

### Browser Scripts

All of the scripts are located in the `scripts/` folder. Instead of being linked directly, a minified and combined version of all these JavaScript files are put together in `static/bundle.js`.

To minify the browser files to reduce file size and count, run 

`uglifyjs-folder scripts -o bundled/web.bundled.js`

### Node Scripts

The secure.js file requires the `CryptoJS` npm package, which means it cannot be included directly in the bundle. 

The `watchify` package puts the modules that it uses and the file itself into a browser readable file. In addition, building upon the original `browserify` package, it automatically rebuilds for continuous development. 

To continuously bundle a Node script, write it to the `bundled/` folder with the format 

`watchify scripts/FILENAME.js -o bundled/FILENAME.bundled.js`

where FILENAME is the name of the JavaScript file.

For example, the `secure.js` would be:

`watchify scripts/secure.js -o bundled/secure.bundled.js`

### Merging them Together

In order to decrease bundle size further and to create the need to include just one script tag, you must merge each bundled node file and the minified browser scripts file into one. 

This goes into `static/bundle.js` using the following command:

`uglifyjs-folder bundled -o static/bundle.js`

Naturally, all PHP files must include this in their directory. 

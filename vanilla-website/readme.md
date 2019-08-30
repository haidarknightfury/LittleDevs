 ## README

/public - holds the website
/src - holds the source files


1. Setting Up

```cmd
mkdir -p vanilla-website/{public/assets/{images,scripts,styles},src/{scripts,styles}}
cd vanilla-website
yarn init -y
touch .babelrc postcss.config.js webpack.config.js public/index.html src/{scripts/{main.js,utils.js},styles/{main.scss,reset.scss}}


├── .babelrc
├── package.json
├── postcss.config.js
├── /public
|  ├── /assets
|  |  ├── /images
|  |  ├── /scripts
|  |  └── /styles
|  └── index.html
├── /src
|  ├── /scripts
|  |  ├── main.js
|  |  └── utils.js
|  └── /styles
|     ├── main.scss
|     └── reset.scss
└── webpack.config.js

/public — holds the website
/src — holds the source files

```


2. Add dev dependencies

```cmd

yarn add -D @babel/core babel-loader @babel/preset-env cross-env css-loader cssnano file-loader live-server mini-css-extract-plugin node-sass npm-run-all postcss-loader postcss-preset-env sass-loader webpack webpack-cli

@babel/core, babel-loader, @babel/preset-env — Transpile our ES6+ JavaScript to ES5, or whatever browsers we decide to support
cross-env — Make Windows work with environment variables in CLI
css-loader, cssnano, mini-css-extract-plugin, node-sass, postcss-loader, postcss-preset-env, sass-loader — Process our Sass, including autoprefixing, minification and extracting the CSS to a separate file
file-loader — Handles images in our CSS
live-server — Development server with auto-reloading capabilities when files change
npm-run-all — Run multiple npm-scripts in parallel or sequential
webpack, webpack-cli — Module bundler, the glue that puts everything together

```


3. Modify Package.json

```note
dev:assets — Running Webpack in watch mode will watch for changes to files in our /src directory and recompile everything. Webpack will place the compiled files under the /public directory
dev:start — Start our development server, launch the browser to the /public directory and watch for changes under the /public directory. Website will open to http://localhost:8080/public
dev — Run in parallel all of the scripts that start with dev:. Basically it will run dev:assets and dev:start giving us a nice development environment with live reload
build — Run Webpack in production mode, optimizing CSS and JavaScript files. The outputted files will replace the CSS/JS development files under the /public directory, then you can take everything under this directory and deploy it to your production server

```

```cmd
"scripts": {
  "dev:assets": "webpack --watch",
  "dev:start": "live-server --open=./public/ --host=localhost --watch=./public/",
  "dev": "npm-run-all -p dev:*",
  "build": "cross-env NODE_ENV=production webpack"
},

```

4. Babel Configuration

- we are making use of @babel/preset-env and instructing Babel to transpile our JavaScript code to support browsers that are used in more than 1% of the global market browser share.

```cmd
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["> 1%"]
        }
      }
    ]
  ]
}

```


5. postcss.config.js


- instruct PostCSS to autoprefix and minimize our CSS when in production mode, otherwise don’t do anything.

- in our build script we set NODE_ENV to production? Well, we read that environment variable with process.env.NODE_ENV, and that’s how we know we are running in production mode.

```cmd
const postcssPresetEnv = require('postcss-preset-env');
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      postcssPresetEnv({
        browsers: ['> 1%']
      }),
      require('cssnano')
    ]
  };
  return;
}
module.exports = {};

```
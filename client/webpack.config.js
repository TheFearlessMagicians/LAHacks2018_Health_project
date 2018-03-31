#!/usr/bin/env node
  // importan stuff
 /*  We have to let webpack know:
  *  1. entrypoint - app.js inside src folder
  *  2. final output- where do we put bundle.js?
  */
const path = require('path');

console.log(path.join(__dirname,'public')); // absolute path of our pwd. only avaiable in scripts!
module.exports = {
    //entry : './hoc/hoc.js',
  entry: './src/app.js',// remember to use ./ syntax.
  //details for our output file.
  output : {
    path : path.join(__dirname,'public'), // Absolute PATH! CANT BE RELATIVE. // so we use node's path module for 
    // good path concatenation. NOTE THAT THIS IS IMPORTANT: if we use windows, the path separator is
    // \ not / .... wkwkwk
    filename: 'bundle.js' // output file name
  },


  // install loader: // more in webpack.js.org documentation.
  module: { 
  // webpack has an array of 'rules'. Each 'rule' determines what webpack 
  // should do when bundling.
    rules:[
      {
        loader: 'babel-loader', // what we use
        test: /\.js$/, // regex for which ones we want to run this rule on. (only on js files)
        // NOTE THAT THE REGEX DOESNT HAVE quOTATION MARKS.
        exclude: /node_modules/ // we don't want to make changes to node modules.
      },
      {
        use: ['style-loader','css-loader','sass-loader'], // we need to run css and style loaders.
        
        test: /\.s?css$/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map', // this helps us debugs stuff! in the stack trace,
    // we'll see the actual source of where the error is, not simply in the huge bundle.js file.
  //
  devServer: {
    contentBase: path.join(__dirname,'public'),// serve from public directory.
    historyApiFallback:true // tells the devserver that we're going to
    //handle routing client side, and should always serve index.html..
    // THIS IS IMPORTANT! NOTE: production settings is different.
    // if we use react router, we'll get the actual client side routing
  }
};

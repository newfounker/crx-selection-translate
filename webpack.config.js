const webpack = require( 'webpack' ) ,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin ,
  ExtractTextPlugin = require( "extract-text-webpack-plugin" );

module.exports = {
  entry : {
    bg : "./src/background-scripts" ,
    content : "./src/content-scripts" ,
    options : "./src/options/options" ,
    popup : './src/popup' ,
    'bs-lite' : './src/public/bootstrap-lite.scss'
  } ,
  output : {
    path : "./src/bundle" ,
    filename : "[name].js"
  } ,
  resolve : {
    extensions : [ '' , '.es6' , '.js' ]
  } ,
  module : {
    loaders : [
      {
        test : /\.es6?$/ ,
        exclude : /node_modules/ ,
        loader : 'babel' ,
        query : {
          "presets" : [ "es2015" ]
        }
      } ,
      {
        test : /\.scss$/ ,
        loader : ExtractTextPlugin.extract( "style-loader" , "css-loader!sass-loader" )
      }
    ]
  } ,
  plugins : [
    new webpack.ProvidePlugin( {
      Vue : 'vue' ,
      interact : 'interact.js' ,
      'window.interact' : 'interact.js'
    } ) ,

    // bg      : chrome-storage-wrapper
    // options : chrome-storage-wrapper vue bootstrap-lite.scss
    // content : chrome-storage-wrapper vue interact.js selection-widget
    // popup   : bootstrap-lite.scss
    new CommonsChunkPlugin( 'commons1.js' , [ 'content' , 'options' ] ) ,
    new CommonsChunkPlugin( 'commons2.js' , [ 'bg' , 'commons1.js' ] ) ,
    new CommonsChunkPlugin( 'lite.js' , ['bs-lite'] ) ,

    new ExtractTextPlugin( "[name].css" )
  ]
};

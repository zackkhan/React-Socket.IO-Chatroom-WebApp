module.exports = {
entry:__dirname + '/src',
output: {
  path: '/'
},
devtool: 'source-maps',
module: {
  loaders: [
{
  test: /\.js$/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react'],
    plugins: ['transform-class-properties']
  }
},
    {
      test: /\.css$/,
      loader:'style-loader!css-loader' //! means chaining loaders. output of styleloader sent to css loader
    }

  ]
}


}

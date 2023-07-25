const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, './'),
      serveIndex: true
    }
  }
}
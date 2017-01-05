const express = require ('express');
const http = require ('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
//var myModule = require('src/index.js');
//var username = myModule.username;

app.use(express.static(__dirname + '/public') );
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({extended: false}));

//happens whenever a new client connects to server
io.on('connection', socket =>
{
  socket.on('setId', function(username){
    console.log(username);
  })
  socket.on('message', body => {
    socket.broadcast.emit('message', {body:body, from:un})
  })
}
)


server.listen(3000);

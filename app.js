var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var express = require('express');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket){
  console.log(socket.id);
  // socket.name = socket.remoteAddress + ':' + socket.remotePort;    
  // console.log('Hi ' + socket.name + '!\n'); 
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // console.log(socket.id);
    io.emit('chat message', socket.id.substr(0,4)+":"+msg);
  });

});

app.set('port', process.env.PORT || 3010);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});
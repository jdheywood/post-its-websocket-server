'use strict'

var WebSocketServer = require('ws').Server;
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 1234

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server});
console.log("websocket server created")

var cache = require('./cache.js');

/**
 *  Broadcasts incoming data to all active connections
 */
wss.on('connection', function (conn) {
    conn.on('message', function (data) {
        console.log(data)
        cache.test('a', 'b');
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    });
});

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
        let messageType = cache.message(data)
        wss.clients.forEach(function each(client) {
            client.send(data);
            if (messageType === 'user') {
                console.log('Sending all users and notes to all users');
                let users = cache.getUsers();
                if (users) {
                    for(let index = 0; index < users.length; index++) {
                        client.send(JSON.stringify(users[index]));
                    }
                }
                let notes = cache.getNotes();
                if (notes) {
                    for(let index = 0; index < notes.length; index++) {
                        client.send(JSON.stringify(notes[index]));
                    }
                }
            }
        });
    });
});


var WebSocketServer = require('ws').Server;

// Forward arg options to WebSockerServer
var wssOptions = require('minimist')(process.argv);
delete wssOptions['_'];

var wss = new WebSocketServer(wssOptions);

var cache = require('./cache.js');

/**
 *  Broadcasts incoming data to all active connections
 */
wss.on('connection', function (conn) {
    conn.on('message', function (data) {
        cache.test('a', 'b');
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    });
});

# WSS Echo server
What it gets is what it sends :)

It also handles some state for clients of the post-its application: https://github.com/jdheywood/post-its


## RUN it
All command line options are pushed to WebSockerServer constructor. Available options are: https://github.com/websockets/ws/blob/master/doc/ws.md 

```bash
npm install
node server.js --port=1234
```
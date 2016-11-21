# WSS Echo server
What it gets is what it sends :)

It also handles some state for clients of the post-its application: https://github.com/jdheywood/post-its

## RUN it

```bash
npm install
node server.js
```

Makes use of node-cache package to store state in memory for use syncing up notes and users when new clients connect

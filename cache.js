
let NodeCache = require('node-cache');
let myCache = new NodeCache();

module.exports = {

  test(key, value) {
    myCache.set(key, value);
    console.log('cached: ' + key + ' - ' + value);
    console.log(myCache.get(key));
  },

  message(message) {
    // TODO determine type of message, and cache into the relevant collection

    // TODO if message of type user, broadcast other users and notes -
    // once working remove this from the clients? or do we want both cnetral and distributed?
    // if the clients can treat messages as idempotent it doesn;t matter right?

    // TODO if message of type note, do nothing further as it will echo that out anyway

    console.log('message function called');
  }

};

'use strict'

let NodeCache = require('node-cache');
let myCache = new NodeCache();

const USERS_KEY = 'users-array';
const NOTES_KEY = 'notes-array';

let users = myCache.get(USERS_KEY) || [];
let notes = myCache.get(NOTES_KEY) || [];

let isEquivalent = (a, b) => {
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let index = 0; index < aProps.length; index++) {
    let propName = aProps[index]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  // If we made it this far, objects are naively considered equivalent
  return true
}

let handleNote = (incomingNote, notes) => {
  let exists = false
  let changed = false
  let removed = incomingNote.removed
  let position = 0
  for (let index = 0; index < notes.length; ++index) {
    if (notes[index].id === incomingNote.id) {
      position = index
      exists = true
      changed = !isEquivalent(notes[index], incomingNote)
    }
  }
  if (!exists & !removed) {
    // add via push
    notes.push(incomingNote)
  } else if (removed) {
    // remove via splice
    for (let index = 0; index < notes.length; ++index) {
      if (notes[index].id === incomingNote.id) {
        notes.splice(index, 1)
      }
    }
  } else if (changed) {
    // update via splice
    notes.splice(position, 1, incomingNote)
  }
  // re-cache the notes array now we've changed it
  myCache.set(NOTES_KEY, notes)
}

module.exports = {

  test(key, value) {
    myCache.set(key, value);
    console.log('cached: ' + key + ' - ' + value);
    console.log(myCache.get(key));
  },

  message(message) {
    // Cache user or notes depending on what is sent, for notes handle CRUD as per client app and cache updated array
    try {
      let incoming = JSON.parse(message)
      // if user message
      if (incoming.userId) {
        console.log('user received ' + incoming.userName)
        users.push(incoming)
        myCache.set(USERS_KEY, users)
        return 'user'
      } else {
        // note message
        console.log('note received ' + incoming.body)
        handleNote(incoming, notes)
        return 'note'
      }
    } catch (e) {
      console.log('Error, either a bug or this isn\'t valid JSON: ', JSON.parse(message))
      console.log(e.message)
    }
  },

  getUsers() {
    return myCache.get(USERS_KEY)
  },

  getNotes() {
    return myCache.get(NOTES_KEY)
  }

};

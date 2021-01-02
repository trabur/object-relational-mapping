// libraries
import { v4 as uuidv4 } from 'uuid';

// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {transport: w3cwebsocket})
socket.connect()

// phoenix channel
let channel = socket.channel("MAIN", {token: "abc"})
channel.join()
  .receive("ok", ({ messages }: any) => console.log("users: joined MAIN channel", messages))
  .receive("error", ({ reason }: any) => console.log("users: failed to join MAIN channel", reason))
  .receive("timeout", () => console.log("still waiting..."))


/******
 * trigger actions
 ******/
function all (callback: any) {
  let outputRoom1 = uuidv4()
  channel.on(`room:${outputRoom1}`, callback)
  channel.push("room:broadcast", {
    room: 'users',
    message: {
      output: outputRoom1
    }
  })
}
  
function register (email: any, username: any, password: any, callback: any) {
  let outputRoom2 = uuidv4()
  channel.on(`room:${outputRoom2}`, callback)
  channel.push("room:broadcast", {
    room: 'register',
    message: {
      payload: {
        email,
        username,
        password,
      },
      output: outputRoom2
    }
  })
}

function login (email: any, password: any, callback: any) {
  let outputRoom3 = uuidv4()
  channel.on(`room:${outputRoom3}`, callback)
  channel.push("room:broadcast", {
    room: 'login',
    message: {
      payload: {
        email,
        password
      },
      output: outputRoom3
    }
  })
}

function remove (email: any, password: any, callback: any) {
  let outputRoom4 = uuidv4()
  channel.on(`room:${outputRoom4}`, callback)
  channel.push("room:broadcast", {
    room: 'remove',
    message: {
      payload: {
        email,
        password
      },
      output: outputRoom4
    }
  })
}

/******
 * trigger library
 ******/
export {
  all,
  register,
  login,
  remove
}
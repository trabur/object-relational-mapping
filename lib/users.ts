// libraries
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')
import { v4 as uuidv4 } from 'uuid';

// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {transport: w3cwebsocket})
socket.connect()

// phoenix channel
let channel = socket.channel("MAIN", {token: "abc"})
channel.join()
  .receive("ok", ({ messages }: any) => console.log("joined MAIN channel", messages))
  .receive("error", ({ reason }: any) => console.log("failed to join MAIN channel", reason))
  .receive("timeout", () => console.log("still waiting..."))

/**
 * methods
 */
function init () {
  // functions
  channel.on("room:register", function (data: any) {
    console.log('sign:data:', data.message.sign)
    let msg = jwt.sign(data.message.sign, '1337-secret-shhhhh', { expiresIn: '1h' })

    channel.push("room:broadcast", {
      room: data.message.output,
      message: msg
    })
  })

  channel.on("room:login", function (data: any) {
    console.log('verify:token:', data.message.token)
    let msg = jwt.verify(data.message.token, '1337-secret-shhhhh', { expiresIn: '1h' })

    channel.push("room:broadcast", {
      room: data.message.output,
      message: msg
    })
  })

  channel.on("room:users", async function (data: any) {
    const allUsers = await prisma.user.findMany()

    channel.push("room:broadcast", {
      room: data.message.output,
      message: allUsers
    })
  })
}

function demo () {
  let outputRoom1 = uuidv4()
  let outputRoom2 = uuidv4()
  channel.on(`room:${outputRoom1}`, async function (message: any) {
    console.log(message)
  })
  channel.on(`room:${outputRoom2}`, async function (message: any) {
    console.log(message)
  })
  channel.push("room:broadcast", {
    room: 'users',
    message: {
      sign: { userId: 1 },
      output: outputRoom1
    }
  })
}

export default {
  init,
  demo
}
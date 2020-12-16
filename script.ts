import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

var w3cwebsocket = require("websocket").w3cwebsocket
var Socket = require("phoenix").Socket
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {transport: w3cwebsocket})
socket.connect()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  let channel = socket.channel("MAIN", {token: "abc"})
  channel.join()
    .receive("ok", ({ messages }: any) => console.log("joined MAIN channel", messages) )
    .receive("error", ({ reason }: any) => console.log("failed to join MAIN channel", reason) )
    .receive("timeout", () => console.log("still waiting..."))

  channel.on("room:123", (msg: any) => console.log("received:", msg))
  channel.push("room:broadcast", {room: '123', message: 'hello world'})
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

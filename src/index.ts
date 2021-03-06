import { Users } from './users'
import { Tenants } from './tenants'
import { PublishSubscribe } from './platforms/publishSubscribe'
import { Counter } from './platforms/counter'
import { Logging } from './platforms/logging'

export class ORM {
  constructor(socket: any) {
    // could be socket for node.js or web
    socket.connect()
    
    // phoenix channel
    let channel = socket.channel("room:lobby", {})
    channel.join()
      .receive("ok", ({ messages }: any) => console.log("joined ROOM channel", messages))
      .receive("error", ({ reason }: any) => console.log("failed to join ROOM channel", reason))
      .receive("timeout", () => console.log("still waiting..."))

    // methods
    this.users = new Users(channel)
    this.tenants = new Tenants(channel)
    this.platforms.publishSubscribe = new PublishSubscribe(channel)
    this.platforms.counter = new Counter(channel)
    this.platforms.logging = new Logging(channel)
    
    return this
  }
  users = null
  tenants = null
  platforms = {
    publishSubscribe: null,
    counter: null,
    logging: null
  }
}
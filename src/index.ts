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
    this.channel = socket.channel("MAIN", {token: "abc"})
    this.channel.join()
      .receive("ok", ({ messages }: any) => console.log("users: joined MAIN channel", messages))
      .receive("error", ({ reason }: any) => console.log("users: failed to join MAIN channel", reason))
      .receive("timeout", () => console.log("still waiting..."))

    // methods
    this.users = new Users(this.channel)
    this.tenants = new Tenants(this.channel)
    this.platforms.publishSubscribe = new PublishSubscribe(this.channel)
    this.platforms.counter = new Counter(this.channel)
    this.platforms.logging = new Logging(this.channel)
    
    return this
  }
  channel = null
  users = null
  tenants = null
  platforms = {
    publishSubscribe: null,
    counter: null,
    logging: null
  }
}
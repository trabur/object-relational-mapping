// libraries
import { v4 as uuidv4 } from 'uuid';

export class Users {
  constructor(socket: any) {
    // phoenix channel
    this.channel = socket.channel("MAIN", {token: "abc"})
    this.channel.join()
      .receive("ok", ({ messages }: any) => console.log("users: joined MAIN channel", messages))
      .receive("error", ({ reason }: any) => console.log("users: failed to join MAIN channel", reason))
      .receive("timeout", () => console.log("still waiting..."))
    
    return this
  }

  socket = null
  channel = null
  
  /******
   * trigger actions
   ******/
  all (callback: any) {
    let outputRoom1 = uuidv4()
    this.channel.on(`room:${outputRoom1}`, callback)
    this.channel.push("room:broadcast", {
      room: 'users',
      message: {
        output: outputRoom1
      }
    })
  }
    
  register (email: any, username: any, password: any, callback: any) {
    let outputRoom2 = uuidv4()
    this.channel.on(`room:${outputRoom2}`, callback)
    this.channel.push("room:broadcast", {
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

  login (email: any, password: any, callback: any) {
    let outputRoom3 = uuidv4()
    this.channel.on(`room:${outputRoom3}`, callback)
    this.channel.push("room:broadcast", {
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

  remove (email: any, password: any, callback: any) {
    let outputRoom4 = uuidv4()
    this.channel.on(`room:${outputRoom4}`, callback)
    this.channel.push("room:broadcast", {
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
}
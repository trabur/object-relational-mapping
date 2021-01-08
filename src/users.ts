// libraries
import { v4 as uuidv4 } from 'uuid';

export class Users {
  constructor(channel: any) {
    this.channel = channel
    return this
  }

  channel = null
  
  /******
   * trigger actions
   ******/
  listen (id: any, token: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      room: 'users:listen',
      message: {
        payload: {
          id,
          token
        },
        output: outputRoom
      }
    })
  }

  put (id: any, data: any, token: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      room: 'users:put',
      message: {
        payload: {
          id,
          token,
          data
        },
        output: outputRoom
      }
    })
  }
    
  register (email: any, username: any, password: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      room: 'users:register',
      message: {
        payload: {
          email,
          username,
          password,
        },
        output: outputRoom
      }
    })
  }

  login (email: any, password: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      room: 'users:login',
      message: {
        payload: {
          email,
          password
        },
        output: outputRoom
      }
    })
  }
}
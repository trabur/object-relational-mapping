// libraries
import { v4 as uuidv4 } from 'uuid';

export class Tenants {
  constructor(channel: any) {
    this.channel = channel
    return this
  }

  channel = null
  
  /******
   * trigger actions
   ******/
  allUserTenants (callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      vault: 'tenants',
      message: {
        output: outputRoom
      }
    })
  }
    
  register (email: any, username: any, password: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      vault: 'register',
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
      vault: 'login',
      message: {
        payload: {
          email,
          password
        },
        output: outputRoom
      }
    })
  }

  remove (email: any, password: any, callback: any) {
    let outputRoom = uuidv4()
    this.channel.on(`room:${outputRoom}`, callback)
    this.channel.push("room:secure", {
      vault: 'remove',
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
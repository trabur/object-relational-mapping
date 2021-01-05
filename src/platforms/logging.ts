// libraries
import { v4 as uuidv4 } from 'uuid';

export class Logging {
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
    this.channel.push("room:broadcast", {
      room: 'platforms:logging:listen',
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
    this.channel.push("room:broadcast", {
      room: 'platforms:logging:put',
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
}
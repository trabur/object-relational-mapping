import { Users } from './users'
import * as tenants from './tenants'
import * as platform from './tenants/platform'
import * as services from './tenants/services'

export class TYU {
  constructor(socket: any) {
    // could be socket for node.js or web
    socket.connect()
    
    // methods
    this.users = new Users(socket)
    
    return this
  }
  users = null
}

// export {
//   users,
//   tenants,
//   platform,
//   services
// }
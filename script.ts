import * as users from './lib/users'

// init library
users.run()

// show all
users.all()

// username & password
// users.login('demo', '1234')
// users.register('demo', '1234')


// stop library
setTimeout(() => {
  users.stop()
}, 10000);
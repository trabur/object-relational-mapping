import * as users from './lib/users'

// start library
users.init()

// show all
users.all()

// username & password
// users.login('demo', '1234')
// users.register('demo', '1234')


// stop library
setTimeout(() => {
  users.stop()
}, 10000);
import * as users from './lib/users'

// init library
users.run()

// show all
users.all()

// auth
// users.register('test@test.com','testman123', 'password')
// users.login('test@test.com', 'password')


// stop library
setTimeout(() => {
  users.stop()
}, 10000);
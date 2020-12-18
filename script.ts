import * as users from './lib/users'

// init library
users.run()

// show all
users.all(function ({ message }: any) {
  console.log('users.all :::', message)
})

// auth confirm
let email = 'test@test.com'
let username = 'testman'
let password = '1234567'
// users.register(email, username, password, function ({ message }: any) {
//   console.log('users.register :::', message)
// })

// auth check
users.login(email, password, function ({ message }: any) {
  console.log('users.login :::', message)
})

// auth delete
// users.remove(email, password, function ({ message }: any) {
//   console.log('users.remove :::', message)
// })

// stop library
setTimeout(() => {
  users.stop()
}, 10000);
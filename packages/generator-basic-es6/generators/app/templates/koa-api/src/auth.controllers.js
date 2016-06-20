import jwt from 'koa-jwt'
import find from 'lodash/find'

const debug = require('debug')('buzz-website-api:controller:auth')

const secrets = 'nothing2lose'
const users = [
  {
    username: 'user',
    password: 'nothing2lose',
    scopes: ['read']
  },
  {
    username: 'admin',
    password: 'nothing2lose',
    scopes: ['read', 'write']
  }
]

export function* login() {
  const { username, password } = this.request.body
  if (!username) this.throw(400, 'Require username')
  if (!password) this.throw(400, 'Require password')

  const user = find(users, item => item.username === username && item.password === password)
  if (!user) {
    debug('Authentication fail')
    this.throw(401)
  }

  debug('Got User:', user)

  const token = jwt.sign({ username, scopes: user.scopes }, secrets)
  debug(token)
  this.status = 200
  this.body = { token }
}

export function* auth(next) {
  debug('User', this.state.user)
  yield next
}

import koa from 'koa'
import KoaRouter from 'koa-router'
import koaCors from 'koa-cors'
import koaLogger from 'koa-logger'
import koaBodyParser from 'koa-bodyparser'
import koaJson from 'koa-json'
import koaQs from 'koa-qs'
import jwt from 'koa-jwt'
import unless from 'koa-unless'
import { env, secret } from './config'
import { auth, login } from './auth.controllers'

jwt.unless = unless

const app = koa()

app.use(function *(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.throw(this.status, err)
  }
})

if (env !== 'production') {
  app.use(koaLogger())
}

app.use(koaCors())
app.use(koaBodyParser())
app.use(koaJson())
koaQs(app, 'extended')

app.use(jwt({ secret }).unless({ path: '/login' }))
app.use(auth)

// router.post('/upload', upload, uploadFile)
// app.use(serve(__dirname + '/statics'))

const router = new KoaRouter()
app.use(router.middleware())

router.post('/login', login)

// Add new route here

export default app

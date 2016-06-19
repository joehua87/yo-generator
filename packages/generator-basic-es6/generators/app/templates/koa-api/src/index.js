/* eslint-disable no-console */

const port = require('./config').port
const app = require('./app').default

app.listen(port)
console.log(`Listen to ${port}`)

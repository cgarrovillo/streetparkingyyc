import Koa = require('koa')

import router from './router'

const app = new Koa()
app.use(router.routes())

// Start the server
app.listen(3000)

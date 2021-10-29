import Koa = require('koa')
import Router = require('@koa/router')
import bodyParser = require('koa-bodyparser')
import koaLogger = require('koa-logger')

import parkingZoneController from './controllers/v1/parkingZone.controller'

const app = new Koa()
const router = new Router()
app.use(koaLogger())

router.get('/ping', (ctx) => (ctx.body = 'pong'))
router.get('/api/v1/:zone_number', parkingZoneController)

app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())

app.on('error', (err) => {
  console.error('server error', err)
})

// Start the server
app.listen(3000)

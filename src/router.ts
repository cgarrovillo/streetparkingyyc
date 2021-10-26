import Router = require('@koa/router')

// Controllers
import parkingZoneController from './controllers/v1/parkingZone.controller'

const router = new Router()

router.get('/api/v1/:zone_number', parkingZoneController)

export default router

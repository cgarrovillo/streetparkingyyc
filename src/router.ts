import Router = require('@koa/router')

// Controllers
import simpleParkingController from './controllers/simpleParking.controller'
import detailedParkingController from './controllers/detailedParking.controller'

const router = new Router()

router.get('/simple', simpleParkingController)
router.get('/detailed', detailedParkingController)

export default router

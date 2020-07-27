/**
 * Utility used to log various things in the project
 */

const bunyan = require('bunyan')
const { INFO, ERROR, DEBUG } = require('bunyan')

const log = bunyan.createLogger({
  name: 'openParkYYC',
  stream: process.stdout,
  level: 'info',
})

const environment = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  DEV_DEBUG: 'debug',
}

//If the environment is development, add a debug level too
if (process.env.NODE_ENV === environment.DEVELOPMENT) {
  log.info(`Detected environment: ${process.env.NODE_ENV}`)

  log.level(DEBUG)
} else if (process.env.NODE_ENV === environment.PRODUCTION) {
  log.info(`Detected environment: ${process.env.NODE_ENV}`)

  log.addStream({
    name: 'prodInfoToText',
    path: '/logs/info',
    level: INFO,
  })
  log.addStream({
    name: 'prodErrorToText',
    path: '/logs/errors',
    level: ERROR,
  })
} else
  log.info(
    `Unable to detect environment. \nSticking to default logging settings. (30-INFO, STDOUT)`
  )

log.info(`Logging at level ${log.level()}.`)

module.exports = log

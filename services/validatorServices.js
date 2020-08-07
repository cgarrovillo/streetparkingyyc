const { body, validationResult } = require('express-validator')
const log = require('./loggingUtility')

const validZoneRules = async (req, res, next) => {
  log.debug(`MW Chain: Validate Zone`)

  await body('parkingZone')
    .isInt({
      min: 1000,
      max: 9999,
    })
    .run(req)

  next()
}

/* Validation Middleware */
const validate = (req, res, next) => {
  log.debug(`MW Chain: Validate`)

  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() })
  }

  next()
}

module.exports = {
  validate,
  validZoneRules,
}

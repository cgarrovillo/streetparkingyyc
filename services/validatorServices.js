const { body, validationResult } = require('express-validator')

const zoneValidationRules = () => {
  return [
    body('parkingZone').isInt({
      min: 1000,
      max: 9999,
    }),
  ]
}

/* Validation Middleware */
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
    return
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  zoneValidationRules,
  validate,
}

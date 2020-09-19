const { body, validationResult } = require('express-validator')

const validateZone = async function (req, res, next) {
  await body('zone').notEmpty().withMessage('Value cannot be empty.').run(req)
  await body('zone')
    .isInt({ gt: 999, lt: 10000 })
    .withMessage('Value must a number greater than 999 and less than 10,000.')
    .run(req)
  next()
}

const validate = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status('400').json({ errors: errors.array() })
  }
  next()
}

module.exports = { validateZone, validate }

const log = require('./loggingUtility')

const errors = (err, req, res, next) => {
  res.status(500).send({ error: 'Something failed!' })
}

module.exports = errors

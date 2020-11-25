const events = require('./event')

module.exports = app => {
  app.use('/api/v1/event', events)
}
const dipaUtil = require('../lib/dipa-util')

module.exports = function (req, res, next) {
  dipaUtil.runningResponse(req.params.id, function (response) {
    res.send(response)
  })
  next()
}

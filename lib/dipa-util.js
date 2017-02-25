const isRunning = require('is-running')
const dipaDb = require('./dipa-db')

const db = new dipaDb.DatabaseManager()

const checkError = function (error) {
  if (typeof error === 'undefined' || error === null || error === '') return false
  else return true
}

const errorResponse = function () {
  return {'success': false}
}

const buildResponse = function (error, response) {
  try {
    var success = !checkError(error)
    if (success === false) return errorResponse()
    if (typeof response !== 'boolean') throw new Error('expected boolean')
    return {'success': success, 'running': response}
  } catch (e) {
    return errorResponse()
  }
}

const runningResponse = function (pid, callback) {
  try {
    pid = formatNumber(pid)
    db.pidInCache(pid, function (err, doc) {
      if (err || typeof doc === 'undefined') return callback(buildResponse(err, null))
      if (doc.in_cache === true) return callback(buildResponse(null, doc.running))
      else {
        var running = isRunning(pid)
        db.pidChange(pid, running)
        return callback(buildResponse(null, running))
      }
    })
  } catch (e) {
    return callback(buildResponse(e, null))
  }
}

const formatNumber = function (number) {
  var fNumber = parseInt(number)
  if (isNaN(fNumber)) throw new Error('not a number')
  else return fNumber
}

const toPrefix = function (string) {
  var prefix = string
  if (string.substring(0, 1) !== '/') prefix = '/' + prefix
  if (string.slice(-1) !== '/') prefix = prefix + '/'
  return prefix
}

module.exports = {isRunning, buildResponse, runningResponse, formatNumber, toPrefix}

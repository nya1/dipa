const Datastore = require('nedb')
const osenv = require('osenv')
const path = require('path')
const fs = require('fs')

const dipaPath = path.join(osenv.home(), '.dipa')

if (!fs.existsSync(dipaPath)){
  fs.mkdirSync(dipaPath);
}

const db = new Datastore({ filename: path.join(dipaPath, 'pid.db'), autoload: true })

function DatabaseManager (config) {
  this.cache = 10 // 10 seconds default caching
  db.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: this.cache }, function (errIndex) {
    if (errIndex) throw new Error('cannot set index', errIndex)
  })
}

DatabaseManager.prototype.pidInCache = function (pid, callback) {
  db.find({ 'pid': pid }, function (err, docs) {
    if (err) return callback(err, null)
    if (typeof docs !== 'undefined' && docs !== null && docs.length > 0 && typeof docs[0].running !== 'undefined') return callback(null, {'running': docs[0].running, 'in_cache': true})
    else return callback(null, {'in_cache': false})
  })
}

DatabaseManager.prototype.pidChange = function (pid, isRunning) {
  db.insert({ 'pid': pid, 'running': isRunning, 'createdAt': new Date() })
}

module.exports = {DatabaseManager}

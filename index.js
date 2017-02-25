#!/usr/bin/env node
const program = require('commander')
const restify = require('restify')
const dipaUtil = require('./lib/dipa-util')
const pidRoute = require('./routes/pid')

const localPackage = require('./package.json')

var prefix = '/api/'
var port = 8080

program
  .version(localPackage.version)
  .option('-p, --port [port]', 'Custom port (default: ' + port + ')')
  .option('--prefix [prefix]', 'Custom api prefix (default: ' + prefix + ')')
  .parse(process.argv)

if (program.prefix) prefix = dipaUtil.toPrefix(program.prefix)
if (program.port) port = dipaUtil.formatNumber(program.port)

const API_VERSION = 'v1'
const BASE_API = prefix + API_VERSION

var server = restify.createServer()
server.get(BASE_API + '/pid/:id', pidRoute)

server.listen(port, function () {
  console.log('listening at %s', server.url + BASE_API + '/pid/{YOUR_PID}')
})

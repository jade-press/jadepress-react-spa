
'use strict'

process.env.NODE_ENV = 'dev'

const
config0 = require('./dev-config')
,devPort = config0.port
,port = config0.devServerPort
,MongoClient = require('mongodb').MongoClient
,pack = require('../package.json')
,path = require('path')
,co = require('co')

let config = require('../node_modules/jade-press/config-sample')
config.setting.theme = {
  path: path.resolve(__dirname, '..')
  ,name: pack.name
  ,version: pack.version
}
config.local.themeResDev = 'http://127.0.0.1:' + devPort
config.setting.plugins = {}
config.setting.mongoStoreOptions.url = 'mongodb://127.0.0.1:27017/test0'
config.setting.dbLink = 'mongodb://127.0.0.1:27017/test0'
config.local.port = port
config.local.pageSize = 2
let init = require('jade-press').init

co(function* () {
  let dd = yield MongoClient.connect(config.setting.dbLink)
  //yield dd.dropDatabase()
  let res = yield init(config)
  return Promise.resolve(res)
})
.then(function(app) {

  app.listen(port, config.setting.listenAddress, function() {
    console.log('' + new Date(), config.local.siteName, 'runs on port', port)
  })
  
})


// http://nightwatchjs.org/guide#settings-file
const config0 = require('../../build/dev-config')

module.exports = {
  "src_folders": ["test/e2e/specs"],
  "output_folder": "test/e2e/reports",
  "custom_assertions_path": ["test/e2e/custom-assertions"],

  "selenium": {
    "start_process": true,
    "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar",
    "host": "127.0.0.1",
    "port": config0.testPort,
    "cli_args": {
      "webdriver.chrome.driver": require('chromedriver').path
    }
  },

  "test_settings": {
    "default": {
      "selenium_port": config0.testPort,
      "selenium_host": "localhost",
      "silent": true
    },

    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
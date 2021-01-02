require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path 
      //'webdriver.chrome.driver': "/usr/local/bin/chromedriver" 
    } 
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port),
        defaultUser:{
          email: 'rivelino@gmail.com',
          password: '123456',
          username: 'Rivelino10',
          firstName: 'Rivelino',
          lastName: 'Silva',
          biography: 'Ex-Jogador',
        },
        defaultStory:{
          author: "Rivelino10",
          title: "Fui jogador de futebol um dia",
          content: "Joguei muito no corinthians"
        },
        login: (browser, user) => {
          const devServer = browser.globals.devServerURL
      
          browser
            .url(devServer)
            .useXpath()
            .waitForElementVisible("//a[text()='Login']", 5000)
            .click("//a[text()='Login']")
            .useCss()
            .assert.visible("button[class=confirm]")
            .setValue('input[id=email]', user.email)
            .setValue('input[id=password]', user.password)
            .click("button[class=confirm]")
            .useXpath()
            .waitForElementVisible("//a[text()='" + user.username + "']", 10000)
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions : {
          //args : ["--no-sandbox", "--disable-dev-shm-usage", "--headless", "--remote-debugging-port=9222"]
          args : ["--no-sandbox", "--disable-dev-shm-usage", "--remote-debugging-port=9222"]
        } 
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}

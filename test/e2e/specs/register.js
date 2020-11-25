module.exports = {

    email: 'ayrofllmao@gmail.com',
    password:  '123456',

     
    'validating empty fields': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL
  
      browser
        .url(devServer)
        .waitForElementVisible('#app', 5000)
        .useXpath()
        .assert.visible("//a[text()='Register']")
        .click("//a[text()='Register']")
        .useCss()
        .assert.visible("button[type=submit]")
        .click("button[type=submit]")
        .useXpath()
        .assert.visible("//span[text()='This field is required']")
        .end()
    },
    'inserts a user': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL
    
        browser
          .url(devServer)
          .useXpath()
          .waitForElementVisible("//a[text()='Register']", 5000)
          .click("//a[text()='Register']")
          .useCss()

          .assert.visible("button[type=submit]")
          browser.setValue('input[id=email]', 'ayrofllmao@gmail.com')
          browser.setValue('input[id=password]', '123456')
          browser.setValue('input[id=username]', 'risos')
          browser.setValue('input[id=firstName]', 'risonho')
          browser.setValue('input[id=lastName]', 'da silva')
          browser.setValue('textarea[id=biography]', 'hhahahahahah')
          .click("button[type=submit]")
          .useXpath()
          .waitForElementVisible("//a[text()='risos']", 10000)
          .end()
      }
  }
  
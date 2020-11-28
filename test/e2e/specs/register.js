module.exports = {
    beforeEach : function(browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .url(devServer)
        .useXpath()
        .waitForElementVisible("//a[text()='Register']", 5000)
        .click("//a[text()='Register']")
        .useCss()
        .assert.visible("button[type=submit]")

      
    },

    'validates empty fields': function (browser) {
      browser
        .click("button[type=submit]")
        .useXpath()
        .assert.visible("//span[text()='This field is required']")
        .end()
    },

    'validates invalid emails': function (browser) {
      
        browser.setValue('input[id=email]', 'ayrofllmao')
        .click("button[type=submit]")
        .useXpath()
        .assert.visible("//span[text()='A valid email is required']")
        .end()
    },

    'validates small passwords': function (browser) {
      
        browser.setValue('input[id=password]', '12345')
        .click("button[type=submit]")
        .useXpath()
        .assert.visible("//span[text()='A valid password with 6 digits or more is required']")
        .end()
    },

    'inserts a user': function (browser) {
      const devServer = browser.globals.devServerURL
    
      browser
        .url(devServer)
        .useXpath()
        .waitForElementVisible("//a[text()='Register']", 5000)
        .click("//a[text()='Register']")
        .useCss()
        .assert.visible("button[type=submit]")
        .setValue('input[id=email]', 'ayrofllmao@gmail.com')
        .setValue('input[id=password]', '123456')
        .setValue('input[id=username]', 'risos')
        .setValue('input[id=firstName]', 'risonho')
        .setValue('input[id=lastName]', 'da silva')
        .setValue('textarea[id=biography]', 'hhahahahahah')
        .click("button[type=submit]")
        .useXpath()
        .waitForElementVisible("//a[text()='risos']", 10000)
        .end()
    },

  }
  
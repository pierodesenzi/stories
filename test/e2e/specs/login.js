module.exports = {

    beforeEach : function(browser) {
      const devServer = browser.globals.devServerURL

      browser
        .url(devServer)
        .useXpath()
        .waitForElementVisible("//a[text()='Login']", 5000)
        .click("//a[text()='Login']")
        .useCss()
        .assert.visible("button[class=confirm]")
    },

    'it logins with the default user': function (browser) {
        const user = browser.globals.defaultUser;
        browser
          .setValue('input[id=email]', user.email)
          .setValue('input[id=password]', user.password)
          .click("button[class=confirm]")
          .useXpath()
          .waitForElementVisible("//a[text()='" + user.username + "']", 10000)
          .end()
    },

    'it fails a login with invalid email': function (browser) {
        const user = browser.globals.defaultUser;
        browser.setValue('input[id=email]', 'a')
        .click("button[class=confirm]")
        .useXpath()
        .waitForElementVisible("//span[text()='Insert a valid email']", 10000)
        .end()
    },

    'it fails a login with non registered email': function (browser) {
      const user = browser.globals.defaultUser;
      browser
        .setValue('input[id=email]', 'ronaldo@gmail.com')
        .setValue('input[id=password]', user.password)
        .click("button[class=confirm]")
        .useXpath()
        .waitForElementVisible("//span[text()='Email not found']", 10000)
        .end()
    },

    'it fails a login with wrong password': function (browser) {
      const user = browser.globals.defaultUser;
      browser
        .setValue('input[id=email]', user.email)
        .setValue('input[id=password]', '123456789')
        .click("button[class=confirm]")
        .useXpath()
        .waitForElementVisible("//span[text()='Wrong Password']", 10000)
        .end()
    },

  }
  
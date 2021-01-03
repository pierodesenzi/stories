module.exports = {

    beforeEach : function(browser) {
      var user = browser.globals.defaultUser;
      browser.globals.login(browser, user)
      browser
          .waitForElementVisible("//a[text()='Groups']", 5000)
          .click("//a[text()='Groups']")
          .useCss()
          .waitForElementVisible("div[id=groups]", 5000)
    },

    'join a group': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .useXpath()
        .waitForElementVisible('(//button[contains(@class, "join")])[1]', 5000)
        .click('(//button[contains(@class, "join")])[1]')
        .waitForElementVisible('(//button[contains(@class, "leave")])[1]', 5000)
        .saveScreenshot('./prints/file1.png')
        .end()
    },

    'view a group feed': function (browser) {
        const devServer = browser.globals.devServerURL
        const story = browser.globals.defaultGroupStory
    
        browser
          .useXpath()
          .saveScreenshot('./prints/file2.png')
          .waitForElementVisible('(//a[contains(@class, "view")])[1]', 5000)
          .click('(//a[contains(@class, "view")])[1]')
          .waitForElementVisible("//h5[text()='" + story.title + "']", 5000)
          .assert.visible("//span[text()='" + story.content + "']")
          .assert.visible("//span[text()='" + story.author + "']")
          .end()
      },

}
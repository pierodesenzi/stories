module.exports = {

    beforeEach : function(browser) {
      var user = browser.globals.defaultUser;
      browser.globals.login(browser, user)
      browser
          .waitForElementVisible("//a[text()='"+user.username+"']", 5000)
          .click("//a[text()='"+user.username+"']")
          .useCss()
          .waitForElementVisible("div[id=profile]", 5000)
    },

    'shows profile information': function (browser) {
      const devServer = browser.globals.devServerURL
      const defaultUser = browser.globals.defaultUser
      const fullName = defaultUser.firstName + ' ' + defaultUser.lastName
  
      browser
        .useXpath()
        .assert.visible("//h3[text()='"+fullName+"']")
        .assert.visible("//h5[text()='"+defaultUser.biography+"']")
        .useCss()
        .waitForElementVisible("ul[id=profileStories]", 5000)
        .end()
    },

    'shows the registered story without author': function (browser) {
        const devServer = browser.globals.devServerURL

        const defStory = browser.globals.defaultStory;
    
        browser
          .waitForElementVisible("ul[id=profileStories]", 5000)
          .useXpath()
          .assert.visible("//h5[text()='"+defStory.title+"']")
          .assert.visible("//span[text()='"+defStory.content+"']")
          .assert.not.elementPresent("//span[text()='"+defStory.author+"']")
          .useCss()
          .assert.not.elementPresent("hr")
          .end()
      },
}
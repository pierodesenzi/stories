module.exports = {

    beforeEach : function(browser) {
      var user = browser.globals.defaultUser;
      browser.globals.login(browser, user)
      browser
          .waitForElementVisible("//a[text()='Feed']", 5000)
          .click("//a[text()='Feed']")
          .useCss()
          .waitForElementVisible("div[id=feed]", 5000)
    },

    'shows pagetitle and list of articles': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .useXpath()
        .assert.visible("//h3[text()='Feed de artigos']")
        .useCss()
        .waitForElementVisible("ul[id=feedStories]", 5000)
        .end()
    },

    'shows the registered story with author': function (browser) {
        const devServer = browser.globals.devServerURL

        const defStory = browser.globals.defaultStory;
    
        browser
          .waitForElementVisible("ul[id=feedStories]", 5000)
          .useXpath()
          .assert.visible("//h5[text()='"+defStory.title+"']")
          .assert.visible("//span[text()='"+defStory.content+"']")
          .assert.visible("//span[text()='"+defStory.author+"']")
          .useCss()
          .assert.visible("hr")
          .end()
      },
}
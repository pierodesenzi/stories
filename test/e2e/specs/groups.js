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
        .end()
    },

    

    'view a group feed': function (browser) {
        const devServer = browser.globals.devServerURL
        const story = browser.globals.defaultGroupStory
    
        browser
          .useXpath()
          .waitForElementVisible('(//a[contains(@class, "view")])[1]', 5000)
          .click('(//a[contains(@class, "view")])[1]')
          .waitForElementVisible("//h5[text()='" + story.title + "']", 5000)
          .assert.visible("//span[text()='" + story.content + "']")
          .assert.visible("//span[text()='" + story.author + "']")
          .end()
      },

    'view a group story in my feed': function (browser) {
        const devServer = browser.globals.devServerURL
        const story = browser.globals.defaultGroupStory
    
        browser
          .useXpath()
          .waitForElementVisible('(//a[contains(@class, "view")])[1]', 5000)

          .click('//a[text()="My Feed"]')
          .waitForElementVisible("//h5[text()='" + story.title + "']", 5000)
          .assert.visible("//span[text()='" + story.content + "']")
          .assert.visible("//span[text()='" + story.author + "']")
          .end()
      },

      'inserts a new story in a group': function (browser) {
        const devServer = browser.globals.devServerURL
        const titulo = "História em grupo"
        const conteudo = "Historinha"
        const grupo = "Histórias +18"
    
        browser
          .useXpath()
          .click('//a[text()="Write"]')
          .useCss()
          .waitForElementVisible('input[id=title]', 10000)
          .setValue('input[id=title]', titulo)
          .assert.visible('textarea[id=content]')
          .setValue('textarea[id=content]', conteudo)
          .assert.visible('select[id=groups]')
          .setValue('select[id=groups]', grupo)
          .assert.visible("button[id=submitStory]")
          .click("button[id=submitStory]")
          .useXpath()
          .waitForElementVisible("//h5[text()='"+titulo+"']", 5000)
          .waitForElementVisible("//span[text()='"+conteudo+"']", 5000)
          .end()
      },

      'exit a group': function (browser) {
        const devServer = browser.globals.devServerURL
        const story = browser.globals.defaultGroupStory
    
        browser
          .useXpath()
          .waitForElementVisible('(//button[contains(@class, "leave")])[1]', 5000)
          .click('(//button[contains(@class, "leave")])[1]')
          .pause(1000)
          .click("//a[text()='Groups']")
          .saveScreenshot('./prints/file.png')
          .waitForElementVisible('(//button[contains(@class, "join")])[3]', 10000)
          .click('//a[text()="My Feed"]')
          .waitForElementVisible('//h4[text()="Não há histórias a serem mostradas"]', 5000)
          .end()
      },

      

}
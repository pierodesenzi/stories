module.exports = {

    beforeEach : function(browser) {
      var user = browser.globals.defaultUser;
      browser.globals.login(browser, user)
      browser
          .waitForElementVisible("//a[text()='Write']", 5000)
          .click("//a[text()='Write']")
          .useCss()
          .waitForElementVisible("div[id=write]", 5000)
    },

    'validates empty title': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .assert.visible('textarea[id=content]')
        .setValue('textarea[id=content]', 'titulo')
        .assert.visible('select[id=groups]')
        .setValue('select[id=groups]', 'Main Feed')
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .assert.visible("//span[text()='A title for your story is required']")
        .end()
    },

    'validates empty content': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .assert.visible('input[id=title]')
        .setValue('input[id=title]', 'titulo')
        .assert.visible('select[id=groups]')
        .setValue('select[id=groups]', 'Main Feed')
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .assert.visible("//span[text()='The content of your story is required']")
        .end()
    },

    'validates empty group': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .assert.visible('input[id=title]')
        .setValue('input[id=title]', 'titulo')
        .assert.visible('textarea[id=content]')
        .setValue('textarea[id=content]', 'titulo')
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .assert.visible("//span[text()='You need to set a group, or publish the story in the main feed.']")
        .end()
    },

    'validates all empty': function (browser) {
      const devServer = browser.globals.devServerURL
  
      browser
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .assert.visible("//span[text()='The content of your story is required']")
        .assert.visible("//span[text()='A title for your story is required']")
        .assert.visible("//span[text()='You need to set a group, or publish the story in the main feed.']")
        .end()
    },

    'inserts a new story in main feed': function (browser) {
      const devServer = browser.globals.devServerURL
      const titulo = "testandoTitulo"
      const conteudo = "testando o conteudo"
      const grupo = "Main Feed"
  
      browser
        .assert.visible('input[id=title]')
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
  }
  
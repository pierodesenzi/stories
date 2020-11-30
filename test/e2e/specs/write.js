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
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .assert.visible("//span[text()='The content of your story is required']")
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
        .end()
    },

    'inserts a new story': function (browser) {
      const devServer = browser.globals.devServerURL
      const titulo = "testandoTitulo"
      const conteudo = "testando o conteudo"
  
      browser
        .assert.visible('input[id=title]')
        .setValue('input[id=title]', titulo)
        .assert.visible('textarea[id=content]')
        .setValue('textarea[id=content]', conteudo)
        .assert.visible("button[id=submitStory]")
        .click("button[id=submitStory]")
        .useXpath()
        .waitForElementVisible("//h5[text()='"+titulo+"']", 5000)
        .waitForElementVisible("//a[text()='"+conteudo+"']", 5000)
        .end()
    },
  }
  
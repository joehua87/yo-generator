module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('model', {
    description: 'Generate repository, controller & route',
    prompts: [{
      type: 'input',
      name: 'modelPackage',
      message: 'What is your Models Npm Package?',
      default: '<%= moduleName %>-models',
      validate(value) {
        if ((/.+/).test(value)) {
          return true
        }
        return 'modelPackage is required'
      }
    }, {
      type: 'input',
      name: 'modelName',
      message: 'What is your model name?',
      validate(value) {
        if ((/.+/).test(value)) {
          return true
        }
        return 'modelName is required'
      }
    }],
    actions: [{
      type: 'add',
      path: '../src/{{dashCase modelName}}/repository.js',
      templateFile: `${__dirname}/templates/repository.hbs`
    }, {
      type: 'add',
      path: '../src/{{dashCase modelName}}/controller.js',
      templateFile: `${__dirname}/templates/controller.hbs`
    }, {
      type: 'add',
      path: '../src/{{dashCase modelName}}/route.js',
      templateFile: `${__dirname}/templates/route.hbs`
    }, {
      type: 'modify',
      path: '../src/app.js',
      pattern: /\/\/ Add new route here/gi,
      templateFile: `${__dirname}/templates/add-route.hbs`,
    }]
  })
}

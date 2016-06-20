module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('model', {
    description: 'Model generator',
    prompts: [{
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
      path: '../src/models/{{dashCase modelName}}.model.js',
      templateFile: `${__dirname}/templates/template.model.hbs`
    }, {
      type: 'modify',
      path: '../src/index.js',
      pattern: /\/\/ Add export here/gi,
      templateFile: `${__dirname}/templates/register.hbs`,
    }]
  })
}

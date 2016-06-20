import { Base } from 'yeoman-generator'
import mkdirp from 'mkdirp'
import 'babel-polyfill'

class Generator extends Base {
  constructor(args, options) {
    super(args, options)
    this.argument('appName', { type: String, required: true })
  }

  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What more starter-kit would you like?',
        choices: [{
          name: 'Basic',
          value: 'basic',
          checked: true
        }, {
          name: 'React View',
          value: 'react-view',
          checked: false
        }, {
          name: 'Koa Api',
          value: 'koa-api',
          checked: false
        }, {
          name: 'Mongoose Models',
          value: 'mongoose-models',
          checked: false
        }]
      }, {
        type: 'input',
        name: 'authorName',
        message: 'Your name?',
        default: 'your-name',
        store: true
      }, {
        type: 'input',
        name: 'moduleName',
        message: 'Module Name?',
        when: (answers) => answers.template === 'koa-api',
        store: false
      }, {
        type: 'confirm',
        name: 'installNpm',
        message: 'Do you want to install npm?',
        default: true,
      }
    ]).then((answers) => {
      this.template = answers.template
      this.authorName = answers.authorName
      this.moduleName = answers.moduleName
      this.installNpm = answers.installNpm
    })
  }

  async makeDir() {
    await new Promise((resolve) => {
      mkdirp(this.appName, resolve)
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`${this.template}/.babelrc`),
      this.destinationPath(`${this.appName}/.babelrc`),
    )

    this.fs.copyTpl(
      this.templatePath(`${this.template}/package.json`),
      this.destinationPath(`${this.appName}/package.json`),
      {
        appName: this.appName,
        authorName: this.authorName
      },
    )

    this.fs.copyTpl(
      this.templatePath(`${this.template}/src`),
      this.destinationPath(`${this.appName}/src`),
      { moduleName: this.moduleName },
    )

    if (this.template === 'mongoose-models') {
      this.fs.copyTpl(
        this.templatePath(`${this.template}/generators`),
        this.destinationPath(`${this.appName}/generators`),
      )
    }

    if (this.template === 'koa-api') {
      this.fs.copyTpl(
        this.templatePath(`${this.template}/config.ejs`),
        this.destinationPath(`${this.appName}/src/config.js`),
        {
          moduleName: this.moduleName,
          DB_HOST: 'DB_HOST',
        },
      )
    }

    if (this.template === 'react-view') {
      this.fs.copyTpl(
        this.templatePath(`${this.template}/server`),
        this.destinationPath(`${this.appName}/server`),
      )

      this.fs.copyTpl(
        this.templatePath(`${this.template}/webpack.config.js`),
        this.destinationPath(`${this.appName}/webpack.config.js`),
        { appName: this.appName },
      )

      this.fs.copyTpl(
        this.templatePath(`${this.template}/testHelper.js`),
        this.destinationPath(`${this.appName}/testHelper.js`),
      )

      this.fs.copyTpl(
        this.templatePath(`${this.template}/webpack.preview.config.js`),
        this.destinationPath(`${this.appName}/webpack.preview.config.js`),
      )
    }
  }

  installDeps() {
    if (this.installNpm) {
      process.chdir(this.appName)
      this.installDependencies()
    }
  }
}

module.exports = Generator

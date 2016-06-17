import { Base } from 'yeoman-generator'
import mkdirp from 'mkdirp'

class Generator extends Base {
  constructor(args, options) {
    super(args, options)
    this.argument('appName', { type: String, required: true })
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Your name?',
        default: 'your-name',
        store: true
      }
    ]).then((answers) => {
      this.authorName = answers.authorName
    })
  }

  makeDir() {
    mkdirp(this.appName)
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath(`${this.appName}/src`)
    )

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath(`${this.appName}/.babelrc`)
    )

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${this.appName}/package.json`),
      {
        appName: this.appName,
        authorName: this.authorName
      },
    )
  }

  installDeps() {
    process.chdir(this.appName)
    this.installDependencies()
  }
}

module.exports = Generator

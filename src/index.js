// const mkdirAsync = Promise.promisify(fs.mkdirSync)
// import fs from 'fs'
// import Promise from 'bluebird'
import chalk from 'chalk'
import pkg from '../package.json'
import program from 'commander'
import { buildFoldersAsync } from './helpers'

program
  .version(pkg.version)
  .usage('[options] [dir]')
  .option('-c', '--console', 'Console log')
  .parse(process.argv)

const FIRST = program.args[0] || null
const SECOND = program.args[1] || null
// const THIRD = program.args[2] || null

const newScaffold = () => {
  //
}

const newAPI = () => {
  if (program.args.length > 2) {
    console.log(chalk.yellow('Usage: hobbit new project_name.'))
    process.exit(1)
  }
  buildFoldersAsync(SECOND)
}

const main = () => {
  if (!SECOND) {
    console.log(chalk.red('Faltan argumentos!'))
    process.exit(1)
  }

  if (['new', 'generate'].includes(FIRST.toLowerCase())) {
    if (FIRST.toLowerCase() === 'new') {
      newAPI()
    } else {
      newScaffold()
    }
  } else console.log(chalk.red(FIRST + ' no es un arg válido!'))
}

main()

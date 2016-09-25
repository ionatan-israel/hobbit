import chalk from 'chalk'
import pkg from '../package.json'
import program from 'commander'
import { buildFoldersAsync, createControllers, createModel } from './helpers'

program
  .version(pkg.version)
  .usage('[options] [dir]')
  .option('-c', '--console', 'Console log')
  .parse(process.argv)

const FIRST = program.args[0] || null
const SECOND = program.args[1] || null
const THIRD = program.args[2] || null

const newScaffold = () => {
  createModel(THIRD)
  createControllers(THIRD)
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
    if (FIRST.toLowerCase() === 'new') newAPI()
    if (SECOND === 'scaffold') newScaffold()
  } else console.log(chalk.red(FIRST + ' no es un arg válido!'))
}

main()

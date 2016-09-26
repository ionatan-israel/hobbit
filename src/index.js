import { buildFoldersAsync } from './helpers'
import { factoryControllers, factoryModels } from './factories'
import chalk from 'chalk'
import pkg from '../package.json'
import program from 'commander'

const crud = () => {
  factoryModels(program.args[0])
  factoryControllers(program.args[0])
}

const newAPI = () => buildFoldersAsync(program.args[0])

program
  .version(pkg.version)
  .usage('[options] [dir]')
  .option('-n, --new', 'hobbit [-n] || [--new] newapi')
  .option('-c, --crud', 'hobbit [-s] || [--crud] category')
  .parse(process.argv)

if ((!program.new && !program.crud) || (program.args.length < 1)) program.outputHelp(chalk.red)
if (program.new) newAPI()
if (program.crud) crud()

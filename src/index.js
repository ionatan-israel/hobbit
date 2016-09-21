import program from 'commander'
import pkg from '../package.json'

program
  .version(pkg.version)
  .usage('[options] [dir]')
  .parse(process.argv)

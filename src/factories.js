import bluebird from 'bluebird'
import chalk from 'chalk'
import fs from 'fs'
import pluralize from 'pluralize'

const writeFile = bluebird.promisify(fs.writeFile)

export const factoryModels = (module) => {
  let contentModel = `import mongoose, {Schema} from 'mongoose'

const ${module}Schema = Schema({
  name: String
}, { timestamps: true, versionKey: false })

export default mongoose.model('${module}', ${module}Schema, '${pluralize(module)}')
`
  writeFile(`./src/models/${pluralize(module)}.js`, contentModel)
  .then(() => console.log(chalk.green(`The ${module} model was created!!`)))
}

export const factoryControllers = (module) => {
  let contentController = `import boom from 'boom'

export const list = (req, res, next) =>
  req.models.${module}.find({})
  .then((${pluralize(module)}) => res.json(${pluralize(module)}))
  .catch((err) => next(boom.wrap(err, 500)))

export const create = (req, res, next) =>
  req.models.${module}.create(req.body)
  .then((${module}) => res.json(${module}))
  .catch((err) => next(boom.wrap(err, 400)))
`
  writeFile(`./src/controllers/${pluralize(module)}.js`, contentController)
  .then(() => console.log(chalk.green(`The ${module} controller was created!!`)))
}

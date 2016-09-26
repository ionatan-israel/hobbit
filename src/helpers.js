import { exec } from 'child_process'
import bluebird from 'bluebird'
import fs from 'fs'
import mkdirp from 'mkdir-p'
import path from 'path'
import chalk from 'chalk'
import structure from './structure'
const mkdirAsync = bluebird.promisify(mkdirp)
const readFile = bluebird.promisify(fs.readFile)
const writeFile = bluebird.promisify(fs.writeFile)

const FOLDERS = ['controllers', 'models', 'helpers', 'middlewares']
const ROOT_DIR = path.join(__dirname)
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates')

const execAsync = (command, dir) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(err)
      resolve(stdout)
    })
  })
}

const createPackageJson = (dir) => {
  process.chdir(dir)
  execAsync('npm init -y', dir)
  .then(() => {
    console.log('Instalando dependencias de produccion')
    execAsync('npm i -S gitignore connect-multiparty body-parser bcrypt-nodejs bcrypt babel-register babel-preset-stage-0 babel-preset-es2016 babel-preset-es2015 boom chalk express jsonwebtoken mongoose bluebird validator slug morgan cors cookie-parser', dir)
    .then(() => {
      console.log('Instalando dependencias de desarrollo')
      execAsync('npm i -D babel-eslint nodemon standard', dir)
      .then(() => {
        console.log('Creando .gitignore file!')
        execAsync('./node_modules/gitignore/bin/gitignore.js node')
      })
    })
  })
  .catch((err) => console.log(err))
}

const createFiles = (dir) => {
  const fromDest = []
  for (let key in structure) {
    if (key === 'files') {
      fromDest.push(...structure.files.map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/${file}` })))
    }
    if (key === 'src') {
      fromDest.push(...structure.src.map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/${key}/${file}` })))
    }
    if (!['files', 'src'].includes(key)) {
      fromDest.push(...structure[key].map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/src/${key}/${file}` })))
    }
  }
  bluebird.all(fromDest.map((file) => readFile(file._from).then((content) => writeFile(`${file.to}`, content).catch((err) => console.log(err)))))
  .then(() => {
    console.log(chalk.yellow('Installings dependencies...'))
    // createPackageJson(dir)
  })
}

export const buildFoldersAsync = (base) =>
  bluebird.all(FOLDERS.map((i) => `${base}/src/${i}`).map((folder) => mkdirAsync(folder).then(console.log(`${folder} creado!`))))
  .then(() => createFiles(base))
  .catch((err) => console.log(err))

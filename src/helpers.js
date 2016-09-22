import bluebird from 'bluebird'
import fs from 'fs'
import path from 'path'
import structure from './structure'
import mkdirp from 'mkdir-p'

const ROOT_DIR = path.join(__dirname)
const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates')
const FOLDERS = ['controllers', 'models', 'helpers', 'middlewares']
const mkdirAsync = bluebird.promisify(mkdirp)
const readFile = bluebird.promisify(fs.readFile)
const writeFile = bluebird.promisify(fs.writeFile)

const createFiles = (dir) => {
  const fromDest = []
  for (let key in structure) {
    if (key === 'files') {
      fromDest.push(...structure.files.map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/${file}` })))
    } else {
      if (key === 'src') {
        fromDest.push(...structure.src.map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/${key}/${file}` })))
      } else {
        fromDest.push(...structure[key].map((file) => ({ _from: `${TEMPLATES_DIR}/${key}/${file}`, to: `${dir}/src/${key}/${file}` })))
      }
    }
  }
  bluebird.all(fromDest.map((file) => readFile(file._from).then((content) => writeFile(`${file.to}`, content).catch((err) => console.log(err)))))
}

export const buildFoldersAsync = (base) =>
  bluebird.all(FOLDERS.map((i) => `${base}/src/${i}`).map((folder) => mkdirAsync(folder).then(console.log(`${folder} creado!`))))
  .then(() => createFiles(base))
  .catch((err) => console.log(err))

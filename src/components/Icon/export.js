/* eslint-disable */
const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, 'generated'))


const generatedForExportIconCode = files
    .filter(f => f.includes('tsx'))
    .map(f => {
        const fileName = f.split('.')[0]
        return `export { default as ${fileName} } from './generated/${fileName}'`
    })
    .join('\n')

fs.writeFile(path.join(__dirname, 'index.tsx'), [generatedForExportIconCode + '\n'], err => {
    if (err) throw err
    console.log('The index file has been saved!')
})

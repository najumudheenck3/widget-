let express = require('express')
require('dotenv').config()
let cors = require('cors')
let path = require('path')

const fs = require('fs')

let app = express()
app.use(express.json())

app.use(
    cors({
        origin: true
    })
)
console.log(path.join(__dirname, './chatwidget/build'));
// Thi 0 t tatic fi og fi th
app.use(
    express.static(path.resolve(path.join(__dirname, './chatwidget/build')))

)

app.get('/sample', (req, res, next) => {
    console.log('ok ok');
    return res.send({
        message:"oka oka"
    })
})


app.get('/getfiles', (req, res, next) => {
    const jsFolder = './chatwidget/build/static/js'
    const cssFolder = './chatwidget/build/static/css'

    jsFiles = []
    cssFiles = []

    fs.readdirSync(jsFolder).forEach((eachFile) => {
        jsFiles.push(eachFile)
    })


    fs.readdirSync(cssFolder).forEach((eachFile) => {
        cssFiles.push(eachFile)
    })

    res.send({
        jsFiles,
        cssFiles,
    })
})


console.log(process.env.PORT);
const PORT = process.env.PORT || 8890
app.listen(PORT, () => {
    console.log('server is running on: ', PORT)
})
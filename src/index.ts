import express from 'express'
import bodyParser from 'body-parser'
import router from './router'

const app = express()
const port = 3000

app.use('/file', router)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
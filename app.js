const express = require('express')
const port = process.env.PORT || 3033
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
require('./routes')(app)

if(require.main === module)
    app.listen(port,()=> console.log(`Express started in` + ` ${app.get('env')}` + 
    ` mode at http://localhost:${port}; `+` press Ctrl-C to terminate.`))
else
    module.exports = app

    
const express = require('express')
const port = process.env.PORT || 3033
const app = express()
const { credentials } = require('./config')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

const flash = require('connect-flash')
app.use(flash())

const expressSession = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(expressSession)
const redisClient = redis.createClient({
    legacyMode: true
})
redisClient.connect();

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: credentials.secret,
        store: new RedisStore({
            client:redisClient
        }),
    })
)

const createAuth = require('./lib/auth')
const auth = createAuth(app)
auth.init()
auth.registerRoutes()

require('./routes')(app)

if(require.main === module)
    app.listen(port,()=> console.log(`Express started in` + ` ${app.get('env')}` + 
    ` mode at http://localhost:${port}; `+` press Ctrl-C to terminate.`))
else
    module.exports = app

    
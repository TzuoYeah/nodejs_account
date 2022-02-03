const api = require('./handlers/api')
const auth = require('./handlers/auth')

module.exports = function(app){
    app.post('/login',api.login)
    app.get('/account',api.account)
    app.post('/register',api.register)
    app.get('/auth/failureRedirect',auth.failureRedirect)
    app.get('/auth/successRedirect',auth.successRedirect)
}
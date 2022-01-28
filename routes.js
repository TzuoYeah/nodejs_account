const api = require('./handlers/api')

module.exports = function(app){
    app.get('/api/findUser',api.findUser)
    app.post('/api/register',api.register)
    app.get('/api/failureRedirect',api.failureRedirect)
    app.get('/api/successRedirect',api.successRedirect)
}
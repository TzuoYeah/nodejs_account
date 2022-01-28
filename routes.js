const api = require('./handlers/api')

module.exports = function(app){
    app.get('/api/findUser',api.findUser)
    app.post('/api/register',api.register)
}
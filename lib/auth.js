const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')

passport.serializeUser( (user, done) => done(null,user.id))
passport.deserializeUser((id,done)=> done(null,db.findUser(id)))

module.exports = (app,options={})=>{
    if(!options.successRedirect) options.successRedirect = '/api/successRedirect'
    if(!options.failureRedirect) options.failureRedirect = '/api/failureRedirect'
    
    return{
        init : ()=>{
				passport.use(new LocalStrategy({
                    usernameField: 'email'
                },
                async(email, password, done) => {
                    const user = await db.findUser(email)
                    if(user.length){
                        if(user[0].password == password) return done(null, { id:user[0].email })
                        else done(null,false, { message: 'wrong password.' })
                    }
                    else return done("error message")
                }))

            app.use(passport.initialize())
            app.use(passport.session())
        },
        registerRoutes:()=>{
            app.post('/auth/login',
                passport.authenticate('local',{failureRedirect : options.failureRedirect,}),
                (req,res) => {
                    res.send({ user : req.session.passport.user })
                }
            )
        }
    }
}
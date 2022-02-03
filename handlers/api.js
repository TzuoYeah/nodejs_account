const db = require('../db')

exports.login = async(req,res)=>{
    res.redirect(307,'/auth/login')
}
exports.account = async(req,res)=>{
    if(!req.isAuthenticated()) return res.json( {failed:"No authorized."} )
    const user = await req.user
    return res.json(user)
}
exports.register = async(req,res)=>{
    let mes ={}
    const user = await db.findUser(req.body.email)
    if(!user)
        mes = await db.addUser(req.body.name, req.body.email, req.body.password)
    return res.json(mes)
}
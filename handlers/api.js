const db = require('../db')

exports.findUser = async(req,res)=>{
    const user = await db.findUser(req.body.email)
    res.json(user)
}
exports.register = async(req,res)=>{
    const user = await db.findUser(req.body.email)
    if(!user.length)
        await db.addUser(req.body.email,req.body.password)
    res.json({})
}
exports.failureRedirect = async(req,res)=>{
    res.send({ message : req.flash('error')} )
}
exports.successRedirect = async(req,res)=>{
    res.send({ user : req.session.passport.user })
}
exports.failureRedirect = async(req,res)=>{
    res.send({ message : req.flash('error')} )
}
exports.successRedirect = async(req,res)=>{
    res.send({ user : req.session.passport.user })
}
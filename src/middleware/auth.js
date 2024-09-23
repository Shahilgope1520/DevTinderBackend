const adminAuth =(req,res,next)=>{
    const token ="xyz";
    const validAdminToken = token ==="xyz";
    if(!validAdminToken){
        res.status(401).send("Unauthorized Request")
    }
    else{
        next()
    }
}
const authUser =(req,res,next)=>{
    const token ="xyssz";
    const validUserToken = token ==="xyz";
    if(!validUserToken){
        res.status(401).send("Unauthorized Request")
    }
    else{
        next()
    }
}

module.exports ={
    adminAuth,
    authUser
}
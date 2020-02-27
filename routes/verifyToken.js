const jwt=require('jsonwebtoken');

//Middleware function
module.exports = function (req,res,next){

    var token=req.header('authToken');
    if(!token) return res.status(401).send('Access Denied!');

    try{
        var verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }


}

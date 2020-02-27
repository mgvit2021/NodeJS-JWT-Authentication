const router=require('express').Router();
const checkAuthorized=require('./verifyToken');

router.get('/',checkAuthorized,(req,res)=>{
    res.send(req.user);
})

module.exports=router;
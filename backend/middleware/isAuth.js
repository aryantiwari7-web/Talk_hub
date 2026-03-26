const jwt=require("jsonwebtoken");

const isAuth =(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Error in finding the token"});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(400).json({message:"Error in finding the decode token"});
        }

        req.userId=decode.userId;
        console.log(decode);
        next();
    }
    catch(err){
        console.log("Auth Error");
        return res.status(400).json({message:"Error in Auth"});
    }
}

module.exports=isAuth;
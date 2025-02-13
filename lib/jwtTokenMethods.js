const jwt = require('jsonwebtoken');


const JWT_SECRET = `${process.env.JWT_SECRET}`;

const createJWT = (userId,userEmail)=>{
    const token = jwt.sign({
        uid : userId,
        email : userEmail,
    },
    JWT_SECRET,
    {expiresIn : "10d"}
    );

    return token;
}

const authenticateJWT = (token)=>{

    let isVerified = false;

    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            isVerified = false;
            
        }else{
            isVerified = true;
        }
    });


    return isVerified;
}

module.exports = {createJWT,authenticateJWT};
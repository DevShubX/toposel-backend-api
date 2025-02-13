const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createJWT } = require('../lib/jwtTokenMethods');


const loginUser = async (req,res) =>{

    try{
        const {email,password} = req.body;

        if(!email && !password){
            return res.status(400).json({errmsg:"Email or Password is required",success:false});
        }

        const exisitingUser = await User.findOne({email});

        if(!exisitingUser){
            return res.status(400).json({
                errmsg : "Incorrect email address or password",
                success : false,
            });
        }

        const verifyPassword = await bcrypt.compare(password,exisitingUser.password); 


        if(!verifyPassword){
            return res.status(400).json({
                errmsg : "Incorrect password",
                success : false,
            });
        }

        const jwtToken = createJWT(exisitingUser._id,exisitingUser.email);

        return res.status(200).json({
            msg : "Login Successfully",
            success : true,
            user: exisitingUser,
            token : jwtToken,
        });


    }catch{
        return res.status(500).json({errmsg:"Internal Server Error"});
    }
}



const registerUser = async (req,res) =>{
    try{
        const data = req.body;

        const exisitingUser = await User.findOne({email : data.email });

        if(exisitingUser){
            return res.status(400).json({
                errmsg:"This email address is already in use.",
                success:false,
            });
        }

        let newUser;
        let encryptedPassword;

        if(data.password){
            encryptedPassword = await bcrypt.hash(data.password,10);
            newUser = await User.create({
                ...data,
                password : encryptedPassword,
            });
        }

        if(!newUser){
            return res.status(400).json({
                errmsg:"Something went wrong",
                success:false,
            })
        }

        const jwtToken = createJWT(newUser._id,newUser.email);

        return res.status(200).json({
            msg: "You have been registered successfully!",
            success : true,
            token : jwtToken,
            user : newUser,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({errmsg:"Internal Server Error"});
    }
}


module.exports = {loginUser,registerUser}
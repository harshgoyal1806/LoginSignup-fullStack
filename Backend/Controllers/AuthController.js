const User = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const signup =async (req,res)=>{
   try {
      const {name,email,password} = req.body;
      const user  =await User.findOne({email});
      if(user){
       return  res.status(400)
        .json({message:"User is already exist.you can login",success:false});
      }
      
      const userModel  =new User({name,email,password});
      userModel.password =  await bcrypt.hash(password,10);
      await userModel.save();
      res.status(201).json({message:"SignUp successfully",success:true});

   } catch (error) {
     res.status(501).json({message:"Signup Error",success:false});
     console.log(error);
   }
}

const login =async (req,res)=>{
   try {
      const {email,password} = req.body;
      const errorMsg = "Auth failed email or password is wrong";
      const user  =await User.findOne({email});
      if(!user){
       return  res.status(403)
        .json({message:errorMsg,success:false});
      }
      
    const isPassEqual =await  bcrypt.compare(password,user.password);
    if(!isPassEqual){
        return  res.status(403)
        .json({message:errorMsg,success:false});
    }
    const jwtToken = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    res.status(200).json({
        message:"Login successfully",
        success:true,
        jwtToken,
        email,
        name :user.name
    })
    
   } catch (error) {
     res.status(501).json({message:"login Error",success:false});
     console.log(error);
   }
}



module.exports = {signup,login};

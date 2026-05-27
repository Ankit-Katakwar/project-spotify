const jwt = require("jsonwebtoken");

const authArtist = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
   return res.status(401).json({
      message: "Please login or register.",
    });
  }

  try{
    const decoded  = jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role!=="artist"){
        return res.status(401).json({
            message:'You are not authorised.'
        })
    }

    req.user = decoded
    next()
  }catch(err){
    res.status(401).json({
        message:"Unauthorised request",
        err:err
    })
  }

  
};
const authUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
   return res.status(401).json({
      message: "Please login or register.",
    });
  }

  try{
    const decoded  = jwt.verify(token,process.env.JWT_SECRET)

    if(decoded.role !== "user"){
        return res.status(401).json({
            message:'You are not authorised1.'
        })
    }

    req.user = decoded
    next()
  }catch(err){
    res.status(401).json({
        message:"Unauthorised request",
        err:err
    })
  }

  
};




module.exports = {authArtist ,authUser}

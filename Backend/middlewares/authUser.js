import jwt from 'jsonwebtoken'

// admin authentication middleware
const authUser = async (req , res , next) => {
    try {
       
        const {token} = req.headers
        if(!token) {
            return res.json({success:false , message : 'Not Authorized Login Again'})
        }
         
        const decoded_Token = jwt.verify(token , process.env.JWT_SECRET)

        req.userId = decoded_Token.id;  //we added "userId -> field" in req (GET)

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})  
    }
}

export default authUser ;
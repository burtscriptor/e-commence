import jwt from "jsonwebtoken";

const adminAuth = async (request, response, next )=> {

    try {
        const { token }  = request.headers;
        if (!token) {
            return response.json({success: false, message: "Not Authorised Login Again"});
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return response.json({success: false, message: "Not Authorised Login Again"});
            
        }
        next();
    } catch (error) {
        console.log(error);
        response.json({success: false, message: error.message })
        
    }

}
export default adminAuth;
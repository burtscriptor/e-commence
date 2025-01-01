import jwt from 'jsonwebtoken';

const authUser = async (request, response, next)=>{

    const { token } = request.headers;
   
    if (!token) {
        return response.json({ success: false, message: 'Not Authorised Login Again'});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('M', token_decode.id);
        request.body.userId = token_decode.id;
        
        next();
        
    } catch (error) {
        console.log('M',error);
        response.json({ success: false, message: error.message });
        
    }
}

export default authUser;
import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
 return jwt.sign({id}, process.env.JWT_SECRET);
}

// Route for user login
const loginUser = async (request, response) => {

    try {

    const { email, password } = request.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        response.json({success: false, message: "User does not exist"})     
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = createToken(user._id);
        response.json({success: true, token});
    }
    else {
        response.json({success: false, message: "Invalid credentials"})
    }
    } catch (error) {
    console.log(error);
    response.json({success: false, message: error.message})
    
    }

}

// Route for user register
const registerUser = async (request, response) => {
    try {

        const {name, email, password } = request.body;
        
        // checking user already exists or not

        const exists = await userModel.findOne({email});
        
        // valadating email format and strong password

        if (exists) {
            return response.json({success: false, message: "User already exists"});
            
        }

        if (!validator.isEmail(email)) {
            return response.json({success: false, message: "Please enter a valid email"});
            
        }
        if (password.length < 8) {
            return response.json({success: false, message: "Please enter a strong password"});
            
        }
       // hashing user password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt)

       const newUser = new userModel({
        name,
        email,
        password: hashedPassword
       })

       const user = await newUser.save();

       const token = createToken(user._id);

       response.json({success: true, token});
        
    } catch (error) {
        console.log(error);
        response.json({success: false, message: error.message})
        
    }
}

// Route for admin login
const adminLogin = async (request, response)=> {

    try {
        const { email, password } = request.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            response.json({success: true, token});
            
        }
        else 
        {
            response.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        response.json({success: false, message: error.message})
        
    }

}

export {
    loginUser,
    registerUser,
    adminLogin,
};
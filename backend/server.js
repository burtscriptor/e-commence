import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 4000;


connectDB();
connectCloudinary();


app.use(express.json());


const allowedOrigins = [
    'https://e-commence-frontend.vercel.app', 
    'http://localhost:5174', 
    'http://localhost:5173',

];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Token'],
    })
);


app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (request, response) => {
    response.send('API Working');
});


app.use((err, req, res, next) => {
    if (err.name === 'Error' && err.message === 'Not allowed by CORS') {
        return res.status(403).json({ message: 'CORS error: Origin not allowed' });
    }
    next(err);
});


app.listen(port, () => console.log('Server started on PORT : ' + port));

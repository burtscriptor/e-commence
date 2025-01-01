import express from 'express';
import authUser from '../middleware/cart.js';
import adminAuth from '../middleware/adminAuth.js'

import { placeOrder, updateStatus, userOrders, placeOrderRazorpay, placeOrderStripe, allOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;

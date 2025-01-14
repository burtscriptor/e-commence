import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (request, response)=>{
    try {
        const { userId, items, amount, address } = request.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            dat: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}});

        response.json({ success: true, message: "Order Placed"});

    } catch (error) {
        console.log(error);
        response.json({ success:false, message: error.message });
        
    }

};

const placeOrderStripe = async (request, response)=>{

};

const placeOrderRazorpay = async (request, response)=>{

};

const allOrders = async (request, response)=>{

};

const userOrders = async (request, response)=>{

    try {
        const { userId } = request.body;
        const orders = await orderModel.find({userId});
        console.log(orders);

        response.json({success:true, orders});

    } catch (error) {
        response.json({success:false, message: error.message});
        console.log(error);
        
    }

};

const updateStatus = async (request, response)=>{

};

export {
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
};
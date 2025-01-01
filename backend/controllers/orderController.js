import orderModel from "../models/orderModel.js"

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
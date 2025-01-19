
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = 'aud';
const deliveryCharge = 10;



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (request, response) => {
    try {
        const { userId, items, amount, address } = request.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            dat: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        response.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message });

    }

};

const placeOrderStripe = async (request, response) => {

    try {
        const { userId, items, amount, address } = request.body;
        console.log(userId);
        const { origin } = request.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            dat: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delievery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        response.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message });

    }

};

const verifyStripe = async (request, response) => {

    const { orderId, success, userId } = request.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            response.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            response.json({ success: false, message: error.message })
        }


    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message })

    }

};

const placeOrderRazorpay = async (request, response) => {

};

const allOrders = async (request, response) => {

    try {
        const orders = await orderModel.find({});
        response.json({ success: true, orders })

    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error);

    }

};

const userOrders = async (request, response) => {

    try {
        const { userId } = request.body;
        const orders = await orderModel.find({ userId });
        console.log(orders);

        response.json({ success: true, orders });

    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error);

    }

};

const updateStatus = async (request, response) => {

    try {

        const { orderId, status } = request.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        response.json({ success: true, message: "Status Updated" })
    } catch (error) {
        response.json({ success: false, message: error.message });
        console.log(error);

    }

};

export {
    placeOrder,
    placeOrderRazorpay,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
};
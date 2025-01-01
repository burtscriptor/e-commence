import userModel from '../models/userModel.js'

const addToCart = async (request, response) => {
    try {
        const { userId, itemId, size } = request.body;

        // Validate input
        if (!userId || !itemId || !size) {
            return response.status(400).json({ success: false, message: "Invalid input" });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Check if user exists
        if (!userData) {
            return response.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Update cart logic
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        // Save updated cart to DB
        await userModel.findByIdAndUpdate(userId, { cartData });

        response.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const updateCart = async (request, response)=>{
    try {
        const { userId, itemId, size, quantity } = request.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        response.json({ success: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error);
        response.json({ message: false, message: error.message });
        
    }

};

const getUserCart = async (request, response)=>{
    try {
        const { userId } = request.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        response.json({ message: true, message: "Cart fetched" });

    } catch (error) {
        console.log(error);
        response.json({ message: false, message: error.message });
    }

};

export {
    addToCart,
    updateCart,
    getUserCart,
};

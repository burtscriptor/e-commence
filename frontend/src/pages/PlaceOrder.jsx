import { React, useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('Cod');
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 py-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        {/* Title */}
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Name Inputs */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        {/* Street Input */}
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        {/* Address Inputs */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/* Zip Code and Country Inputs */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Post/Zip code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        {/* Phone Input */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
      </div>

      {/* Right Side - Cart Total */}
      <div className="mt-8 sm:mt-0">
        <div className="min-w-80">
          <CartTotal />
        </div>
        <div className="mt-8">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/*-------Payment Selection --------- */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`} />
                <img src={assets.stripe_logo} className="h-5 mx-4" />
              </div>
              <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} />
                <img src={assets.razorpay_logo} className="h-5 mx-4" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
                <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button onClick={() => navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

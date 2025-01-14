import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency, backendURL, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async(token)=> {
    console.log(token)
    
    try {
      if(!token){
        console.log('no token');
        return null;
      }
      const response = await axios.post(backendURL + '/api/order/userorders', {}, {headers: {token}});
     
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
      
    }
  }

  useEffect(()=> {
    loadOrderData(token);
  
  }, [token]);

  return (
    <div className='border-t pt-16'>
      {/* Title */}
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders List */}
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            {/* Product Details */}
            <div className='flex items-start gap-6 text-sm'>
              <img src={item.images[0]} alt={item.name} className='w-16 sm:w-20' />

              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 text-base text-gray-400'>
                  <p className='text-lg'>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: Medium</p>
                </div>
                <p className='mt-8'>
                  Date: <span className='text-gray-400'>25, July 2024</span>
                </p>
              </div>
            </div>

            {/* Shipping Status and Action */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm text-base'>Ready to ship</p>
              </div>
              <button
                type='button'
                className='border px-4 py-2 text-sm font-medium rounded-sm'
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

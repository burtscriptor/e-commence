import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { currency, backendURL, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async(token)=> {
    
    try {
      if(!token){
        return null;
      }
      const response = await axios.post(backendURL + '/api/order/userorders', {}, {headers: {token}});
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
        
      } 
      
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
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2'>
                  Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span>
                </p>
                <p className='mt-2'>
                  Payment: <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Shipping Status and Action */}
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm text-base'>{item.status}</p>
              </div>
              <button
              onClick={loadOrderData}
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

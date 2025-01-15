import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';


const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders=async(token)=>{
    console.log(token);

    if (!token) {
      return null;
      
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, {headers:{token}});
      console.log(response.data)
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchAllOrders(token);
  }, [token])

  return (
    <div>
      
    </div>
  )
}

export default Orders

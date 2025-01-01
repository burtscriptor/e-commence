import { React, useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    console.log(currentState);
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendURL + "/api/user/register", {name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else {
          toast.error(response.data.message);
        }
        
      } else {
        const response = await axios.post(backendURL + "/api/user/login", {email, password});
       if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
       } else {
        toast.error(response.data.message);
       }

      }
      
    } catch (error) {
      console.log(error);
     toast.error(error.message);
      
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/');
    }

  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? '' : (
        <div className="w-full">
          <label htmlFor="name" className="block text-sm text-gray-600">Name</label>
          <input 
            onChange={(event)=>setName(event.target.value)}
            value={name}
            id="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-800" 
            placeholder="Name" 
            required 
          />
        </div>
      )}
      
      <div className="w-full">
        <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
        <input 
          onChange={(event)=>setEmail(event.target.value)}
          value={email}
          id="email"
          type="email"
          className="w-full px-3 py-2 border border-gray-800" 
          placeholder="Email" 
          required 
        />
      </div>

      <div className="w-full">
        <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
        <input 
          onChange={(event)=>setPassword(event.target.value)}
          value={password}
          id="password"
          type="password"
          className="w-full px-3 py-2 border border-gray-800" 
          placeholder="Password" 
          required 
        />
      </div>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login' ? (
            <p className="cursor-pointer" onClick={() => setCurrentState('Sign Up')}>Create account</p>
          ) : (
            <p className="cursor-pointer" onClick={() => setCurrentState('Login')}>Login Here</p>
          )
        }
      </div>

      <button type="submit" className="bg-black text-white font-light py-2 px-8 mt-4">
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;

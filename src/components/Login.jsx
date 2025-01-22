import React from 'react';
import { useForm } from 'react-hook-form';
import {useLoginUserMutation } from '../redux/features/userApi'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } ,reset } = useForm();
  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginUserMutation();
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.msgcode === 'RESTAPI200') {
        localStorage.setItem('token', response.token);
        reset();
        user();
        function user(){
          navigate('/user');
        }
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.error || 'An error occurred. Please try again.',
        });
      }
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };
  return (
    <div className="">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

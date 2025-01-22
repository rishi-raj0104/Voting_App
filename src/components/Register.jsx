import React from 'react';
import { useForm } from 'react-hook-form';
import {useSignupUserMutation } from '../redux/features/userApi'
import Swal from 'sweetalert2';

const Register = ({ setIsLogin }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [signupUser, { isLoading, isSuccess, isError, error }] = useSignupUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await signupUser(data).unwrap();
      if (response.msgcode === 'RESTAPI200') {
        alert('Registration successful!');
        reset();
        setIsLogin(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.error || 'An error occurred. Please try again.',
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('age', { required: 'Age is required' })}
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Mobile</label>
        <input
          type="text"
          placeholder="Enter your mobile number"
          maxLength="10"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('mobile')}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Aadhar Card Number</label>
        <input
          type="text"
          placeholder="Enter your Aadhar Card number"
          maxLength="12"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('aadharCardNumber', { 
            required: 'Aadhar Card number is required',
            pattern: {
              value: /^\d{12}$/,
              message: 'Aadhar Card number must be 12 digits'
            }
          })}
        />
        {errors.aadharCardNumber && <p className="text-red-500 text-sm">{errors.aadharCardNumber.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
      >
        Register
      </button>
    </form>
    </>
  );
};

export default Register;

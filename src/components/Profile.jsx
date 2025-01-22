import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserProfileQuery, useUpdateUserPasswordMutation } from '../redux/features/userApi';
import { setUser, clearUser } from '../redux/features/userSlice';
import { useSelector ,useDispatch } from 'react-redux';
const Profile = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const { data, isLoading, isSuccess, isError, error , refetch } = useGetUserProfileQuery();
  const [updatePassword, { isLoading: passwordLoading, isError: passwordError, isSuccess: passwordSuccess, error: passwordErrorData }] = useUpdateUserPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isLoading && !isError) {
      refetch();
    }
    if (isSuccess && data) {
      dispatch(
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          age : data.user.age,
          mobile : data.user.mobile,
          address : data.user.address,
          aadharCardNumber : data.user.aadharCardNumber
        })
      );
      setUserProfile(data.user);
      
    }
  }, [isSuccess, data]);

  const onSubmit = async (formData) => {
    const { currentPassword, newPassword } = formData;
    const userId = userProfile?._id;
    try {
      await updatePassword({ userId, currentPassword, newPassword  }).unwrap();
      reset();
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  const currentPassword = watch('currentPassword');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');
  const isButtonDisabled = !currentPassword || !newPassword || !confirmPassword;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || 'Something went wrong!'}</div>;
  }

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>
        {/* Responsive Grid with 3 inputs per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={userProfile?.name || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={userProfile?.email || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Age</label>
            <input
              type="text"
              value={userProfile?.age || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Mobile</label>
            <input
              type="text"
              value={userProfile?.mobile || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              type="text"
              value={userProfile?.address || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Aadhar Card Number</label>
            <input
              type="text"
              value={userProfile?.aadharCardNumber || ''}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Current Password</label>
            <input
              type="password"
              {...register('currentPassword', { required: 'Current password is required' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <input
              type="password"
              {...register('newPassword', { required: 'New password is required' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm new password is required',
                validate: (value) =>
                  value ===
                  (document.querySelector('[name="newPassword"]').value ||
                    '') || 'Passwords must match',
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${
              isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={isButtonDisabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

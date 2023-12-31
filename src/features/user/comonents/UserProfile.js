import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addUserAddressAsync,
  deleteUserAddressAsync,
  fetchLoggedInUserAddressesAsync,
  selectLoggedInUserAddresses,
  selectUserInfo,
  updateUserAddressAsync,
} from '../userSlice';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser } from '../../auth/authSlice';

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const userRole = useSelector(selectLoggedInUser);
  const addresses = useSelector(selectLoggedInUserAddresses);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const handleEdit = (addressUpdate, index, addressId) => {
    // const newUser = { ...user, addresses: [...user.addresses] }; //for shallow copy
    // newUser.addresses.splice(index, 1, addressUpdate);
    // dispatch(updateUserAsync(newUser));
    const userId = userRole.id;
    const updatedAdd = { ...addressUpdate, userId };
    updatedAdd.id = addressId;
    dispatch(updateUserAddressAsync(updatedAdd));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index, addressId) => {
    dispatch(deleteUserAddressAsync(addressId));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = addresses[index];
    setValue('firstName', address.firstName);
    setValue('lastName', address.lastName);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pinCode', address.pinCode);
  };

  const handleAdd = (address) => {
    //const newUser = { ...user, addresses: [...user.addresses, address] }; //for shallow copy
    const userId = userRole.id;
    const newAdd = { ...address, userId };
    dispatch(addUserAddressAsync(newAdd));
    dispatch(fetchLoggedInUserAddressesAsync(userRole.id));
    setShowAddAddressForm(false);
  };

  useEffect(() => {
    dispatch(fetchLoggedInUserAddressesAsync(userRole.id));
  }, []);

  return (
    <div>
      <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
          <h1 className='text-4xl my-1 font-bold tracking-tight text-gray-500'>
            Name: {user.firstName ? user.firstName : 'First Name'}{' '}
            {user.lastName ? user.lastName : 'Last Name'}
          </h1>
          <h3 className='text-xl my-1 font-bold tracking-tight text-blue-500'>
            Email Address : {user.userEmail}
          </h3>
          {userRole.role === 'Admin' && (
            <h3 className='text-xl my-1 font-bold tracking-tight text-blue-500'>
              Role : {userRole.role}
            </h3>
          )}
        </div>

        <div className='border-t border-gray-200 px-4 py-3 sm:px-6'>
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type='submit'
            className='rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className='bg-white px-5 py-12 mt-12'
              noValidate
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
            >
              <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
                    Personal Information
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        First name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('firstName', {
                            required: 'First name is required',
                          })}
                          id='firstName'
                          autoComplete='given-name'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Last name
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('lastName', {
                            required: 'Last name is required',
                          })}
                          id='lastName'
                          autoComplete='family-name'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Email address
                      </label>
                      <div className='mt-2'>
                        <input
                          id='email'
                          {...register('email', {
                            required: 'Email is required',
                          })}
                          type='email'
                          autoComplete='email'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Phone
                      </label>
                      <div className='mt-2'>
                        <input
                          type='number'
                          {...register('phone', {
                            required: 'Phone number is required',
                          })}
                          id='phone'
                          autoComplete='phone'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Street address
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('street', {
                            required: 'Street is required',
                          })}
                          id='street'
                          autoComplete='street'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2 sm:col-start-1'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        City
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('city', {
                            required: 'City is required',
                          })}
                          id='city'
                          autoComplete='city'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='state'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        State / Province
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('state', {
                            required: 'State is required',
                          })}
                          id='state'
                          autoComplete='state'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='pinCode'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        ZIP / Postal code
                      </label>
                      <div className='mt-2'>
                        <input
                          type='text'
                          {...register('pinCode', {
                            required: 'PinCode is required',
                          })}
                          id='pinCode'
                          autoComplete='pinCode'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                  <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <p className='mt-4 text-lg text-gray-500'>Your Addresses</p>
          {addresses &&
            addresses.map((address, index) => (
              <div>
                {selectedEditIndex === index ? (
                  <form
                    className='bg-white px-5 py-12 mt-12'
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index, address.id);
                      reset();
                    })}
                  >
                    <div className='space-y-12'>
                      <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-2xl font-semibold leading-7 text-gray-900'>
                          Delivery Address
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                          <div className='sm:col-span-3'>
                            <label
                              htmlFor='firstName'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              First name
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('firstName', {
                                  required: 'First name is required',
                                })}
                                id='firstName'
                                autoComplete='given-name'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-3'>
                            <label
                              htmlFor='lastName'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Last name
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('lastName', {
                                  required: 'Last name is required',
                                })}
                                id='lastName'
                                autoComplete='family-name'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-4'>
                            <label
                              htmlFor='email'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Email address
                            </label>
                            <div className='mt-2'>
                              <input
                                id='email'
                                {...register('email', {
                                  required: 'Email is required',
                                })}
                                type='email'
                                autoComplete='email'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-3'>
                            <label
                              htmlFor='phone'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Phone
                            </label>
                            <div className='mt-2'>
                              <input
                                type='tel'
                                {...register('phone', {
                                  required: 'Phone number is required',
                                })}
                                id='phone'
                                autoComplete='phone'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='col-span-full'>
                            <label
                              htmlFor='street-address'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Street address
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('street', {
                                  required: 'Street is required',
                                })}
                                id='street'
                                autoComplete='street'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-2 sm:col-start-1'>
                            <label
                              htmlFor='city'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              City
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('city', {
                                  required: 'City is required',
                                })}
                                id='city'
                                autoComplete='city'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-2'>
                            <label
                              htmlFor='state'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              State / Province
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('state', {
                                  required: 'State is required',
                                })}
                                id='state'
                                autoComplete='state'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>

                          <div className='sm:col-span-2'>
                            <label
                              htmlFor='pinCode'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              ZIP / Postal code
                            </label>
                            <div className='mt-2'>
                              <input
                                type='text'
                                {...register('pinCode', {
                                  required: 'PinCode is required',
                                })}
                                id='pinCode'
                                autoComplete='pinCode'
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <button
                          onClick={(e) => setSelectedEditIndex(-1)}
                          type='submit'
                          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <div className='flex justify-between gap-x-6 px-5 py-5 border-2 border-gray-500'>
                  <div className='flex min-w-0 gap-x-4'>
                    <div className='min-w-0 flex-auto'>
                      <p className='text-sm font-semibold leading-6 text-gray-900'>
                        {address.firstName} {address.lastName}
                      </p>
                      <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                        {address.street}
                      </p>
                      <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                        {address.city}
                      </p>
                      <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                        {address.state}
                      </p>
                    </div>
                  </div>
                  <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                    <p className='text-sm leading-6 text-gray-900'>
                      Pincode: {address.pinCode}
                    </p>
                    <p className='text-sm leading-6 text-gray-900'>
                      Phone: {address.phone}
                    </p>
                  </div>
                  <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                    <button
                      type='button'
                      onClick={(e) => handleEditForm(index)}
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={(e) => handleRemove(e, index, address.id)}
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

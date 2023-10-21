import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from '../userSlice';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div>
          <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <h1 className='text-4xl my-2 font-bold tracking-tight text-gray-900'>
                Order #{order.id}
              </h1>
              <h3 className='text-xl my-2 font-bold tracking-tight text-blue-900'>
                Order Status : {order.status}
              </h3>
              <div className='flow-root'>
                <ul role='list' className='-my-6 divide-y divide-gray-200'>
                  {order.details.map((item) => (
                    <li key={item.id} className='flex py-6'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          src={item.medicine.image}
                          alt={item.medicine.name}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <p className='ml-4'>{item.medicine.name}</p>
                            </h3>

                            <p className='ml-4'>
                              <span>&#8377;</span>
                              {item.medicine.price}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <div className='text-gray-900'>
                            <h3>
                              <p className='ml-4'>Quantity: {item.quantity}</p>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                <p>Total</p>
                <p>
                  <span>&#8377;</span> {order.totalAmount}
                </p>
              </div>
              <div className='flex justify-between my-2 text-base font-medium text-gray-900'>
                <p>Total Items in Order</p>
                <p>{order.totalItems} items</p>
              </div>
            </div>
            <p className='mt-0.5 text-sm text-gray-500'>Delivery Address</p>
            <div className='flex justify-between gap-x-6 px-5 py-5 border-2 border-gray-200'>
              <div className='flex min-w-0 gap-x-4'>
                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {order.address.street}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {order.address.city}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {order.address.state}
                  </p>
                </div>
              </div>
              <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm leading-6 text-gray-900'>
                  Pincode: {order.address.pinCode}
                </p>
                <p className='text-sm leading-6 text-gray-900'>
                  Phone: {order.address.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

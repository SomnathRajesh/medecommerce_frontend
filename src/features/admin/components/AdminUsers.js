import { useEffect, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../../app/constant';
import { useDispatch, useSelector } from 'react-redux';

import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';
import { fetchAllUsersAsync, selectAllUsers } from '../../user/userSlice';
import { fetchAllOrdersAsync } from '../../order/orderSlice';

function AdminUsers() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const users = useSelector(selectAllUsers);
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {};
  const handleUpdate = (e, order) => {
    // const updatedOrder = { ...order, status: e.target.value };
    // dispatch(updateOrderAsync(updatedOrder));
    // setEditableOrderId(-1);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  useEffect(() => {
    //const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  //   const chooseColor = (status) => {
  //     switch (status) {
  //       case 'pending':
  //         return 'bg-purple-200 text-purple-600';
  //       case 'dispatched':
  //         return 'bg-yellow-200 text-yellow-600';
  //       case 'delivered':
  //         return 'bg-green-200 text-green-600';
  //       case 'cancelled':
  //         return 'bg-red-200 text-red-600';
  //       default:
  //         return 'bg-purple-200 text-purple-600';
  //     }
  //   };
  return (
    <>
      {/* component */}
      <div className='overflow-x-auto'>
        <div className=' flex items-center justify-center bg-gray-100 font-sans overflow-hidden'>
          <div className='w-full'>
            <div className='bg-white shadow-md rounded my-6'>
              <table className='min-w-max w-full table-auto'>
                <thead>
                  <tr className='cursor-pointer bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th
                      className='py-3 px-6 text-left'
                      onClick={(e) =>
                        handleSort({
                          sort: 'id',
                          order: sort._order == 'asc' ? 'desc' : 'asc',
                        })
                      }
                    >
                      User Id
                      {/* {sort._sort === 'id' &&
                        (sort._order === 'asc' ? (
                          <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>
                        ))} */}
                    </th>
                    <th className='py-3 px-6 text-left'>Email</th>
                    <th className='py-3 px-6 text-center'>Role</th>
                    <th className='py-3 px-6 text-center'>Addresses</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {users.map((user) => (
                    <tr className='border-b border-gray-200 hover:bg-gray-100'>
                      <td className='py-3 px-6 text-left whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='mr-2'></div>
                          <span className='font-medium'>{user.id}</span>
                        </div>
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <div className='flex items-center justify-center'>
                          {user.email}
                        </div>
                      </td>
                      <td className='py-3 px-6 text-center'>
                        <div className='flex items-center justify-center'>
                          {user.role}
                        </div>
                      </td>
                      <td className='py-3 px-6 text-left'>
                        {user.addresses.map((address) => (
                          <div className=''>
                            <div>
                              <strong>{address.firstName}</strong>{' '}
                              <strong>{address.lastName}</strong>
                            </div>
                            <div>{address.street},</div>
                            <div>{address.city},</div>
                            <div>{address.state},</div>
                            <div>{address.pinCode},</div>
                            <div>{address.phone}</div>
                          </div>
                        ))}
                      </td>

                      {/* <td className='py-3 px-6 text-center'>
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value='pending'>Pending</option>
                            <option value='dispatched'>Dispatched</option>
                            <option value='delivered'>Delivered</option>
                            <option value='cancelled'>Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td> */}
                      <td className='py-3 px-6 text-center'>
                        <div className='flex item-center justify-center'>
                          <div className='w-6 mr-4 transform hover:text-purple-500 hover:scale-110'>
                            <EyeIcon
                              className='w-8 h-8'
                              onClick={(e) => handleShow(user)}
                            ></EyeIcon>
                          </div>
                          <div className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'>
                            <PencilIcon
                              className='w-8 h-8'
                              onClick={(e) => handleEdit(user)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={users.length}
        ></Pagination> */}
      </div>
    </>
  );
}

export default AdminUsers;

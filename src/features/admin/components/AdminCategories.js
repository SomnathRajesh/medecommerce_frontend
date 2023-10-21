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
import { selectAllCategories } from '../../productList/productSlice';
import { Link } from 'react-router-dom';

function AdminCategories() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const categories = useSelector(selectAllCategories);
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

  return (
    <>
      {/* component */}
      <div className='my-4 lg:col-span-3'>
        <div>
          <Link
            to='/admin/category-form'
            className='rounded-md mx-9 my-5 bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add Category
          </Link>
        </div>
      </div>
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
                      Category ID
                      {sort._sort === 'id' &&
                        (sort._order === 'asc' ? (
                          <ArrowUpIcon className='w-4 h-4 inline'></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className='w-4 h-4 inline'></ArrowDownIcon>
                        ))}
                    </th>
                    <th className='py-3 px-6 text-center'>Category</th>
                    <th className='py-3 px-6 text-center'>Deleted</th>
                    <th className='py-3 px-6 text-center'>Edit</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {categories
                    .filter((category) => {
                      return category;
                    })
                    .sort((a, b) => {
                      if (sort._sort === 'id') {
                        if (sort._order === 'asc') {
                          return a.id - b.id;
                        } else if (sort._order === 'desc') {
                          return b.id - a.id;
                        }
                      }
                      return 0;
                    })
                    .map((category) => (
                      <tr className='border-b border-gray-200 hover:bg-gray-100'>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center'>
                            <span className='font-medium'>{category.id}</span>
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            {category.medicineType}
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex items-center justify-center'>
                            {category.deleted ? 'Yes' : 'No'}
                          </div>
                        </td>
                        <td className='py-3 px-6 text-center'>
                          <div className='flex item-center justify-center'>
                            <div className='w-6 mr-2 transform hover:text-purple-500 hover:scale-110'>
                              <Link
                                to={`/admin/category-form/edit/${category.id}`}
                              >
                                <PencilIcon className='w-8 h-8'></PencilIcon>
                              </Link>
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
          totalItems={totalOrders}
        ></Pagination> */}
      </div>
    </>
  );
}

export default AdminCategories;

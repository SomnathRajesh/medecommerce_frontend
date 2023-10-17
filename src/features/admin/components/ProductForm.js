import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from '../../productList/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
function ProductForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectAllCategories);
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const [del, setDel] = useState(true);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('category', selectedProduct.category);
      setValue('price', selectedProduct.price);
      setValue('stock', selectedProduct.stock);
      setValue('thumbnail', selectedProduct.thumbnail);
      // if (!selectedProduct.deleted) {
      //   setDel(false);
      // } else {
      //   console.log(selectedProduct.deleted);
      // }
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  const handleCancel = (e) => {
    dispatch(clearSelectedProduct());
    reset();
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.rating = 0;
          product.price = +product.price;
          product.stock = +product.stock;
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating;
            dispatch(updateProductAsync(product));
            reset();
          } else {
            dispatch(createProductAsync(product));
            reset();
          }
        })}
      >
        <div className='space-y-12 bg-white p-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Add Medicine
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {selectedProduct && selectedProduct.deleted && (
                <h2 className='text-red-500'>This product is deleted</h2>
              )}
              <div className='sm:col-span-6'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Medicine Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                    <input
                      type='text'
                      {...register('title', {
                        required: 'Medicine name is required',
                      })}
                      id='title'
                      autoComplete='title'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    id='description'
                    {...register('description', {
                      required: 'Description is required',
                    })}
                    rows={3}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                </div>
              </div>
              <div className='col-span-full'>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Category
                </label>
                <div className='mt-2'>
                  <select
                    {...register('category', {
                      required: 'Category is required',
                    })}
                  >
                    <option value=''>--choose category--</option>
                    {categories.map((category) => (
                      <option value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Price
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                    <input
                      type='number'
                      {...register('price', {
                        required: 'Price is required',
                        min: 1,
                        max: 10000,
                      })}
                      id='price'
                      autoComplete='price'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='stock'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Stock
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                    <input
                      type='number'
                      {...register('stock', {
                        required: 'Stock is required',
                        min: 0,
                      })}
                      id='stock'
                      autoComplete='stock'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='thumbnail'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Image
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                    <input
                      type='text'
                      {...register('thumbnail', {
                        required: 'Image is required',
                      })}
                      id='thumbnail'
                      autoComplete='thumbnail'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <div className='mt-10 space-y-10'>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  By Email
                </legend>
                <div className='mt-6 space-y-6'>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='comments'
                        name='comments'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='comments'
                        className='font-medium text-gray-900'
                      >
                        Comments
                      </label>
                      <p className='text-gray-500'>
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='candidates'
                        name='candidates'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='candidates'
                        className='font-medium text-gray-900'
                      >
                        Candidates
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='offers'
                        name='offers'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label
                        htmlFor='offers'
                        className='font-medium text-gray-900'
                      >
                        Offers
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'
            onClick={handleCancel}
          >
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              type='submit'
              className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Delete
            </button>
          )}
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message='Are you sure you want to remove this medicine?'
          modOption='Delete'
          cancelOption='Cancel'
          modAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        />
      )}
    </>
  );
}

export default ProductForm;

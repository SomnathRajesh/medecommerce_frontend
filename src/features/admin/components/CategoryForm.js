import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  createCategoryAsync,
  selectAllCategories,
  updateCategoryAsync,
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
  const [openModal, setOpenModal] = useState(null);

  //   useEffect(() => {
  //     if (params.id) {
  //       dispatch(fetchProductByIdAsync(params.id));
  //     } else {
  //       dispatch(clearSelectedProduct());
  //     }
  //   }, [params.id, dispatch]);

  //   useEffect(() => {
  //     if (selectedProduct && params.id) {
  //       setValue('title', selectedProduct.title);
  //       setValue('description', selectedProduct.description);
  //       setValue('category', selectedProduct.category);
  //       setValue('price', selectedProduct.price);
  //       setValue('stock', selectedProduct.stock);
  //       setValue('thumbnail', selectedProduct.thumbnail);
  //       // if (!selectedProduct.deleted) {
  //       //   setDel(false);
  //       // } else {
  //       //   console.log(selectedProduct.deleted);
  //       // }
  //     }
  //   }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    //   const product = { ...selectedProduct };
    //   product.deleted = true;
    //   dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const category = { ...data };
          if (params.id) {
            category.id = params.id;
            dispatch(updateCategoryAsync(category));
            reset();
          } else {
            dispatch(createCategoryAsync(category));
            reset();
          }
        })}
      >
        <div className='space-y-12 bg-white p-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Add Category
            </h2>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Category Name
                </label>
                <div className='mt-2'>
                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 '>
                    <input
                      type='text'
                      {...register('label', {
                        required: 'Category name is required',
                      })}
                      id='label'
                      autoComplete='label'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </button>
          {/* {selectedProduct && !selectedProduct.deleted && ( */}
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
          {/* )} */}
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </form>
      {/* {selectedProduct && ( */}
      <Modal
        title={`Delete ${categories.title}`}
        message='Are you sure you want to remove this medicine?'
        modOption='Delete'
        cancelOption='Cancel'
        modAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal}
      />
      {/* )} */}
    </>
  );
}

export default ProductForm;

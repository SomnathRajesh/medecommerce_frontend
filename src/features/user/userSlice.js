import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addUserAddress,
  deleteUserAddress,
  fetchAllUsers,
  fetchCount,
  fetchLoggedInUser,
  fetchLoggedInUserAddresses,
  fetchLoggedInUserOrders,
  updateUser,
  updateUserAddress,
} from './userAPI';

const initialState = {
  users: [],
  userInfo: null,
  userOrders: [],
  status: 'idle',
  userAddresses: [],
};

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (user) => {
    const response = await fetchLoggedInUser(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAddressesAsync = createAsyncThunk(
  'user/fetchLoggedInUserAddresses',
  async (user) => {
    const response = await fetchLoggedInUserAddresses(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addUserAddressAsync = createAsyncThunk(
  'user/addUserAddress',
  async (user) => {
    const response = await addUserAddress(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  'user/fetchAllUsers',
  async () => {
    const response = await fetchAllUsers();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAddressAsync = createAsyncThunk(
  'user/updateUserAddress',
  async (update) => {
    const response = await updateUserAddress(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteUserAddressAsync = createAsyncThunk(
  'user/deleteUserAddress',
  async (id) => {
    const response = await deleteUserAddress(id);
    // The value we return becomes the `fulfilled` action payload
    return { success: response.success, id };
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.userAddresses.findIndex(
          (item) => item.id === action.payload.id
        );
        state.userAddresses[index] = action.payload;
      })
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchLoggedInUserAddressesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAddressesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userAddresses = action.payload;
      })
      .addCase(addUserAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userAddresses.push(action.payload);
      })
      .addCase(deleteUserAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success) {
          console.log(action.payload);
          state.userAddresses = state.userAddresses.filter(
            (address) => address.id !== action.payload.id
          );
        }
      });
  },
});

export const { increment } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectAllUsers = (state) => state.user.users;
export const selectLoggedInUserAddresses = (state) => state.user.userAddresses;
export default userSlice.reducer;

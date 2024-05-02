import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Store/User-slice';
import adminSlice from './Store/Admin-slice';
import bookSlice from './Store/Book-slice';
import borrowSlice from './Store/Borrow-slice';
export const store=configureStore({
    reducer:{
        users:userSlice.reducer,
        admins:adminSlice.reducer,
        books:bookSlice.reducer,
        borrows:borrowSlice.reducer,
    },
});
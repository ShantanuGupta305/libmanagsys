import { createSlice } from "@reduxjs/toolkit";
const getLocalData=()=>{
    const savedBorrows=localStorage.getItem("myBorrows");
    if(savedBorrows){
      return JSON.parse(savedBorrows);
    }
    else{
      return [];
    }
}
let initialState={
    borrows:getLocalData(),
};
const borrowSlice=createSlice({
    name:'borrows',
    initialState,
    reducers:{
        issueBook:(state,action)=>{
            let newIssue={
                username:action.payload.username,
                bookName:action.payload.bookName,
            };
            state.borrows.push(newIssue);
            localStorage.setItem("myBorrows",JSON.stringify(state.borrows));
        },
        returnBook:(state,action)=>{
            state.borrows=state.borrows.filter((borrow)=>(borrow.username!==action.payload.username || borrow.bookName!==action.payload.bookName));
            localStorage.setItem("myBorrows",JSON.stringify(state.borrows));
        },
        onEditAndDeleteBorrowedBook:(state,action)=>{
            state.borrows=state.borrows.filter((borrow)=>borrow.bookName!==action.payload.bookName);
            localStorage.setItem("myBorrows",JSON.stringify(state.borrows));
        },
    },
});
export const borrowAction=borrowSlice.actions;
export default borrowSlice;
import React from 'react'
import { borrowAction } from '../Store/Borrow-slice';
import { bookAction } from '../Store/Book-slice';
import { useDispatch, useSelector } from 'react-redux';
const Books = ({book,username}) => {
  const dispatch=useDispatch();
  let {borrows}=useSelector(state=>state.borrows);
  const {issueBook}=borrowAction;
  const {decBook}=bookAction;
  let {bookName,totalCount,avalCount}=book;
  const handleBorrow=()=>{
    let issuedBefore=false;
    borrows=borrows.map((borrow)=>{
      if(borrow.username===username && borrow.bookName===bookName){
        issuedBefore=true;
      }
      return borrow;
    });
    if(issuedBefore){
      console.log("Book already issued by the user");
    }
    else{
      if(avalCount===0){
        console.log("All quantity issued before");
      }
      else{
        avalCount=avalCount-1;
        dispatch(decBook({bookName,avalCount}));
        dispatch(issueBook({username,bookName}));
      }
    }
  }
  return (
    <div>
        <div>
            <span>Book Name:{bookName} </span>
            <span>Total:{totalCount} </span>
            <span>Available:{avalCount} </span>
        </div>
        <div>
            <button onClick={handleBorrow}>Borrow</button>
        </div>
    </div>
  )
}

export default Books
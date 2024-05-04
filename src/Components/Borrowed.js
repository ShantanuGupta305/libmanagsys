import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bookAction } from '../Store/Book-slice';
import { borrowAction } from '../Store/Borrow-slice';

const Borrowed = ({borrow}) => {
  let {books}=useSelector(state=>state.books);
  const dispatch=useDispatch();
  const {incBook}=bookAction;
  const {returnBook}=borrowAction;
  const {bookName,username}=borrow;
  const handleReturn=()=>{
    dispatch(returnBook({bookName,username}));
    let avalCount=0;
    books=books.map((book)=>{
      if(book.bookName===bookName){
        avalCount=book.avalCount;
      }
      return book;
    });
    avalCount=avalCount+1;
    dispatch(incBook({bookName,avalCount}));
  }
  return (
    <tr>
        <td>{bookName}</td>
        <td><button onClick={handleReturn} style={{background:'green', color:'white', borderRadius:'0.2rem'}}>Return</button></td>
    </tr>
  )
}

export default Borrowed
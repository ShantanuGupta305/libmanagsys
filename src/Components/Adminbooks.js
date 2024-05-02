import React,{useState} from 'react'
import Editbookmodal from './Editbookmodal';
import { bookAction } from '../Store/Book-slice';
import { borrowAction } from '../Store/Borrow-slice';
import { useDispatch } from 'react-redux';
const Adminbooks = ({book}) => {
    const [isEdit,setIsEdit]=useState(false);
    const {bookName,totalCount}=book;
    const dispatch=useDispatch();
    const {removeBook,editBook}=bookAction;
    const {onEditAndDeleteBorrowedBook}=borrowAction;
  return (
    <div>
        <span>Book Name:{bookName}</span>
        <span>Total:{totalCount}</span>
        <div>
            <button onClick={()=>setIsEdit(!isEdit)}>Edit</button>
            <button onClick={()=>{
              dispatch(removeBook({bookName}));
              // console.log(`delete button pressed ${bookName}`);
              dispatch(onEditAndDeleteBorrowedBook({bookName}));
            }}>Delete</button>
        </div>
        {isEdit && <Editbookmodal setIsEdit={setIsEdit} bookName={bookName} onEditAndDeleteBorrowedBook={onEditAndDeleteBorrowedBook} editBook={editBook}/>}
    </div>
  )
}

export default Adminbooks
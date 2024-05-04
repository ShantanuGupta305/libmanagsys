import React,{useState} from 'react'
import Editbookmodal from './Editbookmodal';
import { bookAction } from '../Store/Book-slice';
import { borrowAction } from '../Store/Borrow-slice';
import { useDispatch } from 'react-redux';
const Adminbooks = ({book,isAdd}) => {
    const [isEdit,setIsEdit]=useState(false);
    const {bookName,totalCount}=book;
    const dispatch=useDispatch();
    const {removeBook,editBook}=bookAction;
    const {onEditAndDeleteBorrowedBook}=borrowAction;
  return (
    <>
    <tr>
        <td>{bookName}</td>
        <td>{totalCount}</td>
        <td><button onClick={()=>setIsEdit(!isEdit)} disabled={isAdd || isEdit} style={{background:'green', color:'white', borderRadius:'0.2rem'}}>Edit</button></td>
        <td><button onClick={()=>{
              dispatch(removeBook({bookName}));
              dispatch(onEditAndDeleteBorrowedBook({bookName}));
            }} disabled={isAdd || isEdit} style={{background:'red', color:'white', borderRadius:'0.2rem'}}>Delete</button></td>
    </tr>
    {isEdit && <tr><td colSpan={4}><Editbookmodal setIsEdit={setIsEdit} bookName={bookName} onEditAndDeleteBorrowedBook={onEditAndDeleteBorrowedBook} editBook={editBook} isAdd={isAdd}/></td></tr>}
    </>
  )
}

export default Adminbooks
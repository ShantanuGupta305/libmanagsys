import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Editbookmodal = ({setIsEdit,bookName,onEditAndDeleteBorrowedBook,editBook}) => {
  const [totalCount,setTotalCount]=useState(1);
  const dispatch=useDispatch();
  const handleEdit=(e)=>{
    e.preventDefault();
    if(totalCount<1){
      console.log("Book count not less than 1");
      setTotalCount(1);
      return;
    }
    else{
      dispatch(onEditAndDeleteBorrowedBook({bookName}));
      dispatch(editBook({bookName,totalCount}));
      setTotalCount(1);
      setIsEdit(false);
    }
  }
  return (
    <div>
        <div>
            <p>Edit Book:<span>{bookName}</span></p>
            <button onClick={()=>setIsEdit(false)}>Close</button>
        </div>
        <form onSubmit={handleEdit}>
            <label>Book Quantity</label>
            <input type='number' placeholder='1' value={totalCount} onChange={(e)=>setTotalCount(e.target.value)} required/>
            <button type='submit'>Edit</button>
        </form>
    </div>
  )
}

export default Editbookmodal
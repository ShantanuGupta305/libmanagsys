import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { bookAction } from '../Store/Book-slice';
const Addbookmodal = ({setIsAdd}) => {
  const [bookName,setBookName]=useState('');
  const [totalCount,setTotalCount]=useState(1);
  const dispatch=useDispatch();
  let {books}=useSelector(state=>state.books);
  const {addBook}=bookAction;
  const handleAdd=(e)=>{
    e.preventDefault();
    if(totalCount<1){
      setTotalCount(1);
      console.log("count of books cannot be less than 1");
      return;
    }
    let isAdded=false;
    books=books.map((book)=>{
      if(book.bookName===bookName){
        isAdded=true;
      }
      return book;
    });
    if(isAdded){
      console.log("Book is already added");
      setBookName('');
      setTotalCount(1);
      return;
    }
    else{
      dispatch(addBook({bookName,totalCount}));
      setBookName('');
      setTotalCount(1);
      setIsAdd(false);
    }
  }
  return (
    <div>
        <div>
            <p>Add Book</p>
            <button onClick={()=>setIsAdd(false)}>Close</button>
        </div>
        <form onSubmit={handleAdd}>
            <label>Book Name</label>
            <input type='text' placeholder='book name' value={bookName} onChange={(e)=>setBookName(e.target.value)} required/>
            <label>Quantity</label>
            <input type='number' placeholder='1' value={totalCount} onChange={(e)=>setTotalCount(e.target.value)} required/>
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Addbookmodal
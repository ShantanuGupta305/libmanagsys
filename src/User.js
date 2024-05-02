import React, { useEffect } from 'react'
import Books from './Components/Books'
import Borrowed from './Components/Borrowed'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { userAction } from './Store/User-slice'
import { bookAction } from './Store/Book-slice'
import { borrowAction } from './Store/Borrow-slice'
import { adminAction } from './Store/Admin-slice'
const User = () => {
  const {username}=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  let {admins}=useSelector(state=>state.admins);
  let {users}=useSelector(state=>state.users);
  let {books}=useSelector(state=>state.books);
  let {borrows}=useSelector(state=>state.borrows);
  const {deleteUser,logoutUser}=userAction;
  const {logoutAdmin}=adminAction;
  const {incBook}=bookAction;
  const {returnBook}=borrowAction;
  const handleDeleteUser=()=>{
    dispatch(deleteUser({username}));
    borrows=borrows.map((borrow)=>{
      if(borrow.username===username){
        let bookName=borrow.bookName;
        dispatch(returnBook({username,bookName}));
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
    });
    navigate('/');
  }
  useEffect(()=>{
    let registered=false;
    users=users.map((user)=>{
      if(user.username===username){
        registered=true;
      }
      return user;
    });
    if(!registered){
      console.log(`user ${username} not registered`);
      navigate('/');
    }
    else{
      let bool=false,login=false;
      users=users.map((user)=>{
        if(user.username===username){
          if(user.isLoggedUser){
            login=true;
          }
        }
        return user;
      });
      admins=admins.map((admin)=>{
        let adminname=admin.adminname;
        dispatch(logoutAdmin({adminname,bool}));
      });
      if(!login){
        console.log(`user ${username} not logged in`);
        navigate('/');
      }
    }
  },[]);
  return (
    <>  
        <div>
          <button onClick={()=>{
            let bool=false;
            dispatch(logoutUser({username,bool}));
            navigate('/');
          }}>Logout</button>
          <button onClick={handleDeleteUser}>Delete User</button>
        </div>
        <div>
            <p>Welcome {username}</p>
            <h1>Books</h1>
            {books.map((book,index)=>{
              return <Books key={index} book={book} username={username}/>
            })}
        </div>
        <div>
            <h1>Borrowed Books</h1>
            {borrows.filter(borrow=>borrow.username===username).map((borrow,index)=>{
              return <Borrowed key={index} borrow={borrow}/>
            })}
        </div>
    </>
  )
}

export default User;
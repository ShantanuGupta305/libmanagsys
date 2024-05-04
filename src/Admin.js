import React,{useState,useEffect} from 'react'
import Adminbooks from './Components/Adminbooks'
import Addbookmodal from './Components/Addbookmodal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminAction } from './Store/Admin-slice';
import { userAction } from './Store/User-slice';
import './CSS/admin.css';
const Admin = () => {
    const [isAdd,setIsAdd]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {adminname}=useParams();
    let {books}=useSelector(state=>state.books);
    let {admins}=useSelector(state=>state.admins);
    let {users}=useSelector(state=>state.users);
    const {deleteAdmin,logoutAdmin}=adminAction;
    const {logoutUser}=userAction;
    useEffect(()=>{
      let registered=false;
      admins=admins.map((admin)=>{
        if(admin.adminname===adminname){
          registered=true;
        }
        return admin;
      });
      if(!registered){
        console.log(`admin ${adminname} not registered`);
        navigate('/');
      }
      else{
        let bool=false,login=false;
        admins=admins.map((admin)=>{
          if(admin.adminname===adminname){
            if(admin.isLoggedAdmin){
              login=true;
            }
          }
          return admin;
        });
        users=users.map((user)=>{
          let username=user.username;
          dispatch(logoutUser({username,bool}));
        });
        if(!login){
          console.log(`admin ${adminname} not logged in`);
          navigate('/');
        }
      }
    },[]);
  return (
    <>
        
            <nav>
              <p>Welcome Admin:{adminname}</p>
              <ul>
                <li onClick={()=>setIsAdd(true)}>Add Book</li>
                <li onClick={()=>{
                  let bool=false;
                  dispatch(logoutAdmin({adminname,bool}));
                  navigate('/');
                }}>Logout</li>
                <li onClick={()=>{
                  dispatch(deleteAdmin({adminname}));
                  console.log(`delete admin ${adminname}`);
                  navigate('/');
                }} style={{color:'red'}}>Delete admin</li>
              </ul>
            </nav>
            {isAdd && <Addbookmodal setIsAdd={setIsAdd}/>}
            {books.length===0 && <h1>No Books Added</h1>}
            {books.length!==0 &&(
              <div className='books-section'>
                <h1>Books</h1>
                <table>
                  <tr>
                    <th>Book Name</th>
                    <th>Total Quantity</th>
                    <th>Edit Action</th>
                    <th>Delete Action</th>
                  </tr>
                  {books.map((book,index)=>{
                    return <Adminbooks key={index} book={book} isAdd={isAdd}/>
                  })}
                </table>
              </div>
            )}
        
    </>
  )
}

export default Admin
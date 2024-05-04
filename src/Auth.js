import React,{useEffect, useState} from 'react'
import { userAction } from './Store/User-slice';
import { useDispatch,useSelector } from 'react-redux';
import { adminAction } from './Store/Admin-slice';
import { useNavigate } from 'react-router-dom';
import './CSS/auth.css';
const Auth = () => {
    const [isLogin,setIsLogin]=useState(true);
    const [isRegister,setIsRegister]=useState(false);
    const [isForgot,setIsForgot]=useState(false);
    const [isUser,setIsUser]=useState(true);
    const [authType,setAuthType]=useState('user');
    const [username,setUsername]=useState('');
    const [adminname,setAdminname]=useState('');
    const [password,setPassword]=useState('');
    const [repassword,setRepassword]=useState('');
    const dispatch=useDispatch();
    let {users}=useSelector(state=>state.users);
    let {admins}=useSelector(state=>state.admins);
    const navigate=useNavigate();
    const {registerUser,changeUserPassword,loginUser,logoutUser}=userAction;
    const {registerAdmin,changeAdminPassword,loginAdmin,logoutAdmin}=adminAction;
    const handleLogin=(e)=>{
        e.preventDefault();
        if(isUser){
            let userExist=false;
            users=users.map((user)=>{
                if(user.username===username){
                    userExist=true;
                }
                return user;
            });
            if(userExist){
                let correctPassword=false;
                users=users.map((user)=>{
                    if(user.username===username){
                        if(user.password===password){
                            correctPassword=true;
                        }
                    }
                    return user;
                });
                if(correctPassword){
                    let bool=true;
                    dispatch(loginUser({username,bool}));
                    navigate(`/user/${username}`);
                }
                else{
                    console.log("Enter correct password");
                }
            }
            else{
                console.log("User not registered");
            }
            setUsername('');
            setPassword('');
        }
        else{
            let adminExist=false;
            admins=admins.map((admin)=>{
                if(admin.adminname===adminname){
                    adminExist=true;
                }
                return admin;
            });
            if(adminExist){
                let correctPassword=false;
                admins=admins.map((admin)=>{
                    if(admin.adminname===adminname){
                        if(admin.password===password){
                            correctPassword=true;
                        }
                    }
                    return admin;
                });
                if(correctPassword){
                    let bool=true;
                    dispatch(loginAdmin({adminname,bool}));
                    navigate(`/admin/${adminname}`);
                }
                else{
                    console.log("Enter correct password");
                }
            }
            else{
                console.log("Admin not registered");
            }
            setAdminname('');
            setPassword('');
        }
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        if(repassword!==password){
            console.log("Password doesnot match");
            setRepassword('');
            return;
        }
        if(isUser){
            let userExist=false;
            users=users.map((user)=>{
                if(user.username===username){
                    userExist=true;
                }
                return user;
            });
            if(userExist){
                console.log("User already registered");
            }
            else{
                dispatch(registerUser({username,password}));
            }
            setUsername('');
            setPassword('');
            setRepassword('');
        }
        else{
            let adminExist=false;
            admins=admins.map((admin)=>{
                if(admin.adminname===adminname){
                    adminExist=true;
                }
                return admin;
            });
            if(adminExist){
                console.log("Admin already registered");
            }
            else{
                dispatch(registerAdmin({adminname,password}));
            }
            setAdminname('');
            setPassword('');
            setRepassword('');
        }
    }
    const handleForgot=(e)=>{
        e.preventDefault();
        if(repassword!==password){
            console.log("Password doesnot match");
            setRepassword('');
            return;
        }
        if(isUser){
            let userExist=false;
            users=users.map((user)=>{
                if(user.username===username){
                    userExist=true;
                }
                return user;
            });
            if(userExist){
                dispatch(changeUserPassword({username,password}));   
            }
            else{
                console.log("User not registered");
            }
            setUsername('');
            setPassword('');
            setRepassword('');
        }
        else{
            let adminExist=false;
            admins=admins.map((admin)=>{
                if(admin.adminname===adminname){
                    adminExist=true;
                }
                return admin;
            });
            if(adminExist){
                dispatch(changeAdminPassword({adminname,password}));
            }
            else{
                console.log("Admin not registered");
            }
            setAdminname('');
            setPassword('');
            setRepassword('');
        }
    }
    useEffect(()=>{
        let bool=false;
        users=users.map((user)=>{
            let username=user.username;
            dispatch(logoutUser({username,bool}));
        });
        admins=admins.map((admin)=>{
            let adminname=admin.adminname;
            dispatch(logoutAdmin({adminname,bool}));
        });
    },[]);
  return (
    <div className='authbox'>
        {isLogin && (
            <form className='login' onSubmit={handleLogin}>
                <div className='auth-type'>
                    <label>Login As:</label>
                    <select name='authType' onChange={(e)=>{
                        setAuthType(e.target.value);
                        setIsUser(!isUser);
                    }} value={authType}>
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                    </select>
                </div>
                <label className='form-label'>{isUser?<>UserName</>:<>Adminname</>}</label>
                <input type='text' placeholder={isUser?'username':'adminname'} value={isUser?username:adminname} onChange={(e)=>{
                    if(isUser){
                        setUsername(e.target.value);
                    }
                    else{
                        setAdminname(e.target.value);
                    }
                }} required/>
                <label className='form-label'>Password</label>
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <div className='auth-nav'>
                    <span>
                        Dont't have an account:
                        <span className='nav-span' onClick={()=>{
                            setIsLogin(false);
                            setIsRegister(true);
                        }}>Register </span>
                    </span>
                    <span className='nav-span' onClick={()=>{
                        setIsLogin(false);
                        setIsForgot(true);
                    }}>Forgot Password</span>
                </div>
                <div className='auth-buttons'>
                    <button type='submit' style={{background:'green', color:'white', borderRadius:'0.2rem'}}>Login</button>
                </div>
            </form>
        )}
        {isRegister && (
            <form className='register' onSubmit={handleRegister}>
                <div className='auth-type'>
                    <label>Register As:</label>
                    <select name='authType' onChange={(e)=>{
                        setAuthType(e.target.value);
                        setIsUser(!isUser);
                    }} value={authType}>
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                    </select>
                </div>
                <label className='form-label'>{isUser?<>UserName</>:<>Adminname</>}</label>
                <input type='text' placeholder={isUser?'username':'adminname'} value={isUser?username:adminname} onChange={(e)=>{
                    if(isUser){
                        setUsername(e.target.value);
                    }
                    else{
                        setAdminname(e.target.value);
                    }
                }} required/>
                <label className='form-label'>Password</label>
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <label className='form-label'>Re-type password</label>
                <input type='password' placeholder='password' value={repassword} onChange={(e)=>setRepassword(e.target.value)} required/>
                <div>
                    Have an account:
                    <span className='nav-span' onClick={()=>{
                        setIsRegister(false);
                        setIsLogin(true);
                    }}>Login</span>
                </div>
                <div className='auth-buttons'>
                    <button type='submit' style={{background:'green', color:'white', borderRadius:'0.2rem'}}>Register</button>
                </div>
            </form>
        )}
        {isForgot && (
            <form className='forgot' onSubmit={handleForgot}>
                <div className='auth-type'>
                    <label>Authentication Type:</label>
                    <select name='authType' onChange={(e)=>{
                        setAuthType(e.target.value);
                        setIsUser(!isUser);
                    }} value={authType}>
                        <option value='user'>user</option>
                        <option value='admin'>admin</option>
                    </select>
                </div>
                <label className='form-label'>{isUser?<>UserName</>:<>Adminname</>}</label>
                <input type='text' placeholder={isUser?'username':'adminname'} value={isUser?username:adminname} onChange={(e)=>{
                    if(isUser){
                        setUsername(e.target.value);
                    }
                    else{
                        setAdminname(e.target.value);
                    }
                }} required/>
                <label className='form-label'>New password</label>
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <label className='form-label'>Re-type password</label>
                <input type='password' placeholder='password' value={repassword} onChange={(e)=>setRepassword(e.target.value)} required/>
                <div className='auth-nav'>
                    <span>
                        Don't have an account:
                        <span className='nav-span' onClick={()=>{
                            setIsForgot(false);
                            setIsRegister(true);
                        }}>Register </span>
                    </span>
                    <span>
                        Have an account:
                        <span className='nav-span' onClick={()=>{
                            setIsForgot(false);
                            setIsLogin(true);
                        }}>Login </span>
                    </span>
                </div>
                <div className='auth-buttons'>
                    <button type='submit' style={{background:'green', color:'white', borderRadius:'0.2rem'}}>Submit</button>
                </div>
            </form>
        )}
    </div>
  )
}

export default Auth
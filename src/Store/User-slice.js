import { createSlice } from "@reduxjs/toolkit";
const getLocalData=()=>{
    const savedUsers=localStorage.getItem("myUsers");
    if(savedUsers){
      return JSON.parse(savedUsers);
    }
    else{
      return [];
    }
}
let initialState={
    users:getLocalData(),
};
const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        registerUser:(state,action)=>{
            let newUser={
                isLoggedUser:false,
                username:action.payload.username,
                password:action.payload.password,
            };
            state.users.push(newUser);
            localStorage.setItem("myUsers",JSON.stringify(state.users));
        },
        loginUser:(state,action)=>{
            state.users=state.users.map((user)=>{
                if(user.username===action.payload.username){
                    user.isLoggedUser=action.payload.bool;
                }
                return user;
            });
            localStorage.setItem("myUsers",JSON.stringify(state.users));
        },
        logoutUser:(state,action)=>{
            state.users=state.users.map((user)=>{
                if(user.username===action.payload.username){
                    user.isLoggedUser=action.payload.bool;
                }
                return user;
            });
            localStorage.setItem("myUsers",JSON.stringify(state.users));
        },
        deleteUser:(state,action)=>{
            state.users=state.users.filter(user=>user.username!==action.payload.username);
            localStorage.setItem("myUsers",JSON.stringify(state.users));
        },
        changeUserPassword:(state,action)=>{
            state.users=state.users.map((user)=>{
                if(user.username===action.payload.username){
                    user={
                        ...user,
                        password:action.payload.password,
                    };
                }
                return user;
            });
            localStorage.setItem("myUsers",JSON.stringify(state.users));
        },
    },
});
export const userAction=userSlice.actions;
export default userSlice;
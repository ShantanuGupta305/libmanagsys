import { createSlice } from "@reduxjs/toolkit";
const getLocalData=()=>{
    const savedAdmins=localStorage.getItem("myAdmins");
    if(savedAdmins){
      return JSON.parse(savedAdmins);
    }
    else{
      return [];
    }
}
let initialState={
    admins:getLocalData(),
};
const adminSlice=createSlice({
    name:'admins',
    initialState,
    reducers:{
        registerAdmin:(state,action)=>{
            let newAdmin={
                isLoggedAdmin:false,
                adminname:action.payload.adminname,
                password:action.payload.password,
            };
            state.admins.push(newAdmin);
            localStorage.setItem("myAdmins",JSON.stringify(state.admins));
        },
        loginAdmin:(state,action)=>{
            state.admins=state.admins.map((admin)=>{
                if(admin.adminname===action.payload.adminname){
                    admin={
                        ...admin,
                        isLoggedAdmin:action.payload.bool,
                    };
                }
                return admin;
            });
            localStorage.setItem("myAdmins",JSON.stringify(state.admins));
        },
        logoutAdmin:(state,action)=>{
            state.admins=state.admins.map((admin)=>{
                if(admin.adminname===action.payload.adminname){
                    admin={
                        ...admin,
                        isLoggedAdmin:action.payload.bool,
                    };
                }
                return admin;
            });
            localStorage.setItem("myAdmins",JSON.stringify(state.admins));
        },
        deleteAdmin:(state,action)=>{
            state.admins=state.admins.filter(admin=>admin.adminname!==action.payload.adminname);
            localStorage.setItem("myAdmins",JSON.stringify(state.admins));
        },
        changeAdminPassword:(state,action)=>{
            state.admins=state.admins.map((admin)=>{
                if(admin.adminname===action.payload.adminname){
                    admin={
                        ...admin,
                        password:action.payload.password,
                    };
                }
                return admin;
            });
            localStorage.setItem("myAdmins",JSON.stringify(state.admins));
        },
    },
});
export const adminAction=adminSlice.actions;
export default adminSlice;
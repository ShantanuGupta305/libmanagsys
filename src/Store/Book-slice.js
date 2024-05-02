import { createSlice } from "@reduxjs/toolkit";
const getLocalData=()=>{
    const savedBooks=localStorage.getItem("myBooks");
    if(savedBooks){
      return JSON.parse(savedBooks);
    }
    else{
      return [];
    }
}
let initialState={
    books:getLocalData(),
};
const bookSlice=createSlice({
    name:'books',
    initialState,
    reducers:{
        addBook:(state,action)=>{
            let newBook={
                bookName:action.payload.bookName,
                totalCount:action.payload.totalCount,
                avalCount:action.payload.totalCount,
            };
            state.books.push(newBook);
            localStorage.setItem("myBooks",JSON.stringify(state.books));
        },
        removeBook:(state,action)=>{
            state.books=state.books.filter(book=>book.bookName!==action.payload.bookName);
            localStorage.setItem("myBooks",JSON.stringify(state.books));
        },
        editBook:(state,action)=>{
            state.books=state.books.map((book)=>{
                if(book.bookName===action.payload.bookName){
                    book={
                        ...book,
                        totalCount:action.payload.totalCount,
                        avalCount:action.payload.totalCount,
                    };
                }
                return book;
            });
            localStorage.setItem("myBooks",JSON.stringify(state.books));
        },
        incBook:(state,action)=>{
            state.books=state.books.map((book)=>{
                if(book.bookName===action.payload.bookName){
                    book={
                        ...book,
                        avalCount:action.payload.avalCount,
                    };
                }
                return book;
            });
            localStorage.setItem("myBooks",JSON.stringify(state.books));
        },
        decBook:(state,action)=>{
            state.books=state.books.map((book)=>{
                if(book.bookName===action.payload.bookName){
                    book={
                        ...book,
                        avalCount:action.payload.avalCount,
                    };
                }
                return book;
            });
            localStorage.setItem("myBooks",JSON.stringify(state.books));
        },
    },
});
export const bookAction=bookSlice.actions;
export default bookSlice;
import { toast } from 'react-toastify';
import axios from '../config/axios'
export const GET_BOOK = 'GET_BOOK'
export const GET_BOOKBYID = 'GET_BOOKBYID'
export const ADD_BOOK = 'ADD_BOOK'
export const SEARCH='SEARCH'

// GET /books - Retrieve all books (with pagination)
// GET /books/:id - Retrieve a specific book
// POST /books - Add a new book (admin only)

export const setAddBook = (data) => {
    return {
        type: ADD_BOOK,
        payload: data
    }
}

export const startAddBook = (formdata,toggle) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    
                    const book = await axios.post(`/books`, formdata,{headers:{"Authorization":localStorage.getItem('token'),"Content-Type":"multipart/form-data"}})                    
                    if (book.data._id) {
                        dispatch(setAddBook(book.data))
                        toast.success('Book Added Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                        })
                        toggle()      
                    }
                    else if (book.data.error) {
                        toast.error(book.data.error, {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                        });

                    }
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                    });
                   
                    
                }
            }
        )()
    }
}
//user login and get userinfo
export const setAllBook = (data) => {
    return {
        type: GET_BOOK,
        payload: data
    }
}

export const startGetAllBook = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const book = await axios.get('/books', { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setAllBook(book.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const setGetBookById = (data) => {
    return {
        type: GET_BOOKBYID,
        payload: data
    }
}
export const startGetBookById = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const book = await axios.get(`/books/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
                    dispatch(setGetBookById(book.data))
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                    });
                }
            }
        )()

    }
}

// search
export const setSearch=(data)=>{
    return{
        type:SEARCH,
        payload:data
    }
}
export const startSearchBooks=(search)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const books=await axios.get(`/search/books?search=${search}`,{headers:{'Authorization':localStorage.getItem('token')}})
                    dispatch(setSearch(books.data))
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                    })
                }
            }
        )()
    }
}



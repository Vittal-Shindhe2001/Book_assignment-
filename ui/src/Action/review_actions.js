import { toast } from 'react-toastify';
import axios from '../config/axios';
export const GET_REVIEW='GET_REVIEW'
export const ADD_REVIEW="ADD_REVIEW"

// GET /reviews - Retrieve reviews for a book
// POST /reviews - Submit a new review

export const setReview = (data) => {
    return {
        type: GET_REVIEW,
        payload: data
    }
}
export const startReviews = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    
                    const review = await axios.get(`/reviews?book=${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setReview(review.data))
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

export const setAddReview=(data)=>{
    return{
        type:ADD_REVIEW,
        payload:data
    }
}

export const startAddReview=(formdata,setComment,setFous)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const review=await axios.post(`/reviews`,formdata,{headers:{'Authorization':localStorage.getItem('token')}})
                    dispatch(setAddReview(review.data))
                    setComment(' ')
                    setFous(false)

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
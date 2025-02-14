import { toast } from 'react-toastify';
import axios from '../config/axios';
export const GET_USERBYID = 'GET_USERBYID'
export const UPDATE_USERINFO='UPDATE_USERINFO'

// router.post('/user/signup', count, userController.signup)
// router.post('/user/signin', userController.signin)
// // GET /users/:id - Retrieve user profile
// router.get('/users/:id', authenticateUser,userController.info)
// // PUT /users/:id - Update user profile
// router.put('/users/:id', authenticateUser,userController.update)

export const startRegisterUser = (formdata, history) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    console.log(formdata);
                    
                    const user = await axios.post(`/user/signup`,formdata)
                    console.log('user',user);
                    
                    if (user.data._id) {
                        toast.success('Register Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        history.push('/login')

                    }
                    else if (user.error) {
                        toast.error(user.data.error, {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });

                    }
                } catch (error) {
                    toast.error(error.response.data.error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                       
                        
                        
                }
            }
        )()
    }
}


export const startLoginUser = (formdata,history) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/signin`, formdata)
                    localStorage.setItem('token', user.data.token)
                    if (localStorage.getItem('token') !== 'undefined') {
                        toast.success('Login Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        history.push('/home')
                    } else {
                        // alert('Please Enter valid email or password')
                        toast.error('Please Enter valid email or password', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                            localStorage.clear()
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

//get userinfo
export const setUserInfo = (data) => {
    return {
        type: GET_USERBYID,
        payload: data
    }
}

export const startGetUserInfo = (id) => {
   
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.get(`/users/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setUserInfo(user.data))
    
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

// update userinfo
export const setUpdateUserInfo = (data) => {
    return {
        type: UPDATE_USERINFO,
        payload: data
    }
}

export const startUpdateUserInfo = (id,formdata,toggle) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.put(`/users/${id}`,formdata, { headers: { 'Authorization': localStorage.getItem('token')} })
                    dispatch(setUserInfo(user.data))
                    toggle()
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





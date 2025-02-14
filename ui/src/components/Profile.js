import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserInfo } from '../Action/user_action'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfileUpdate from './ProfileUpdate';

const Profile = ({userId }) => {
    const [modal,setModal]=useState(false)
    const toggle = () => {
        setModal(!modal)
    }
    const [id,setID]=useState()
const userinfo=useSelector(state=>state.user.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetUserInfo(userId))
    }, [userId])
    // handle profile update
    const handleProfile=(id)=>{
        setID(userinfo)
        toggle()
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='card shadow-sm'>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={(userId)=>{handleProfile(userId)}}>Profile Update</button>
                        </div>
                        {
                            userinfo && Object.keys(userinfo).length > 0 && <div> <h1>Name: {userinfo.name}</h1> 
                            <h1>Email:{userinfo.email}</h1>
                            </div>

                        }
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
            <Modal
        show={modal}
        onHide={toggle}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                      <ProfileUpdate user={id} toggle={toggle}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default Profile
import { GET_USERBYID,UPDATE_USERINFO } from "../Action/user_action"
const userIntialState = { error: "", data: [] }

const user_reducer = (state = userIntialState, action) => {
    switch (action.type) {
        case GET_USERBYID: {
            return { ...state, data: action.payload }
        }
        case UPDATE_USERINFO: {
            return { ...state, data: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}

export default user_reducer
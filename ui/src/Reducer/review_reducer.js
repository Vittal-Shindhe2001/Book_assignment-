import { GET_REVIEW,ADD_REVIEW } from "../Action/review_actions"
const userIntialState = { error: "", data: [] }

const review_reducer = (state = userIntialState, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            return { ...state, data: action.payload }
        }
        case ADD_REVIEW: {
            return { ...state, data: [...state.data, action.payload] }
        }
        default: {
            return { ...state }
        }
    }
}

export default review_reducer
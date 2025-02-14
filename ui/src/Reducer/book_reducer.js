import { date } from "yup"
import { ADD_BOOK, GET_BOOK, GET_BOOKBYID, SEARCH } from "../Action/book_actions"
const userIntialState = { error: "", data: [] }

const book_reducer = (state = userIntialState, action) => {
    switch (action.type) {
        case GET_BOOK: {
            return { ...state, data: action.payload }
        }
        case ADD_BOOK: {
            return { ...state, data: [...state.data, action.payload] }
        }
        case GET_BOOKBYID: {
            return { ...state, data: action.payload }
        }
        case SEARCH: {
            return { ...state, data: action.payload }
        }

        default: {
            return { ...state }
        }
    }
}

export default book_reducer
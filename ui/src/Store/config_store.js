import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import user_reducer from '../Reducer/user_reducer'
import review_reducer from '../Reducer/review_reducer'
import book_reducer from '../Reducer/book_reducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: user_reducer,
        review: review_reducer,
        book: book_reducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore
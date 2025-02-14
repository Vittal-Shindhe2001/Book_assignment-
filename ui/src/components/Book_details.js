import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import { startGetBookById } from "../Action/book_actions"
import { startAddReview, startReviews } from "../Action/review_actions"


const Book_details = () => {
    const [focus, setFous] = useState(false)
    const [comment, setComment] = useState('')
    const { id } = useParams()
        
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGetBookById(id))
        dispatch(startReviews(id))
    }, [id])
    const book = useSelector(state => state.book?.data)
    const review = useSelector(state => state.review?.data)

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            comment,
            book:id
        }
        dispatch(startAddReview(formData,setComment,setFous))
    }
    return (
        <>
            {book && Object.keys(book).length > 0 && <div className="card" style={{width: "18rem"}}>
                <img src={`http://localhost:3089${book.coverImage}`} className="card-img-top" alt={book.title} />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>

                </div>
            </div>}
            <form onSubmit={handleSubmit}>
                <input name="book" value={id} type="hidden"/>
                <input placeholder="Add a comment..." type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} onFocus={() => { setFous(true) }} />
                {focus && <div className="d-flex justify-end mt-2">
                    <button onClick={()=>setFous(false)} className="btn">Cancle</button>
                    <button disabled={comment.length === 0} className="btn">Comment</button>
                </div>}
            </form>
            {
                review && review.length > 0 && review.map((ele, i) => {
                    return (
                        <div key={i} className="card mb-3 p-3 shadow">
                            <h5 className="text-primary">{ele.user.name}</h5>
                            <p className="text-muted">{ele.comment}</p>
                        </div>
                    )
                })
            }

        </>
    )
}
export default Book_details
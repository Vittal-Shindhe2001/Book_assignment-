import { useEffect, useRef, useState,startTransition  } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BookForm from "./Book_form";
import { useDispatch, useSelector } from "react-redux";
import { startGetAllBook, startSearchBooks } from "../Action/book_actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Home = ({ user }) => {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    // sort State
    const [sortOrder, setSortOrder] = useState("asc")
    useEffect(() => {
        
        startTransition(() => {
            dispatch(startGetAllBook())
        })
    }, [])
    const books = useSelector(state => state.book?.data || [])
    const handleSort = () => {
        setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    }
    const sortedBooks =Array.isArray(books) ?( [...books].sort((a, b) => {
        return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    }) ): []
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 3
    const dispatch = useDispatch()
    const Debounce = (cb, d) => {
        let timerID = useRef(null)

        return (...args) => {
            if (timerID.current) {
                clearTimeout(timerID.current);
            }
            timerID.current = setTimeout(() => {
                return cb(...args)
            }, d)
        }

    }
    const updateDe = Debounce(text => {
        startTransition(() => {
            dispatch(startSearchBooks(text));
        })
    }, 1000)

    const toggle = () => {
        setModal(!modal)
    }
    const handleClick = () => {
        toggle()
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
        startTransition(() => {
            updateDe(e.target.value);
        })
    }

    // pagination
    const totalPages = Math.ceil(books.length / booksPerPage)

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook)

    // Pagination handlers
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">
                    <div className="card shadow p-2">
                        <div className="d-flex justify-content-between w-100">
                            {books.length > 0 && <input type="text" name="search" onChange={handleChange} />}
                            {books.length > 0 && <button className="btn btn-secondary ml-lg-n2" onClick={handleSort}>
                                Sort by Title {sortOrder === "asc" ? "↓" : "↑"}
                            </button>}
                            {user && user.role === "admin" && (
                                <button className="btn btn-primary" onClick={handleClick}>
                                    Book
                                </button>
                            )}
                        </div>
                        <div className="row mt-1">
                            {currentBooks.length > 0 ? currentBooks.map((ele, i) => (
                                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={i}>
                                    <div className="card h-100">
                                        <img src={`http://localhost:3089/${ele.coverImage}`} className="card-img-top h-45" alt={ele.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.title}</h5>
                                            <p className="card-text">{ele.description}</p>
                                            <Link to={`/book/${ele._id}`} className="btn btn-primary">View</Link>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <h1 className="text-center w-100">
                                    {search.length > 0 ? `No Search result: ${search}` : "No Data Found"}
                                </h1>
                            )}
                        </div>
                        {books.length > booksPerPage && (
                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn btn-secondary mx-2" onClick={prevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                                <button className="btn btn-secondary mx-2" onClick={nextPage} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                </div>
                <div className="col-md-2">

                </div>

            </div>
            <Modal
                show={modal}
                onHide={toggle}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookForm toggle={toggle} />
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

export default Home
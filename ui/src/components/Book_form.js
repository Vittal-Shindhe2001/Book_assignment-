import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { startAddBook } from '../Action/book_actions';

const BookSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string().trim().required("Description is required"),
    price: Yup.number().positive("Price must be a positive number").required("Price is required"),
    publishedYear: Yup.number()
        .integer("Published Year must be an integer")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Published Year is required"),
    genre: Yup.string().trim().required("Genre is required"),
    author: Yup.string().trim().required("Author name is required"),
    coverImage: Yup.mixed()
        .test("fileSize", "File size too large (Max: 5MB)", (value) => value && value.size <= 5 * 1024 * 1024)
        .test("fileType", "Only images are allowed", (value) =>
            value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        )
        .required("Cover image is required"),
});

const BookForm = ({toggle}) => {
    const dispatch=useDispatch()
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("publishedYear", values.publishedYear);
        formData.append("genre", values.genre);
        formData.append("author", values.author);
        formData.append("coverImage", values.coverImage);
        dispatch(startAddBook(formData,toggle))
        setSubmitting(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Add Book</h3>

                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        price: "",
                        publishedYear: "",
                        genre: "",
                        author: "",
                        coverImage: null,
                    }}
                    validationSchema={BookSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <Field type="text" name="title" className="form-control" />
                                {touched.title && errors.title && <div className="text-danger small">{errors.title}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <Field as="textarea" name="description" className="form-control" />
                                {touched.description && errors.description && (
                                    <div className="text-danger small">{errors.description}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <Field type="number" name="price" className="form-control" />
                                {touched.price && errors.price && <div className="text-danger small">{errors.price}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Published Year</label>
                                <Field type="number" name="publishedYear" className="form-control" />
                                {touched.publishedYear && errors.publishedYear && (
                                    <div className="text-danger small">{errors.publishedYear}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Genre</label>
                                <Field type="text" name="genre" className="form-control" />
                                {touched.genre && errors.genre && <div className="text-danger small">{errors.genre}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Author</label>
                                <Field type="text" name="author" className="form-control" />
                                {touched.author && errors.author && <div className="text-danger small">{errors.author}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Cover Image</label>
                                <input
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={(event) => setFieldValue("coverImage", event.currentTarget.files[0])}
                                />
                                {touched.coverImage && errors.coverImage && (
                                    <div className="text-danger small">{errors.coverImage}</div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Adding..." : "Add Book"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BookForm;

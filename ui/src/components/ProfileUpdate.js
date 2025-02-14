import { useDispatch } from "react-redux"
import { startUpdateUserInfo } from "../Action/user_action"
import * as Yup from "yup"
import { Formik,Form,Field } from "formik"

const ProfileUpdate = (props) => {
    const {user,toggle}=props
    
    
    const dispatch = useDispatch()
    const ProfileSchema = Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    })
    const handleSubmit = (values, { setSubmitting }) => {
        
        const id=values.id
        dispatch(startUpdateUserInfo(id,values,toggle))
        setSubmitting(false)
    }
    return (
 <div className="container d-flex justify-content-center align-items-center vh-100 ">
            <div className="card p-1 shadow-lg " style={{ width: "400px" }}>
                <h3 className="text-center">Update Profile</h3>

                <Formik
                    initialValues={{
                        name: user.name || "",
                        email:user.email || "",
                        id: user?._id || ""
                    }}
                    validationSchema={ProfileSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                        <Field type="hidden" name="id" />
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <Field type="text" name="name" className="form-control" />
                                {touched.name && errors.name && <div className="text-danger small">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type='text' name="email" className="form-control" />
                                {touched.email && errors.email && (
                                    <div className="text-danger small">{errors.email}</div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Profile"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ProfileUpdate
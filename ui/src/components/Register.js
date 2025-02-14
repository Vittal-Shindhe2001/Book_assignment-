import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startRegisterUser } from "../Action/user_action"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Register = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    })

    // Handle Form Submission
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        const {confirmPassword,...FormData}=values
        dispatch(startRegisterUser(FormData,history))
        setSubmitting(false)
    }

    return (
        <div className="container d-flex justify-content-center align-items-center ">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Register</h3>

                <Formik
                    initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({touched,errors, isSubmitting }) => (
                        <Form>
                            {/* Name Field */}
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <Field type="text" name="name" className="form-control" />
                                {touched.name && errors.name && <div className="text-danger samll">{errors.name}</div>}
                            </div>

                            {/* Email Field */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type="email" name="email" className="form-control" />
                                {touched.email && errors.email && <div className="text-danger samll">{errors.email}</div>}
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" />
                                {touched.password && errors.password && <div className="text-danger samll">{errors.password}</div>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <Field type="password" name="confirmPassword" className="form-control" />
                                {touched.confirmPassword && errors.confirmPassword && <div className="text-danger samll">{errors.confirmPassword}</div>}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Already have an account? */}
                <div className="text-center mt-3">
                    <Link to='/' className="text-decoration-none">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register

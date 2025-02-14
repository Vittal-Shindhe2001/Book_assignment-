import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { startLoginUser } from "../Action/user_action"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Login = () => {
    const dispatch=useDispatch()
    const history=useHistory()
    // Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    })

    // Handle Login Submit
    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(startLoginUser(values,history))
        setSubmitting(false)
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Login</h3>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field type="email" name="email" className="form-control" />
                                {touched.email && errors.email && <div className="text-danger small">{errors.email}</div>}
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field type="password" name="password" className="form-control" />
                                {touched.password && errors.password && <div className="text-danger small">{errors.password}</div>}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login

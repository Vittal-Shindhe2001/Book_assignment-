import React, {useState, useEffect, Suspense  } from "react"
import { Link, Route, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "./PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import Loding from "./Loding";
import { jwtDecode } from "jwt-decode";
import Book_details from './Book_details'
const Home = React.lazy(() => import('./Home'))
const Register = React.lazy(() => import('./Register'))
const Login = React.lazy(() => import('./Login'))
const ErrorBoundary = React.lazy(() => import('./ErrorBoundary'))
const Profile = React.lazy(() => import('./Profile'))

const Navbar = (props) => {
    const [tokendata, setTokenData] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("token");
    
   
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setTokenData(decoded)
            } catch (error) {
                console.error("Invalid token", error)
                localStorage.removeItem("token")
                setTokenData(null);
            }
        }
        setLoading(false)
    }, [token])

    if (loading) {
        return <Loding />
    }

    return (

        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                {token && tokendata?.role === 'admin' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand span" href="#"><span className="span">EVs Tracker</span></span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className='nav-link active' aria-current="page" to='/home'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='nav-link active' aria-current="page" to='/profile'>Profile</Link>
                                    </li>
                                  
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                toast.info('See you soon..!', {
                                                    position: "top-right",
                                                    autoClose: 1000,
                                                    theme: "colored",
                                                });
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }
                                        }}>Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}


                {token && tokendata?.role === 'Customer' &&
                    (<>
                        <div className="container-fluid">
                            <span className="navbar-brand" href="#">EVs Tracker </span>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                        <Link className='nav-link active' aria-current="page" to='/home'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='nav-link active' aria-current="page" to='/profile'>Profile</Link>
                                    </li>
                                  
                                   
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" onClick={(e) => {
                                            const confirm = window.confirm('Are You Sure')
                                            if (confirm) {
                                                toast.info('See you soon..!', {
                                                    position: "top-right",
                                                    autoClose: 1000,
                                                    theme: "colored",
                                                });
                                                localStorage.clear()
                                                props.history.push('/login')
                                            }

                                        }}>LogOut</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </>
                    )}
                {
                    !token &&
                    <div className="container-fluid">
                        <span className="navbar-brand " href="#">EVs Tracker</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/register'>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/login'>Login</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </nav>
            <ErrorBoundary>
                <Suspense fallback={<h1>Loding...</h1>}>
                    <Route path='/register' component={Register} exact={true} />
                    <Route path='/login' exact={true}
                        render={(props) => (
                            <Login {...props} />
                        )} />

                </Suspense>
            </ErrorBoundary>

            {token && tokendata?.role === 'admin' && <div>

                <Suspense fallback={<h1>Loding...</h1>}>
                    <ErrorBoundary>
                        <PrivateRoute path='/home' component={(props) => <Home {...props} user={tokendata} />} exact={true} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <PrivateRoute path='/profile' component={(props) => <Profile {...props} userId={tokendata.id} />} exact={true} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <PrivateRoute path="/book/:id" exact component={Book_details} />
                    </ErrorBoundary>
                </Suspense>

            </div>}
            {token && tokendata?.role === 'Customer' &&
                <div>
                    <Suspense fallback={<h1>Loding...</h1>}>
                        <ErrorBoundary>
                            <PrivateRoute path='/home' component={Home} exact={true} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <PrivateRoute path='/profile' component={(props) => <Profile {...props} userId={tokendata.id} />} exact={true} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <PrivateRoute path="/book/:id" exact component={Book_details} />
                        </ErrorBoundary>



                    </Suspense>

                </div>

            }

            <ToastContainer />
        </div >
    )
}
export default withRouter(Navbar)
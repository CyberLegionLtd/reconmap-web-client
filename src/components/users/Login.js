import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";

import {AuthConsumer} from "../../contexts/AuthContext";
import Wrap from "../layout/Wrap";
import BtnPrimary from "../ui/buttons/BtnPrimary";

const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({username: null, password: null})
    const [error, setError] = useState(null)

    useEffect(() => {
        // each time an error occurs
        error && setTimeout(() => {
            setError(null)
        }, 4000)
    }, [error])

    const handleUsername = e => {
        setCredentials({...credentials, username: e.target.value})
    }
    const handlePassword = e => {
        setCredentials({...credentials, password: e.target.value})
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
//      handleLogin();
        }
    }

    const onOk = () => {
        setLoading(false);
    }
    const onKo = (err) => {
        setLoading(false);
        setError(err)
    }

    let redirectTo
    try {
        redirectTo = props.location.state.from.pathname
    } catch {
        redirectTo = "/"
    }
    return (
        <AuthConsumer>
            {
                ({isAuth, login}) => (
                    <Wrap>
                        {isAuth && <Redirect to={redirectTo}/>}
                        <div className='flex justify-between items-center  w-full flex-col md:flex-row'>

                            <section className="flex flex-col w-full sm:w-1/2 max-w-md gap-2 mx-auto text-center">
                                <h1 className="text-5xl font-bold mb-10">Login</h1>
                                <label htmlFor="inputUsername" className="sr-only">
                                    Username
                                </label>
                                <input type="text" id="inputUsername" onChange={handleUsername} placeholder="Username"
                                       required autoFocus/>
                                <label htmlFor="inputPassword" className="sr-only">
                                    Password
                                </label>
                                <input onKeyPress={handleKeyPress} type="password" id="inputPassword"
                                       onChange={handlePassword} placeholder="Password" required/>
                                <BtnPrimary
                                    onClick={() => login(credentials, onOk, onKo)}
                                    disabled={!credentials.username || !credentials.password}>
                                    {!loading ? "Sign in" : "Processing..."}
                                </BtnPrimary>
                                {error &&
                                <p className='flex items-center justify-between border border-red-600 p-3 rounded  text-red-600 text-center'>
                                    <span className='mx-auto'> Oops... Incorrect username and/or password</span></p>}
                            </section>
                            <i data-feather={'lock'}
                               className=' text-gray-800 order-1 md:order-3 p-5 hidden md:inline'/>
                        </div>

                    </Wrap>
                )
            }
        </AuthConsumer>

    );
};

export default Login;
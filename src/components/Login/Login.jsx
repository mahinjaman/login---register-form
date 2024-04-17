import { GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const Login = () => {
    const [errorMessage, setErrorMessage ] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef(null);
    const handleLogin = e =>{
        e.preventDefault();
        const email = emailRef.current.value;
        const password = e.target.password.value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            alert('Please enter a valid email');
            return;
        }
        else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)){
            alert('Please enter a valid password');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccessMessage('You have successfully logged in');
        })
        .catch(err => {
            console.log(err.message);
            setErrorMessage(err.message);
        })
    }

    const handleForgetPassword = () =>{
        console.log('Forget is coming');
        sendPasswordResetEmail(auth, emailRef.current.value)
        .then(result =>{
            console.log(result);
            alert('Please check your email')
        })
        .catch(err => {
             console.log(err.message);
             setErrorMessage(err.message);
         })
    }

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleOrLogin = provider =>{
        setErrorMessage('')
        setSuccessMessage('')
        signInWithPopup(auth, provider)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccessMessage('You have successfully logged in');
        })
        .catch(err => {
            console.log(err.message);
            setErrorMessage(err.message);
        })
    }
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                            <span className='absolute right-5 top-[60%]' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye>}</span>
                        </div>
                        <div className='md:flex justify-between '>
                            <label className="label">
                                <button onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</button>
                            </label>

                            <label className="label">
                                <Link className="label-text-alt link link-hover" to={'/register'}>Register?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        {
                            errorMessage &&
                            <p className="text-red-500">{errorMessage}</p>
                        }
                        {
                            successMessage &&
                            <p className="text-green-500">{successMessage}</p>
                        }
                    </form>

                    <div>
                        <p>Or Login With </p>
                        <div className='flex items-center justify-evenly w-5/12 mx-auto mt-4'>
                            <button onClick={()=>handleOrLogin(googleProvider)} className='text-2xl'><FaGoogle></FaGoogle></button>
                            <button onClick={()=>handleOrLogin(githubProvider)} className='text-2xl'><FaGithub></FaGithub></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
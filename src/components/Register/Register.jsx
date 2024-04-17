import { createUserWithEmailAndPassword, reload, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase/firebase.config';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [errorMessage, setErrorMessage ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        setErrorMessage('')
        setSuccessMessage('')
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const terms = e.target.terms.checked;
        console.log(terms);
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)){
            setErrorMessage('Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character');
            return;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setErrorMessage('Invalid email address');
            return;
        }
        else if (!terms){
            setErrorMessage('You must agree to the terms and conditions');
            return;
        }
        console.log('firebase is coming');
        console.log(email, password, name);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            setSuccessMessage('Registration successful');
            sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please check your email and verify your email')
            })
            .catch(error => {
                 console.log(error);
             });
            updateProfile(user, {
                displayName: name,
                photoURL: 'https://example.com/jane-q-user/profile.jpg'
            })
            console.log(user);
        })
        .catch(error => {
            setErrorMessage(error.message)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username:-</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                            <span className='absolute right-5 top-[60%]' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye> }</span>
                        </div>
                        <div className='md:flex gap-2 justify-between'>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                            <label className="label">
                                <p className="label-text-alt">Already have an account? Please <Link className='underline' to={'/login'}>Login</Link></p>
                            </label>
                        </div>

                        <div>
                            <input type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms" className='ml-2'>Accept our <a href="#">Terms and Conditions</a></label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
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

                </div>
            </div>
        </div>
    );
};

export default Register;
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css'

import * as request from '../utils/request.js'
import { useAuth } from "../Context/AuthContext.jsx";

const LoginSignup = () => {
    const { login } = useAuth();
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async () => {
        

        const { name, email, password } = formData;

       

        try {
            const payload = {
                username: name,
                email: email,
                password: password
            };
            if(isSignup){
                if (!formData.agreeToTerms) {
                    toast.warning('You must agree to the terms and conditions.');
                    return;
                }
                if (!name || !email || !password) {
                    toast.warning('All fields are required.');
                    return;
                }
                const response = await request.post('/api/auth/signup',payload);

                if (response.code === 200) {
                    
                    toast.success(response.message);
                } else {
                    toast.error(`${response.message}`);
                }
            } else{
                console.log("name", name)
                console.log("password", password)
                if (!name || !password) {
                    toast.warning('All fields are required.');
                    return;
                }
                const response = await request.post('/api/auth/signin',payload);
                if (response.code === 200) {
                    const token = response.data.accessToken;
                    if (token) {
                        sessionStorage.setItem('token', token);
                        login(token);
                    } else {
                        console.error('Token not found in response');
                    }
                    
                    toast.success(response.message);
                    navigate('/');
                } else {
                    toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
                }
            }
           
        } catch (error) {
            toast.error(`${error.response.data.message}`);
        }
    };
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{isSignup
                        ? 'Sign Up '
                        : "Login"}</h1>
                <div className="loginsignup-fields">
                {isSignup && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    )}
                    {!isSignup && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    )}
                    {isSignup && (
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit}>Continue</button>
                <p className="loginsignup-login">
                    {isSignup
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                    <span onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Login' : 'Sign Up'}
                    </span>
                </p>
                {isSignup && (
                    <div className="loginsignup-agree">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        <p>
                            By continuing, I agree to the terms of use & privacy policy.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginSignup
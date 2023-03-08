import React, { useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shown, setShown] = useState(false);

    return (
        <div className='flex justify-evenly w-full'>
            
            <div className='bg-white flex-[0.48] my-28 h-96 space-y-5 p-6 drop-shadow-lg'>
                <div className='space-y-2'>
                    <h1 className='text-2xl'>Login</h1>
                    <p>If you have an account, sign in with your email address.</p>
                </div>
                <div className='space-y-2'>
                    <p>Email</p>
                    <input className='py-2 px-3 w-[45%] border-[1px] outline-none rounded-xl' value={email} type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='space-y-2'>
                    <p>Password</p>
                    <div className='space-x-2'>
                        <input className='py-2 px-3 w-[45%] border-[1px] outline-none rounded-xl' name='password' type={shown ? 'text' : 'password'} id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => setShown(!shown)}><VisibilityOutlinedIcon /></button>
                    </div>
                </div>
                <div className='space-y-5'>
                    <hr />
                    <div className='flex justify-evenly'>
                        <Link to={'/forgotPassword'} className='underline'> Forgot Your Password?</Link>
                        <Link to={'/forgotpassword'}><Button variant="contained" >Sign In</Button></Link>
                    </div>
                </div>
            </div>

            <div className='flex-[0.48] my-28 p-6 bg-white drop-shadow-lg space-y-4'>
                <div className='space-y-3'>
                    <h1 className='text-2xl'>New Customers</h1>
                    <p>Creating an account has many benefits: check out faster, keep more than one address, track orders and more. </p>
                </div>
                <hr />
                <div className='float-right'>
                <Link to={'/create/user/acount'}><Button variant="contained" >Create An Account</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
import { Button } from '@mui/material';
import React from 'react'
import { useState } from "react"
import { Link } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    return (

        <div className='bg-white flex flex-col my-28 space-y-5 m-auto p-6 drop-shadow-lg justify-center items-center w-[50%]'>
            <div className='space-y-2 text-center'>
                <h1 className='text-2xl'>Forgot Password</h1>
                <p>Personal Information</p>
            </div>
            <p>Email</p>
            <input className='py-2 px-3  border-[1px] outline-none rounded-xl' type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Link to={'/recovery-password'}><Button>Send Recovery Mail</Button></Link>
        </div>

    )
}

export default ForgotPassword
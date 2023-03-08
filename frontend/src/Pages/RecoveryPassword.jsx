import React from 'react'
import { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const RecoveryPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shownPass, setShownPass] = useState(false);
    const [shownConfirmPass, setShowConfirmPass] = useState(false);


    return (
        <div>
            <div className='bg-white flex flex-col my-28 space-y-5 m-auto p-6 drop-shadow-lg justify-center items-center w-[50%]'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-2xl'>Set New Password</h1>
                </div>
                <p>Password</p>
                <div className='space-x-2'>
                    <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' name='password' type={shownPass ? 'text' : 'password'} value={password} id='password' onChange={(e) => setPassword(e.target.value)} />
                    <button className='absolute top-[125px]' onClick={() => setShownPass(!shownPass)}><VisibilityOutlinedIcon /></button>
                </div>
                <p>Confirm Password</p>
                <div className='space-x-2'>
                    <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' name='confirmPassword' value={confirmPassword} type={shownConfirmPass ? 'text' : 'password'} id='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className='absolute top-[230px]' onClick={() => setShowConfirmPass(!shownConfirmPass)}><VisibilityOutlinedIcon /></button>
                </div>
                <Link to={'/recovery-password'}><Button>Send Recovery Mail</Button></Link>
            </div>
            
        </div>
    )
}

export default RecoveryPassword
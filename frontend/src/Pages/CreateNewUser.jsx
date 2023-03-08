import React from 'react'
import { useState } from 'react'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CreateUser = () => {
    const [email, setEmail] = useState('');
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shownPass, setShownPass] = useState(false);
    const [shownConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <div>
            <div className='flex justify-evenly w-full'>
                <div className='bg-white flex-[0.48] flex flex-col my-28 space-y-5 p-6 drop-shadow-lg justify-center items-center'>
                    <div className='space-y-2 text-center'>
                        <h1 className='text-2xl'>Create New User Account</h1>
                        <p>Personal Information</p>
                    </div>
                    <div className='space-y-2 w-full'>
                        <p>First Name</p>
                        <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' type='text' value={fName} name='fName' id='fName' onChange={(e) => setfName(e.target.value)} />
                    </div>
                    <div className='space-y-2 w-full'>
                        <p>Last Name</p>
                        <div className='space-x-2'>
                            <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' name='lName' value={lName} type='text' id='lName' onChange={(e) => setlName(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='bg-white flex-[0.48] px-12 my-28 space-y-5 py-6 drop-shadow-lg'>
                    <div className='space-y-2'>
                        <h1 className='text-2xl'>Sign-in Information</h1>
                    </div>
                    <div className='space-y-2'>
                        <p>Email</p>
                        <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='space-y-2'>
                        <p>Password</p>
                        <div className='space-x-2'>
                            <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' name='password' value={password} type={shownPass ? 'text' : 'password'} id='password' onChange={(e) => setPassword(e.target.value)} />
                            <button className = 'absolute right-[4rem] top-[210px] ' onClick={() => setShownPass(!shownPass)}><VisibilityOutlinedIcon /></button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <p>Confirm Password</p>
                        <div className='space-x-2'>
                            <input className='py-2 px-3 w-full border-[1px] outline-none rounded-xl' name='confirmPassword' value={confirmPassword} type={shownConfirmPass ? 'text' : 'password'} id='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button className = 'absolute right-[4rem] top-[305px]' onClick={() => setShowConfirmPass(!shownConfirmPass)}><VisibilityOutlinedIcon /></button>
                        </div>
                    </div>
                    <div className='text-right'>
                        <Button variant="contained" to={'/createUser'}>Create An Account</Button>
                    </div>
                </div>
            </div>
            <div>
                <Button to={'/registerUser'}></Button>
            </div>
        </div>
    )
}

export default CreateUser
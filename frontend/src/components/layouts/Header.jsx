import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { MenuItems } from './FooterCols';
import { addItem, removeItem } from '../../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { cartCount } from '../../Redux/CartSlice';
import MiniCart from '../MiniCart';


const Header = () => {
  const cartItem = useSelector(cartCount);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMiniCartModal, setShowMiniCartModal] = useState(false);
  const [search, setSearch] = useState('');

  const searchFunctions = (e)=>{
    e.preventDefault()
    console.log("=====================called=============")
  }

  return (
    <div className=' flex flex-wrap items-center justify-between w-full px-6 py-6 mx-auto border-b-[3px] drop-shadow-md	'>
      <div className='w-[15%]'>
        <Link to={'/plp'}><img src="https://demo.hyva.io/static/version1674478945/frontend/Hyva/example/en_US/images/logo.svg" alt="Logo" /></Link>
      </div>
      <div className=" flex space-x-10 text-md font-light">
        {
          MenuItems.map((menu, index) => <Link to={menu.path} key={index}>{menu.title}</Link>)
        }
      </div>

      <form onSubmit={searchFunctions}>
      <input
        type="text"
        className="block  px-4 py-2 text-gray-500 bg-white border rounded-md focus:border-x-gray-400 focus:border-x-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Search..."
        value={search}
        
      />
      </form>

      <div className='space-x-2 flex'>
        <div>
          <button onClick={() => setShowLoginModal(!showLoginModal)}><PersonIcon /></button>
          {
            showLoginModal ?
              <div className='absolute right-0 bg-white w-[200px] p-1 flex flex-col drop-shadow-md'>
                <Link to='/signin' className='hover:bg-neutral-100 hover:cursor-pointer hover:text-black py-2'> <button >Sign In</button></Link>
                <Link to='/create/user/acount' className='hover:bg-neutral-100 hover:cursor-pointer hover:text-black py-2'> <button>Create Account</button></Link>
              </div> : ''
          }
        </div>
        <button onClick={() => setShowMiniCartModal(!showMiniCartModal)}><span><ShoppingCartOutlinedIcon /></span> {cartItem}</button>
        {
          showMiniCartModal ? <div className='absolute space-y-5 right-0 w-[20%] h-[400%] flex-wrap bg-white mt-10 mr-9 overflow-scroll border-b-[3px] drop-shadow-md'><MiniCart /></div> : ''
        }

      </div>

    </div>
  )
}

export default Header
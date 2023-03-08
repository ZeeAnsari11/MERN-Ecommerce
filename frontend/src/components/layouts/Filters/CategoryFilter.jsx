import React from 'react'
import { MenuItems } from '../FooterCols'
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryForFilter } from '../../../Redux/CartSlice';
import { cartCount } from '../../../Redux/CartSlice';

const CategoryFilter = () => {
//   const category = useSelector((state) => state.Reducer.categoryReducer.categoryForFilter);
const cartItemCount = useSelector(cartCount);
  const dispatch = useDispatch();

  return (
    <div className='py-3'>
        {/* {category} */}
        {cartItemCount}
        {   
            MenuItems.map((item,index)=>{
                return(
                    <div className='p-1  space-y-2 text-s' key={index}><button onClick={()=>dispatch(setCategoryForFilter(MenuItems[index].title))} >{item.title}</button> {index <= MenuItems.length-2 ? <hr/> : ''}</div>
                )
            })
        }
    </div>
  )
}

export default CategoryFilter
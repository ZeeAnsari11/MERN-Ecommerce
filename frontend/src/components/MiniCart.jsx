import React from 'react'
import { useSelector } from 'react-redux'
import { allProductsInCart } from '../Redux/CartSlice'
const MiniCart = () => {
    const products = useSelector(allProductsInCart)
    console.log("=====================>>>>>>>>>", products)
    return (
        <>
            {
                products.map((product) => {
                    return (

                        <>
                            <div className="container px-5 mx-auto flex space-y-5 space-x-7">
                                <div className='mt-3'>
                                    <img className='w-14 h-14  border-b-[3px] drop-shadow-md' src={product.images[0].url} alt="" />
                                </div>
                                <div className='mt-3'>
                                    <h1>{product.name}</h1>
                                    <div className='flex space-x-4'>
                                        <h1>Price : </h1>
                                        <h1>{product.price}</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr />
                            </div>
                        </>

                    )
                })
            }
        </>
    )
}

export default MiniCart
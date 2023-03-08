import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { addProductInCart } from '../../Redux/CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../Redux/CartSlice';

const PDPCard = () => {
  const dispatch = useDispatch()
    const [product , setProducts] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetchProductByid()
    },[])

    const fetchProductByid = ()=>{
        axios({
            // Endpoint to send files
            url: `http://localhost:4000/api/v1/product/${id}`,
            method: "GET"
          })
            .then((res) => {
                setProducts(res.data.product)
            })
            .catch((err) => {
              console.log("=========error==========", err)
            })
    }
    return (
      <>
      {
        product.name ? <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" className="flex-wrap object-cover object-center rounded border border-gray-200" src={product.images[0].url} />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.name}</h2>
                    <span className="leading-relaxed">{product.ratings}</span>
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="flex">
                        <span className="title-font font-medium text-2xl text-gray-900">{product.price}</span>
                        <button onClick={()=>{dispatch(addProductInCart(product)); (dispatch(addItem(1)))}} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </section>: ""
      }
      </>
    )
}

export default PDPCard
import React, { useEffect } from 'react'
import { useState } from 'react';
import PriceFilter from '../components/layouts/Filters/PriceFilter'
import CategoryFilter from '../components/layouts/Filters/CategoryFilter';
import RatingFilter from '../components/layouts/Filters/RatingFilter';
import Collapsible from 'react-collapsible';
import PLPCard from '../components/layouts/PLPCard';
import { useSelector, useDispatch } from "react-redux";
import { setAllProducts, productsState } from '../Redux/CartSlice';
import axios from 'axios';

const PLP = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAllProducts();
  }, [])

  const fetchAllProducts = () => {
    axios({
      // Endpoint to send files
      url: "http://localhost:4000/api/v1/products",
      method: "GET"
    })
      .then((res) => {
        dispatch(setAllProducts(res.data.products));
      })
      .catch((err) => {
        console.log("=========error==========", err)
      })
  }


  const products = useSelector(productsState);



  return (
    <div className='w-full flex absolute'>
      <div className='flex-[0.2] bg-green-50 p-6 space-y-6 sticky top-0 h-screen'>
        <h1 className='text-xl'>Filter By</h1>
        <Collapsible trigger="Price Range">
          <div className='pt-7 pl-7 pr-7'><PriceFilter /></div>
        </Collapsible>
        <hr />
        <Collapsible trigger="Category">
          <CategoryFilter />
        </Collapsible>
        <hr />
        <Collapsible trigger="Rating">
          <RatingFilter />
        </Collapsible>
      </div>
      <div className='flex-[0.8] bg-gray-100 grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 p-4'>
        {
          products.map((product, index) => {
            return <PLPCard key={index} id = {product._id} image={product.images[0].url} name={product.name} price={product.price} description={product.description} index={index} />
          })
        }

      </div>

    </div>
  )
}

export default PLP
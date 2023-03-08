import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceForFilter } from '../../../Redux/CartSlice';
import Slider from '@mui/material/Slider';


const PriceFilter = () => {
    const price = useSelector((state) => state.Reducer.priceReducer.priceForFilter)
    const dispatch = useDispatch();

    const rangeSelector = (event, newPrice) => {
        dispatch(setPriceForFilter(newPrice))
    };

    return (
        <div>
            <Slider
                value={price}
                onChange={rangeSelector}
                valueLabelDisplay="auto"
            />
        </div>
    )
}

export default PriceFilter





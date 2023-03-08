import React from 'react'
import ReactStars from "react-rating-stars-component";
import { setRatingForFilter } from '../../../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const RatingFilter = () => {
    // const rating = useSelector((state) => state.Reducer.ratingReducer.ratingForFilter)
    const dispatch = useDispatch();
    const ratingChanged = (selectedRating) => {
        dispatch(setRatingForFilter(selectedRating))
    };

    return (
        <div className='py-3'>
            {/* {rating} */}
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
        </div>
    )
}

export default RatingFilter
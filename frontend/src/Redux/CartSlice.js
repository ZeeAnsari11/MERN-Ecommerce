import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from '@reduxjs/toolkit';
import axios from "axios";


// For Cart Items Products
const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItemsCount: 0
    },
    reducers: {
        addItem: (state, action) => {
            state.cartItemsCount = state.cartItemsCount + action.payload;
        },

        removeItem: (state, action) => {
            state.cartItemsCount = state.cartItemsCount - action.payload;
        }
    }

})

export const { addItem, removeItem } = CartSlice.actions;
export const cartCount = (state) => state.Reducer.cartReducer.cartItemsCount;

// For Categories to filter Products
const CategoryFilterSlice = createSlice({
    name: 'category',
    initialState: {
        categoryForFilter: 'hellooooo'
    },
    reducers: {
        setCategoryForFilter: (state, action) => {
            state.categoryForFilter = action.payload;
        },
    }

})

export const { setCategoryForFilter } = CategoryFilterSlice.actions


// For Rating to Filter Products
const RatingFilterSlice = createSlice({
    name: 'rating',
    initialState: {
        ratingForFilter: 'yesssss'
    },
    reducers: {
        setRatingForFilter: (state, action) => {
            state.ratingForFilter = action.payload;
        },
    }
})

export const { setRatingForFilter } = RatingFilterSlice.actions


// For Price to Filter Products
const PriceFilterSlice = createSlice({
    name: 'price',
    initialState: {
        priceForFilter: [0, 100]
    },
    reducers: {
        setPriceForFilter: (state, action) => {
            state.priceForFilter = action.payload;
        },
    }
})

export const { setPriceForFilter } = PriceFilterSlice.actions


// For Categories to filter Products
const allProductsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload;
        }
    }

})


export const productsState = (state) => state.Reducer.allProductsReducer.products;
export const {setAllProducts} = allProductsSlice.actions



// For List of products added in cart
const ProductsInCartSlice = createSlice({
    name: 'products',
    initialState: {
        productsInCart: []
    },
    reducers: {
        addProductInCart: (state, action) => {
            state.productsInCart.push(action.payload) ;
        }
    }
})

export const {addProductInCart} =  ProductsInCartSlice.actions;
export const allProductsInCart = (state) => state.Reducer.productsInCartReducer.productsInCart;



// export default CartSlice.reducer;
export default combineReducers({
    cartReducer: CartSlice.reducer,
    categoryReducer: CategoryFilterSlice.reducer,
    ratingReducer: RatingFilterSlice.reducer,
    priceReducer: PriceFilterSlice.reducer,
    allProductsReducer : allProductsSlice.reducer,
    productsInCartReducer : ProductsInCartSlice.reducer
});
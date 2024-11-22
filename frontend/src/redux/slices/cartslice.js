//cartslices
import { createSlice, payLoadAction } from '@reduxjs/toolkit';

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.product.id === action.payload.item.product.id);

            if (existingItem) {
                existingItem.quantity =Number(existingItem.quantity)+ Number(action.payload.quantity);
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }
            console.log(state)
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },
        updateCartItemQuantity: (state, action) => {
            const item = state.items.find((item) => item.product._id === action.payload._id);

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice;
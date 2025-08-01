import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    // cart: [{
    //     pizzaId: 12,
    //     name: 'kebab pizza',
    //     quantity: 2,
    //     unitPrice: 15,
    //     totalPrice: 32
    // }]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            //payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            //payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            //payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            //payload = pizzaId
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const getCart = (state) => state.cart.cart;
export const getUser = (state) => state.user.username
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getCurrentQuantityById = (id) => state => state.cart.cart.find(item => id === item.pizzaId)?.quantity ?? 0;

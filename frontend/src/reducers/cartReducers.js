
import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

const initialCartState={cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
shippingAddress:localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{},}
export const cartReducer=(state=initialCartState,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload;
            const existing=state.cartItems.find((x) => x.product === item.product);
            if(existing){
                return{
                    ...state,
                    cartItems:state.cartItems.map((x) => x.product===existing.product?item:x)
                };
            } else {
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                };
            }
        case CART_REMOVE_ITEM:
            const id=action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product!==id) 
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state,
                shippingAddress:action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state,
                paymentMethod:action.payload}
        case CART_EMPTY:
            return {...state,cartItems:[]}
        default: 
            return state
    }
}
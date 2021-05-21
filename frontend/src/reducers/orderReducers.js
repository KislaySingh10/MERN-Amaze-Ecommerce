import { PLACE_ORDER_FAIL, PLACE_ORDER_RESET, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS, PAY_ORDER_FAIL, PAY_ORDER_RESET, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "../constants/orderConstants";

export const placeOrderReducer=(state={},action)=>{
    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return {loading:true}
        case PLACE_ORDER_SUCCESS:
            return {loading:false, success:true, order:action.payload.order}
        case PLACE_ORDER_FAIL:
            return {loading:false, error:action.payload}
        case PLACE_ORDER_RESET:
            return {}
        default: return state;
    }
}

export const orderDetailReducer=(state={loading:true},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading:true}
        case ORDER_DETAILS_SUCCESS:
            return {loading:false,order:action.payload}
        case ORDER_DETAILS_FAIL:
            return {loading:false,error:action.payload}
        default: return state
    }
}

export const payOrderReducer=(state={},action)=>{
    switch(action.type){
        case PAY_ORDER_REQUEST:
            return {payLoading:true}
        case PAY_ORDER_SUCCESS:
            return {payLoading:false, paySuccess:true}
        case PAY_ORDER_FAIL:
            return {payLoading:false, payError:action.payload}
        case PAY_ORDER_RESET:
            return {};
        default: return state
    }
}

export const orderHistoryReducer=(state={orderList:[]},action)=>{
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true}
        case ORDER_LIST_SUCCESS:
            return { loading:false, orderList:action.payload}
        case ORDER_LIST_FAIL:
            return {loading:false, error:action.payload}
        default: return state
    }
}
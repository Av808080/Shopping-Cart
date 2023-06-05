import React, { useReducer } from 'react'
import { Props, Action, State } from '../Types/CartContextTypes'

const initialState: State = {
    selectedItems: [],
    total: 0,
    countItems: 0,
    isCheckOut: false,
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "CHECKOUT":
            return { ...initialState, isCheckOut: true }
        case "CLEAR":
            return initialState;
        case "INCREASE":
            const index = state.selectedItems.findIndex(item => item.id === action.payload.id)
            if (index === -1)
                state.selectedItems.push({ ...action.payload, quantity: 1 })
            else
                ++state.selectedItems[index].quantity             
            return state;
        case "DECREASE":
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id)
            if (indexD === -1)
                return state
            else
                if (!(state.selectedItems[indexD].quantity < 1))
                    --state.selectedItems[indexD].quantity
            return state;
        default: return initialState;
    }
}


type O = {
    dispatch:( action:Action )=>void ;
    state:State;
}

export const CartContext = React.createContext({}as O);

const CartContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CartContext.Provider value={{ dispatch, state }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider

import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case ADD_ITEM:
            return {
                ...state,
                items: state.items.concat(action.payload)
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(x => x.id !== action.payload.id)
            }
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(x => {
                    if (x.id === action.payload.id)
                        return action.payload;
                    return x;
                })
            }
        default:
            return state;
    }
}

export default itemsReducer;  
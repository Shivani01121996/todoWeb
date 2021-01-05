import { FETCH_BUCKETS, ADD_BUCKET, SET_CURRENT_BUCKET_ID } from '../actions/types';

const initialState = {
    buckets: [],
    currentBucketId: 'all'
}

const bucketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BUCKETS:
            return {
                ...state,
                buckets: action.payload
            }
        case ADD_BUCKET:
            return {
                ...state,
                buckets: state.buckets.concat(action.payload)
            }
        case SET_CURRENT_BUCKET_ID:
            return {
                ...state,
                currentBucketId: action.payload
            }
        default:
            return state;
    }
}

export default bucketsReducer;  
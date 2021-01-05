import { FETCH_BUCKETS, ADD_BUCKET, SET_CURRENT_BUCKET_ID } from "./types";
import Axios from "axios";

export const fetchAll = () => async dispatch => {
  await Axios.get("http://localhost:1337/bucket",)
    .then(items =>
      dispatch({
        type: FETCH_BUCKETS,
        payload: items.data
      })
    ).catch(error => console.log(error));
};

export const create = (postData) => async dispatch => {
  return await Axios.post(`http://localhost:1337/bucket`, postData)
    .then(items => {
      console.log(items);
      return dispatch({
        type: ADD_BUCKET,
        payload: items.data
      })
    }
    ).catch(error => console.log('axios', error));
};

export const setCurrentBucketId = (currentBucketId) => dispatch => {
  return dispatch({
    type: SET_CURRENT_BUCKET_ID,
    payload: currentBucketId || 'all'
  });
}

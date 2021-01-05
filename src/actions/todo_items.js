import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "./types";
import Axios from "axios";

export const fetchAll = () => async dispatch => {
  await Axios.get("http://localhost:1337/todo",)
    .then(items =>
      //console.log(items);
      dispatch({
        type: FETCH_ITEMS,
        payload: items.data
      })
    ).catch(error => console.log(error));
};

export const deleteItem = (todoId) => async dispatch => {
  await Axios.delete(`http://localhost:1337/todo/${todoId}`, todoId)
    .then(items =>
      //console.log(items);
      dispatch({
        type: DELETE_ITEM,
        payload: items.data
      })
    ).catch(error => console.log(error));
};

export const create = (postData) => async dispatch => {
  console.log('post data', postData)
  return await Axios.post(`http://localhost:1337/todo`, postData)
    .then(items => {
      //console.log(items);
      return dispatch({
        type: ADD_ITEM,
        payload: items.data
      })
    }
    ).catch(error => console.log(error));
};

export const update = (postData) => async dispatch => {
  return await Axios.put(`http://localhost:1337/todo`, postData)
    .then(items => {
      return dispatch({
        type: UPDATE_ITEM,
        payload: items.data
      })
    }
    ).catch(error => console.log(error));
};
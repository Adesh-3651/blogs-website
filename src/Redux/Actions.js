import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAIL = 'FETCH_FAIL'

export const ADD_POST = 'ADD_POST'
export const DEL_POST = 'DEL_POST'

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_POSTS })

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: FETCH_FAIL,
          payload: error.message
        })
      })
  }
}

export const addPost = (title, body) => {
  return {
    type: ADD_POST,
    payload: { title, body }
  }
}

export const delPost = (id) => {
  return {
    type: DEL_POST,
    payload: id
  }
}

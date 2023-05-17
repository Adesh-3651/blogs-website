import { FETCH_POSTS, FETCH_SUCCESS, FETCH_FAIL, ADD_POST, DEL_POST } from './Actions'
  
  const initialState = {
    posts: [],
    isLoading: false,
    error: null
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return {
          ...state,
          isLoading: true,
          error: null
        }
      case FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          posts: action.payload
        }
      case FETCH_FAIL:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        }
      case ADD_POST:
        return {
          ...state,
          posts: [
            ...state.posts,
            { id: state.posts.length + 1, title: action.payload.title, body: action.payload.body }
          ]
        }
      case DEL_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.payload)
        }
      default:
        return state
    }
  }
  
  export default reducer
  
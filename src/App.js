import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, delPost } from './Redux/Actions';
import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const posts = useSelector(state => state.posts);
  const isLoading = useSelector(state => state.isLoading);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = (event) => {
    event.preventDefault();
    if(title === '' || body === '') return posts
    dispatch(addPost(title, body));

    setTitle('');
    setBody('');
  };

  const handleDeletePost = (id) => {
    dispatch(delPost(id));
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyMatch = post.body.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || bodyMatch;
  });

  const sortedPosts = [...filteredPosts].sort((post1, post2) => {
    if (sortBy === 'date') {
      return post2.id - post1.id;
    } else if (sortBy === 'title') {
      return post1.title.localeCompare(post2.title);
    }
    return null
  });

  return (
    <div className='bg-blue-950 text-white min-h-screen max-h-fit min-w-full max-w-fit'>
      <div className='flex justify-between'>
        <h1 className='font-rowdies text-3xl mx-10 my-7 titleTextLow hideAfter300'>AUCTOPUS</h1>
        <h1 className='font-rowdies text-3xl mx-10 my-7 titleTextLow'>BLOGS</h1>
      </div>
      <div className='flex py-5 justify-center w-full content-center' id='wrapSearchAndSort'>
        <div className='flex-[3] mx-7'>
          <input className='px-3 text-black py-1 w-full rounded-md min-w-fit border-2 border-black' placeholder='Start Searching...' type="text" id="search" value={searchTerm} onChange={handleSearchTermChange} />
        </div>
        <div className='flex-[2] flex content-center addLeftMar'>
          <label htmlFor="sort-by" className='font-ubuntu text-md'>Sort By:</label>
          <select id="sort-by" value={sortBy} className='w-36 mx-2 h-fit py-1 rounded-md px-2 font-ubuntu text-sm text-slate-800' onChange={handleSortByChange}>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='flex max-w-[60rem]' id='makeFlexWrap'>
          <div className='flex-[1] border-2 border-blue-400 bg-blue-800 h-fit mx-8 my-5 rounded-md px-3 py-2'>
            <span className='font-ubuntu text-lg'>What's In your Mind Today...?</span>
            <hr className='w-full h-[0.5px] mb-2 mt-1'></hr>
            <form onSubmit={handleAddPost} className='flex flex-col'>
              <input type="text" id="title" className='mb-1 mt-2 border-2 border-black rounded-md px-2 py-1 font-mono text-black' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
              <textarea id="body" value={body} className='my-1 border-2 border-black rounded-md px-2 py-1 font-semibold font-mono text-black' placeholder='Body' onChange={(event) => setBody(event.target.value)}></textarea>
              <button type="submit" className='bg-violet-700 w-fit px-3 py-1 flex content-center my-1 rounded-lg border-2 border-violet-950 font-ubuntu hover:bg-violet-900 transition'>Add Post</button>
            </form>
          </div>
          <div className='flex-[3] my-4 mr-8'>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul id='incLeftMargin'>
                {sortedPosts.map(post => (
                  <li key={post.id} className='flex flex-col bg-blue-800 border-2 border-blue-300 px-4 py-1 pt-3 rounded-md my-1'>
                    <h2 className='font-rubik font-semibold tracking-wider' >{post.title}</h2>
                    <hr className='w-full my-2 border-blue-500'></hr>
                    <p className='font-mukta text-sm' >{post.body}</p>
                    <button className='w-fit bg-red-700 px-3 text-xs rounded-sm font-ubuntu my-1 py-[0.10rem] mt-2' onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedditLinkList from './RedditLinkList';
import { throttle } from 'lodash';
import anime from 'animejs/lib/anime.es.js';


const RedditSearch = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight + 1000) {
      setPage(page + 1);
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [after, setAfter] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const handleSubmit = throttle((e, reset = false) => {
    e.preventDefault();
    if (reset) {
      setPosts([]);
      setAfter('');
      fetchData();
    }
    setPage(1);
    fetchData();
  }, 1000);

  useEffect(() => {
    const loadingAnimation = anime.timeline({
      easing: 'easeOutSine',
      duration: 700,
      autoplay: false,
      loop: true,
    });

    loadingAnimation.add({
      targets: '.loading-line',
      scaleX: [0, 1],
      opacity: [0.5, 1],
    });

    loadingAnimation.add({
      targets: '.loading-line',
      scaleX: [1, 0],
      opacity: [1, 0.5],
    });

    loadingAnimation.play();

    return () => {
      loadingAnimation.pause();
      loadingAnimation.seek(0);
    };
  }, []);



  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://www.reddit.com/r/all/search.json?q=${searchTerm}&type=link&sort=new&after=${after}&count=${posts.length}&page=${page}`)
      .then(response => {
        const newPosts = response.data.data.children.map(child => child.data);
        setPosts([...posts, ...newPosts]);
        setAfter(response.data.data.after);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (searchTerm) {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, posts]);
  


  return (   
    <div className="reddit-search">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for UAP News on Reddit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={(e) => handleSubmit(e, true)} type="submit">Search</button>
        {loading && (
        <div className="loading-animation">
          <div className="loading-line"></div>
        </div>
      )}
      </form>
      <RedditLinkList links={searchResults.length ? searchResults : posts} />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default RedditSearch;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedditLinkList from './RedditLinkList';

const RedditSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [after, setAfter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  const handleSubmit = (e, reset = false) => {
    e.preventDefault();
    if (reset) {
      setPosts([]);
      setAfter('');
    }
    setPage(1);
    fetchData();
  };

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://www.reddit.com/search.json?q=${searchQuery}&type=link&restrict_sr=on`);
    const links = response.data.data.children.map(child => child.data);
    setSearchResults(links);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = (e) => {
    console.log('HandleScroll works')
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage(page + 1);
      console.log(`at bottom and ${page} has incrimented`)
    }
  };

  return (
    <div className="reddit-search" onScroll={handleScroll}>
      <form onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search for UAP News on Reddit"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <RedditLinkList links={searchResults.length ? searchResults : posts} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default RedditSearch;

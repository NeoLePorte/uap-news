import React, { useState, useEffect } from "react";
import RedditSearch from "./RedditSearch";
import RedditLinkList from "./RedditLinkList";

const RedditSearchPage = () => {
  const [searchSubreddits, setSearchSubreddits] = useState(["UFOs", "UAP"]);
  const [subredditLinks, setSubredditLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubredditLinks = async () => {
      setLoading(true);
      setError(null);

      try {
        const subredditLinkArrays = await Promise.all(
          searchSubreddits.map(async (subreddit) => {
            const response = await fetch(
              `https://www.reddit.com/r/${subreddit}/hot.json`
            );
            const json = await response.json();
            return json.data.children.map((post) => ({
              title: post.data.title,
              url: post.data.url,
            }));
          })
        );
        const allLinks = subredditLinkArrays.flat();
        setSubredditLinks(allLinks);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    fetchSubredditLinks();
  }, [searchSubreddits]);

  return (
    <div className="background-video">
      <video autoPlay muted loop>
        <source src="backgroundVid.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="search-container">
        <h1 className="search-title">Search for UAP News on Reddit</h1>
        <RedditSearch
          searchSubreddits={searchSubreddits}
          setSearchSubreddits={setSearchSubreddits}
          setSubredditLinks={setSubredditLinks}
        />
        <RedditLinkList subredditLinks={subredditLinks} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default RedditSearchPage;

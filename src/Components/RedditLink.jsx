import React from 'react';

const RedditLink = ({ link }) => {
  const { title, subreddit_name_prefixed, author, created_utc, permalink } = link;
  const date = new Date(created_utc * 1000);

  return (
    <div className="reddit-link">
      <div className="reddit-link-info">
        <p className="reddit-link-subreddit">{subreddit_name_prefixed}</p>
        <p className="reddit-link-author">{`Posted by u/${author} on ${date.toLocaleDateString()}`}</p>
      </div>
      <a className="reddit-link-title" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
};

export default RedditLink;

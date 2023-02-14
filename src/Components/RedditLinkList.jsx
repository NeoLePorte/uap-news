import React from 'react';
import RedditLink from './RedditLink';

const RedditLinkList = ({ links }) => {
  return (
    <div className="link-list">
      {!links ? (
        <p>No links found</p>
      ) : (
        links.map((link, index) => (
          <RedditLink key={index} link={link} />
        ))
      )}
    </div>
  );
};

export default RedditLinkList;

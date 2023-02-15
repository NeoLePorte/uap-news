import React, { forwardRef } from 'react';
import anime from 'animejs';
  const RedditLink = forwardRef(({ link }, ref) => {
  const { title, subreddit_name_prefixed, author, created_utc, permalink } = link;
  const date = new Date(created_utc * 1000);
  const linkRef = React.useRef(ref);
   React.useEffect(() => {
    console.log(linkRef.current);
     const animation = anime({
       targets: linkRef.current,
       opacity: [0, 1],
       translateX: [-500, 0],
       easing: 'easeOutExpo',
       duration: 1000,
       delay: anime.stagger(100),
       
     });
     return () => {
       animation.pause();
     };
   }, [link]);
   return (
     <div className="reddit-link" ref={ref}>
       <div className="reddit-link-info">
         <p className="reddit-link-subreddit">{subreddit_name_prefixed}</p>
         <p className="reddit-link-author">{`Posted by u/${author} on ${date.toLocaleDateString()}`}</p>
       </div>
       <a className="reddit-link-title" href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
         {title}
       </a>
     </div>
   );
  });

  export default RedditLink;

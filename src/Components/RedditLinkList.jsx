import React, { forwardRef } from 'react';
import RedditLink from './RedditLink';
import anime from 'animejs';
import { v4 as uuidv4 } from 'uuid';


const RedditLinkList = forwardRef(({ links }, ref) => {
  const listRef = React.useRef(ref);
console.log(listRef)
  React.useEffect(() => {
    const animation = anime({

      targets: listRef.current,
      opacity: [0, 1],
      translateX: [-50, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(100),
    });

    return () => {
      animation.pause();
    };
  }, [links]);

  return (
    <div className="link-list" ref={ref}>
      {!links ? (
        <p>No links found</p>
      ) : (
        links.map((link, index) => (
          <RedditLink key={uuidv4(index)} link={link} ref={listRef} />
        ))
      )}
    </div>
  );
});

export default RedditLinkList;


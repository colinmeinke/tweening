import easingFuncFromName from './easingFuncFromName';
import tweenGenerator from './tweenGenerator';
import { middlewareIn, middlewareOut } from './middleware';

const tween = ({ duration = 200, complete, easing = 'easeInOutQuad', from, middleware = [], next, to }) => {
  if ( typeof duration !== 'number' || duration <= 0 || duration == Infinity ) {
    throw new Error( 'Duration must be a positive number less than infinity' );
  }

  const easingFunc = typeof easing === 'function' ? easing : easingFuncFromName( easing );

  const g = tweenGenerator({
    duration,
    easing: easingFunc,
    from: middleware.length ? middlewareIn( from, middleware ) : from,
    to: middleware.length ? middlewareIn( to, middleware ) : to,
  });

  const animate = () => {
    const { done, value } = g.next();

    const v = middleware.length ? middlewareOut( value, middleware ) : value;

    if ( done ) {
      if ( typeof next === 'function' ) {
        next( to );
      }

      if ( typeof complete === 'function' ) {
        complete();
      }
    } else {
      if ( typeof next === 'function' ) {
        next( v );
      }

      window.requestAnimationFrame( animate );
    }
  };

  window.requestAnimationFrame( animate );
};

export default tween;

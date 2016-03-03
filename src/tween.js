import easingFuncFromName from './easingFuncFromName';
import tweenGenerator from './tweenGenerator';

const tween = ({ duration = 200, complete, easing = 'easeInOutQuad', from, next, to }) => {
  if ( typeof duration !== 'number' || duration <= 0 || duration == Infinity ) {
    throw new Error( 'Duration must be a positive number less than infinity' );
  }

  const easingFunc = typeof easing === 'function' ? easing : easingFuncFromName( easing );

  const g = tweenGenerator({ duration, easing: easingFunc, from, to });

  const animate = () => {
    const { done, value } = g.next();

    if ( done ) {
      if ( typeof next === 'function' ) {
        next( to );
      }

      if ( typeof complete === 'function' ) {
        complete();
      }
    } else {
      if ( typeof next === 'function' ) {
        next( value );
      }

      window.requestAnimationFrame( animate );
    }
  };

  window.requestAnimationFrame( animate );
};

export default tween;

import match from './match';

const tweenGenerator = function* ({ duration, easing, from, to }) {
  const start = Date.now();

  while ( Date.now() - start < duration ) {
    const time = Date.now() - start;

    yield match( from, to, ( a, b ) => {
      return easing.call( null, time, a, b, duration );
    });
  }
};

export default tweenGenerator;

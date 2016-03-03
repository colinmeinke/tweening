const match = ( a, b, func ) => {
  if ( Array.isArray( a ) && Array.isArray( b )) {
    const result = [];

    for ( let i = 0, l = a.length; i < l; i++ ) {
      result.push( match( a[ i ], b[ i ], func ));
    }

    return result;
  } else if ( typeof a === 'object' && typeof b === 'object' && a !== null && b !== null ) {
    const result = {};

    for ( let k of Object.keys( a )) {
      result[ k ] = match( a[ k ], b[ k ], func );
    }

    return result;
  } else if ( typeof a === 'number' && typeof b === 'number' ) {
    return func( a, b );
  }

  return a;
}

export default match;

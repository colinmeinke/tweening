const middlewareIn = (value, middleware) => {
  if (Array.isArray(value)) {
    const result = []

    for (let i = 0, l = value.length; i < l; i++) {
      result.push(middlewareIn(value[ i ], middleware))
    }

    return result
  } else if (typeof value === 'object' && value !== null) {
    const result = {}

    for (let k of Object.keys(value)) {
      result[ k ] = middlewareIn(value[ k ], middleware)
    }

    return result
  } else if (typeof value === 'number' || typeof value === 'string') {
    return middleware.reduce((v, { i }) => i(v), value)
  }

  return value
}

const middlewareOut = (value, middleware) => {
  if (Array.isArray(value)) {
    const result = []

    for (let i = 0, l = value.length; i < l; i++) {
      result.push(middlewareOut(value[ i ], middleware))
    }

    return result
  } else if (typeof value === 'object' && value !== null) {
    if (value.middleware) {
      return middleware.filter(({ name }) => name === value.middleware)
        .reduce((v, { o }) => o(v), value)
    } else {
      const result = {}

      for (let k of Object.keys(value)) {
        result[ k ] = middlewareOut(value[ k ], middleware)
      }

      return result
    }
  }

  return value
}

export { middlewareIn, middlewareOut }

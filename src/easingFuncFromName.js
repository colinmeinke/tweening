import easingFunctions from 'tween-functions'

const easingFuncFromName = name => {
  const func = easingFunctions[ name ]

  if (typeof func !== 'function') {
    throw new Error(`Easing function ${name} does not exist`)
  }

  return func
}

export default easingFuncFromName

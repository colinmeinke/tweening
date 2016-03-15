# Tweening

A little tweening library.

**1.9kb gzipped.**

However, you're currently also going to have to bring
[babel polyfill](https://cdnjs.com/libraries/babel-polyfill)
to the party at an additional 30.8kb gzipped. This is to
support Javascript generators which this library makes use of.

## Installation

```
npm install tweening
```

## Usage

```js
import tween from 'tweening';

tween({
  duration: 100,
  from: 1,
  to: 1000,
  next: value => console.log( value );
  complete: () => console.log( 'all done' );
});
```

Tweening can also handle arrays and objects. Even if they're
nested. The only requirement is that `from` and `to` both need
to be of the same structure.

```js
import tween from 'tweening';

tween({
  from: { x: 10, y: 100, z: [ 1, 2, 3 ]},
  to: { x: 500, y: 50, z: [ 9, 8, 7 ]},
  next: value => console.log( value );
});
```

## Options

### duration

**The duration of the tween in milliseconds.**

- default: *200*
- type: *number*

### from

**Where you're tweening from.**

- required
- types:
  - *number*
  - *array* (of numbers)
  - *object* (of number values)
  - any nested combination of the above

### to

**Where you're tweening to.**

- required
- types:
  - *number*
  - *array* (of numbers)
  - *object* (of number values)
  - any nested combination of the above

### next

**A callback that fires at each step of the tween.**

The callback is passed the updated value.

Typically this is where you'd update the state / position
of an element on your page.

- type: *function*

### complete

**A callback that fires once the tween has completed.**

- type: *function*

### easing

**A function that calculates a position given time.**

- default: *easeInOutQuad*
- types:
  - *string*
  - *function*

## Easing functions

Tweening comes with a number of
[Robert Penner's easing functions](http://robertpenner.com/easing)
baked in, thanks to the
[tween functions library](https://github.com/chenglou/tween-functions).
You can pass in any of the following strings to the
[easing option](#easing).

- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
- easeInSine
- easeOutSine
- easeInOutSine
- easeInExpo
- easeOutExpo
- easeInOutExpo
- easeInCirc
- easeOutCirc
- easeInOutCirc
- easeInElastic
- easeOutElastic
- easeInOutElastic
- easeInBack
- easeOutBack
- easeInOutBack
- easeInBounce
- easeOutBounce
- easeInOutBounce

The [easing option](#easing) also allows you to pass in an
easing function of your own. It should return the current
position given:

- **t**: milliseconds since tween started
- **b**: start position
- **e**: desired end position
- **d**: duration of tween in milliseconds

```js
f( t, b, e, d )
```

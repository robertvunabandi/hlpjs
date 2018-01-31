# hlpjs

`hlpjs` is a simple NodeJS / Javascript backend validators and asserter module.

[![Build Status](https://travis-ci.org/robertvunabandi/hlpjs.svg?branch=master)](https://travis-ci.org/robertvunabandi/hlpjs)
[![npm version](https://badge.fury.io/js/hlpjs.svg)](https://www.npmjs.com/package/hlpjs)

## Installation

Run:
```bash
npm install --save hlpjs
```

Then, in your javascript file: 

```javascript
const hlp = require('hlpjs');
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Documentations & Methods 

For all of the following methods, assume we called `const hlp = require('hlpjs')`. For each method, I listed the purpose along with the return type (or **`{void}`**) in bold brackets (**`{return type}`**), then parameters, then the usage of the method, and sometimes an example. In case a method throws error, I indicated it with *`[throws]`*.

A couple of definitions:
- `Any`: This is any type. It can be a `Function`, `Object`, `Array`, `Number`, etc. 
- `Primitive`: A primitive type. These are `null`, `undefined`, `String`, and `Number`. They are "primitive" because they can be checked for equality with `===` against another primitive.

**NOTE: The documentation below will offer examples. However, the documentation in the code is very much more detailed about what the requirements / outcomes of the methods will be. Using an IDE such as IDEA PHPStorm or WebStorm helps.**

### Table of Contents for Documentations

`This will be added in the future if REALLY needed`

### Regular Methods

#### throw
**`{void}`** Throw an error with constructor ErrorInstance with the given message. 
- `message`: String.
- `ErrorInstance`: Error constructor to throw.

```javascript
hlp.throw (message, ErrorInstance = Error)
```


#### isBoolean
**`{Boolean}`** Check if the `arg` is a Boolean. 
- `arg`: Any.

```javascript
hlp.isBoolean (arg)
```


#### isNumber
**`{Boolean}`** Check if the `arg` is a usable Javascript `Number` that is not `NaN`. 
- `arg`: Any.

```javascript
hlp.isNumber (arg)
```

#### isInteger
**`{Boolean}`** Check if the argument is an integer.  
- `arg`: Any.
```javascript
hlp.isInteger (arg)
```

#### isNull
**`{Boolean}`** Check if the argument is `null`.
- `arg`: Any.
```javascript
hlp.isNull (arg)
```

#### isUndefined
**`{Boolean}`** Check if the argument is `undefined`. 
- `arg`: Any.
```javascript
hlp.isUndefined (arg)
```

#### isString
**`{Boolean}`** Check if the argument is a `String`. 
- `arg`: Any.
```javascript
hlp.isString (arg)
```

#### isArray
**`{Boolean}`** Check if the argument is an `Array`. 
- `arg`: Any.
```javascript
hlp.isArray (arg)
```

#### isPrimitive
**`{Boolean}`** Check if the argument is an `Primitive`. 
- `arg`: Any.
```javascript
hlp.isPrimitive (arg)
```
#### Primitive
**`{void}`** *`[throws]`* Create an instance of `Primitive` type. It will throw an error if `arg` is not `Primitive`. *This is not meant to be used. It was created to be used on jsdocs.* 
- `arg`: Any.
```javascript
hlp.Primitive(arg)
```

#### hasStringLength
**`{Boolean}`** *`[throws]`* Checks if `str` has the length `exp_len`. This throws if any of the parameter types is invalid. 
- `str`: String
- `exp_len`: Integer
```javascript
hlp.hasStringLength (str, exp_len)
```

#### extendString
**`{String}`** *`[throws]`* Takes `str_or_num`, converts it into `String`, then expands it (if needed) so that the length of the string is equal to `desired_length` by appending `additional_character` at the beginning of the string multiple times. This throws if any of the parameter types is invalid.
- `str_or_num`: String | Number
- `desired_length`: Integer
- `addition_character`: String, *this must be of length 1.*
```javascript
hlp.extendString (desired_length, str_or_num, addition_character = ' ')
```
Examples: 
```javascript
hlp.extendString (5, 'cone'); // ' con'
hlp.extendString (5, 'cone', 0); // '0cone'
hlp.extendString (4, 'cone'); // 'cone'
hlp.extendString (4, 'conecodecode'); // 'conecodecode'
hlp.extendString (4, 'e', 'o'); // 'oooe'
```

#### containsNonNumeric
**`{Boolean}`** *`[throws]`* Checks if `str` contains non-numeric characters (anything other than 0,1,2,3,4,5,6,7,8,9). This throws if any of the parameter types is invalid.
- `str`: String
```javascript
hlp.containsNonNumeric (str)
```
Examples: 
```javascript
hlp.containsNonNumeric ('cone'); // true
hlp.containsNonNumeric ('124'); // false
hlp.containsNonNumeric ('12.4'); // true
```

#### convertStringToNumber
**`{Number}`** *`[throws]`* Converts `str` into a number.  This throws if the string contains non-numeric characters (as that cannot be converted) except for up to one point (i.e. `.`). This throws if any of the parameter types is invalid.
- `str`: string
```javascript
hlp.convertStringToNumber (str)
```
#### isPrimitiveArgInArray
**`{Boolean}`** *`[throws]`* Checks if `arg` is in `arr`. `arr` needs to be an array of `Primitive`. This throws if any of the parameter types is invalid. 
- `primitive`: Primitive
- `arr`: Array<Primitive>
```javascript
hlp.isPrimitiveArgInArray (primitive, arr)
```
Examples: 
```javascript
hlp.isPrimitiveArgInArray ('cone', ['cone']); // true
hlp.isPrimitiveArgInArray ('conee', ['cone']); // false
hlp.isPrimitiveArgInArray ({}, ['cone']); // throws error
hlp.isPrimitiveArgInArray ('cone', [{}]); // throws error
```

#### arePrimitiveArgsEqual
**`{Boolean}`** *`[throws]`* Checks if the two primitives are equal. This throws if any of the parameter types is invalid.
- `primitive1`: Primitive
- `primitive2`: Primitive
```javascript
hlp.arePrimitiveArgsEqual (primitive1, primitive2)
```

### Asserters

These method throw errors when the condition to be asserted is not met. These methods are found under the key `assert`. For example, 
```javascript
const hlp = require('hlpjs');
hlp.assert.argIsInteger('14'); // throws an error
```
Most assert methods have 3 arguments while some of a 4 arguments parameters. All asserters' last 2 parameters are `message` and `ErrorInstance`. 
- `message`: The message you want to be printed out in case the assertion fails
- `ErrorInstance`: The Error instance to be thrown in case the assertion fails.
    So, you have the flexibility of choosing what type of error to throw with
    what message. The only catch is that `ErrorInstance.prototype` must be an 
    instance of JavaScript's `Error` constructor. I.e., the check 
    `ErrorInstance.prototype instanceof Error` is made prior to throwing this.
    In case it's not, it will fall back to `Error`. 

All asserter methods throw an error when the expected argument type is invalid.

Assuming we called `const hlp = require('hlpjs')`, here are the methods:

#### argIsNumber
**`{void}`** *`[throws]`* Throws when `arg` is not a number.
- `arg`: Any
```javascript
hlp.assert.argIsNumber (arg, message = null, ErrorInstance = null)
```
#### argIsInteger
**`{void}`** *`[throws]`* Throws when `arg` is not an integer as defined in `hlp.isInteger(...)`.
- `arg`: Any
```javascript
hlp.assert.argIsInteger (arg, message = null, ErrorInstance = null)
```
#### argIsNull
**`{void}`** *`[throws]`* Throws when `arg` is not null.
- `arg`: Any
```javascript
hlp.assert.argIsNull (arg, message = null, ErrorInstance = null)
```

#### argIsNotNull
**`{void}`** *`[throws]`* Throws when `arg` is null.
- `arg`: Any
```javascript
hlp.assert.argIsNotNull (arg, message = null, ErrorInstance = null)
```

#### argIsNotUndefined
**`{void}`** *`[throws]`* Throws when `arg` is undefined.
- `arg`: Any
```javascript
hlp.assert.argIsNotUndefined (arg, message = null, ErrorInstance = null)
```

#### argIsString
**`{Boolean}`** *`[throws]`* Throws when `arg` is not a String.
- `arg`: Any
```javascript
hlp.assert.argIsString (arg, message = null, ErrorInstance = null)
```

#### argIsArray
**`{void}`** *`[throws]`* Throws when `arg` is not an Array.
- `arg`: Any
```javascript
hlp.assert.argIsArray (arg, message = null, ErrorInstance = null)
```

#### argIsPrimitive
**`{void}`** *`[throws]`* Throws when `arg` is not primitive as defined with `hlp.isPrimitive(...)`.
- `arg`: Any
```javascript
hlp.assert.argIsPrimitive(arg, message = null, ErrorInstance = null)
```
#### stringHasLength
**`{void}`** *`[throws]`* Throws when `str` does not have length `exp_len`.
- `str`: String
- `exp_len`: Integer
```javascript
hlp.assert.stringHasLength (str, exp_len, message = null, ErrorInstance = Error)
```
#### stringContainsOnlyNumeric
**`{void}`** *`[throws]`* Throws when `str` contains non-numeric characters.
- `str`: String
```javascript
hlp.assert.stringContainsOnlyNumeric (str, message = null, ErrorInstance = Error)
```
#### primitivesAreEqual
**`{void}`** *`[throws]`* Throws when `prim1` does not equal `prim2`.
- `prim1`: Primitive 
- `prim2`: Primitive 
```javascript
hlp.assert.primitivesAreEqual (prim1, prim2, message = null, ErrorInstance = Error)
```


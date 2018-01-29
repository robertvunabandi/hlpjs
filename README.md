# hlpjs

`hlpjs` is a simple NodeJS / Javascript backend validators and asserter module.

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

More details on this are to be added.
This code *softly* follows the standard set by [node-style-guide](https://github.com/felixge/node-style-guide).

## Documentations & Methods 

**NOTE: More details about each method will be added. This work is under progress but not completed.**

For all of the following methods, assume we called `const hlp = require('hlpjs')`. For each method, I listed the purpose along with the return type (or **`{void}`**) in bold brackets (**`{return type}`**), then parameters, then the usage of the method, and sometimes an example. In case a method throws error, I indicated it with *`[throws]`*.

A couple of definitions:
- `Any`: This is any type. It can be a `Function`, `Object`, `Array`, `Number`, etc. 
- `Primitive`: A primitive type. These are `null`, `undefined`, `String`, and `Number`. They are "primitive" because they can be checked for equality with `===` against another primitive.

**NOTE: The documentation below will offer examples. However, the documentation in the code is very much more detailed about what the requirements / outcomes of the methods will be. Using an IDE such as IDEA PHPStorm or WebStorm helps.**

### Table of Contents for Documentations

`This will be added in the near future`

### Regular Methods

#### throw
**`{void}`** Simply throw an error with constructor ErrorInstance with the given message. 
- `message`: String.
- `ErrorInstance`: Error constructor to throw.

```javascript
hlp.throw (message, ErrorInstance = Error)
```

#### isNumber
**`{Boolean}`** Check if the argument is a usable Javascript `Number` that is not `NaN`. 
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
**`{void}`** *`[throws]`* Create an instance of `Primitive` type. *This is not meant to be used.* It will throw an error if `arg` is not `Primitive`.
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
**`{String}`** *`[throws]`* Takes `str_or_num`, converts it into `String`, then expands it (if needed) so that the length of the string is equal to the desired length by appending `additional_character` at the beginning of the string multiple times. This throws if any of the parameter types is invalid.
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
hlp.extendString (4, 'e', 'o'); // 'oooe'
```

#### containsNonNumeric
**`{Boolean}`** *`[throws]`* Checks if `str` contains non-numeric characters (anything other than 0,1,2,3,4,5,6,7,8,9). This throws if any of the parameter types is invalid. 
- `str`: String
```javascript
hlp.containsNonNumeric (str)
```
#### convertStringToNumber
**`{Number}`** *`[throws]`* Converts the `str` into a number. This throws if any of the parameter types is invalid. It also throw if the string contains non-numeric characters (as that cannot be converted) except for a point (i.e. `.`).
- `str`: string
```javascript
hlp.convertStringToNumber (str)
```
#### isPrimitiveArgInArray
**`{Boolean}`** *`[throws]`* Converts the `str`. This throws if any of the parameter types is invalid. `arr` needs to be an array of `Primitive`.
- `primitive`: Primitive
- `arr`: Array<Primitive>
```javascript
hlp.isPrimitiveArgInArray (primitive, arr)
```
#### arePrimitiveArgsEqual
**`{Boolean}`** *`[throws]`* Checks if the two primitives are equal. This throws if any of the parameter types is invalid. 
- `primitive1`: Primitive
- `primitive2`: Primitive
```javascript
hlp.arePrimitiveArgsEqual (primitive1, primitive2)
```

### Asserters

These method basically throw an error when the condition to be asserted is not met. These methods are found under the key `assert`. For example, 
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

Assuming we called `const hlp = require('hlpjs')`, here are the methods:

**(`DOCUMENTATION ARE TO BE ADDED FOR EACH`)**

#### argIsNumber
```javascript
hlp.assert.argIsNumber (arg, message = null, ErrorInstance = null)
```
#### argIsInteger
```javascript
hlp.assert.argIsInteger (arg, message = null, ErrorInstance = null)
```
#### argIsNull
```javascript
hlp.assert.argIsNull (arg, message = null, ErrorInstance = null)
```
#### argIsNotNull
```javascript
hlp.assert.argIsNotNull (arg, message = null, ErrorInstance = null)
```
#### argIsNotUndefined
```javascript
hlp.assert.argIsNotUndefined (arg, message = null, ErrorInstance = null)
```
#### argIsString
```javascript
hlp.assert.argIsString (arg, message = null, ErrorInstance = null)
```
#### argIsArray
```javascript
hlp.assert.argIsArray (arg, message = null, ErrorInstance = null)
```
#### argIsPrimitive
```javascript
hlp.assert.argIsPrimitive(arg, message = null, ErrorInstance = null)
```
#### stringHasLength
```javascript
hlp.assert.stringHasLength (string, exp_len, message = null, ErrorInstance = Error)
```
#### stringContainsOnlyNumeric
```javascript
hlp.assert.stringContainsOnlyNumeric (string, message = null, ErrorInstance = Error)
```
#### primitivesAreEqual 
```javascript
hlp.assert.primitivesAreEqual (prim1, prim2, message = null, ErrorInstance = Error)
```
#### hasStringLength
```javascript
hlp.assert.hasStringLength (string, exp_len)
```
#### extendString
```javascript
hlp.assert.extendString (desired_length, str_or_num, addition_character = ' ')
```
#### containsNonNumeric
```javascript
hlp.assert.containsNonNumeric (str)
```
#### convertStringToNumber
```javascript
hlp.assert.convertStringToNumber (str)
```
#### isPrimitiveArgInArray
```javascript
hlp.assert.isPrimitiveArgInArray (arg, array)
```
#### arePrimitiveElsEqual
```javascript
hlp.assert.arePrimitiveElsEqual(prim1, prim2)
```


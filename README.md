# hlpjs

`hlpjs` is a simple NodeJS / Javascript backend validators and asserter module.

## Installation

```bash
npm install hlpjs
```
or
```bash
npm install --save hlpjs
```

Then, in your javascript file: 

```javascript
const hlp = require('hlpjs');
```

## Contributing

More details on this are to be added.

## Documentations & Methods 

**NOTE: More details about each method will be added. This work is under progress.**

NOTE: The documentation below will offer examples. However, the documentation in the code is very much more detailed about what the requirements / outcomes of the methods will be. Using an IDE such as IDEA PHPStorm or WebStorm helps. 

### Normal Methods

For all of the following methods, assume we called `const hlp = require('hlpjs');`:

#### throw
```javascript
hlp.throw (message, ErrorInstance = Error)
```
#### isNumber
```javascript
hlp.isNumber (arg)
```
#### isInteger
```javascript
hlp.isInteger (arg)
```
#### isNull
```javascript
hlp.isNull (arg)
```
#### isUndefined
```javascript
hlp.isUndefined (arg)
```
#### isString
```javascript
hlp.isString (arg)
```
#### isArray
```javascript
hlp.isArray (arg)
```
#### isPrimitive
```javascript
hlp.isPrimitive (el)
```
#### Primitive
```javascript
hlp.Primitive(el)
```
#### hasStringLength
```javascript
hlp.hasStringLength (string, exp_len)
```
#### extendString
```javascript
hlp.extendString (desired_length, str_or_num, addition_character = ' ')
```
#### containsNonNumeric
```javascript
hlp.containsNonNumeric (string)
```
#### convertStringToNumber
```javascript
hlp.convertStringToNumber (string)
```
#### isPrimitiveElInArray
```javascript
hlp.isPrimitiveElInArray (el, array)
```
#### arePrimitiveElsEqual
```javascript
hlp.arePrimitiveElsEqual (el1, el2)
```

### Asserters

These method basically throw an error when the condition to be asserted
is not met. These methods are found under the key `assert`. For example, 
```javascript
const hlp = require('hlpjs');
hlp.assert.elIsInteger('14'); // throws an error
```
Most assert methods have 3 arguments while some of a 4 arguments parameters.
All asserters' last 2 parameters are `message` and `ErrorInstance`. 
- `message`: The message you want to be printed out in case the assertion fails
- `ErrorInstance`: The Error instance to be thrown in case the assertion fails.
    So, you have the flexibility of choosing what type of error to throw with
    what message. The only catch is that `ErrorInstance.prototype` must be an 
    instance of JavaScript's `Error` constructor. I.e., the check 
    `ErrorInstance.prototype instanceof Error` is made prior to throwing this.
    In case it's not, it will fall back to `Error`. 
    
Assuming we called `const hlp = require('hlpjs');`, here are the methods:

#### elIsNumber
```javascript
hlp.assert.elIsNumber (el, message = null, ErrorInstance = null)
```
#### elIsInteger
```javascript
hlp.assert.elIsInteger (el, message = null, ErrorInstance = null)
```
#### elIsNull
```javascript
hlp.assert.elIsNull (el, message = null, ErrorInstance = null)
```
#### elIsNotNull
```javascript
hlp.assert.elIsNotNull (el, message = null, ErrorInstance = null)
```
#### elIsNotUndefined
```javascript
hlp.assert.elIsNotUndefined (el, message = null, ErrorInstance = null)
```
#### elIsString
```javascript
hlp.assert.elIsString (el, message = null, ErrorInstance = null)
```
#### elIsArray
```javascript
hlp.assert.elIsArray (el, message = null, ErrorInstance = null)
```
#### elIsPrimitive
```javascript
hlp.assert.elIsPrimitive(el, message = null, ErrorInstance = null)
```
#### stringHasLength
```javascript
hlp.assert.stringHasLength (string, exp_len, message = null, ErrorInstance = Error)
```
#### strContainsOnlyNumeric
```javascript
hlp.assert.strContainsOnlyNumeric (string, message = null, ErrorInstance = Error)
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
#### isPrimitiveElInArray
```javascript
hlp.assert.isPrimitiveElInArray (el, array)
```
#### arePrimitiveElsEqual
```javascript
hlp.assert.arePrimitiveElsEqual(el1, el2)
```


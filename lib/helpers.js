'use strict';

const hlp = {

  /*
  throw method
  */
  throw (message, ErrorInstance = Error) {
    if (ErrorInstance.prototype instanceof Error) {
      throw new ErrorInstance(message);
    }
    throw new Error(message);
  },

  /*
  base utils:
  These methods are "base" because they do not throw errors
  */

  /**
   * @tested
   * Simply check if the given argument is a usable number.
   * This returns false for NaN
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isNumber (arg) {
    if (typeof arg === 'number') {
      return !isNaN(parseFloat(arg));
    }
    return false;
  },
  /**
   * @tested
   * Simply check if the given arg is an integer if it's of type arg.
   *
   * @param {Object} arg
   * @return {Boolean}
   **/

  isInteger (arg) {
    if (hlp.isNumber(arg)) {
      return parseInt(arg) === arg;
    }
    return false;
  },
  /**
   * @tested
   * Simply check if the argument is null
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isNull (arg) {
    return arg === null;
  },
  /**
   * @tested
   * Simply check if the argument is undefined
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isUndefined (arg) {
    if (arg) {
      return false;
    }
    return arg === undefined;
  },
  /**
   * @tested
   * Simply check if the argument is a String
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isString (arg) {
    return typeof arg === 'string';
  },
  /**
   * @tested
   * Simply check if the argument is a String
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isArray (arg) {
    return Array.isArray(arg);
  },
  /**
   * @tested
   * This method checks if an element is of primitive type.
   * i.e. String, Number, null, or undefined.
   *
   * @param {Object} el
   * @return {Boolean}
   **/
  isPrimitive (el) {
    return hlp.isString(el) ||
      hlp.isNumber(el) ||
      hlp.isNull(el) ||
      hlp.isUndefined(el);
  },
  /**
   * Defining a primitive type so that we can add it to jsdocs
   * @constructor
   **/
  Primitive (el) {
    hlp.assert.elIsPrimitive(el, 'el must be of Primitive type to be declared primitive');
    this.el = el;
    this.is_primitive = true;
  },

  /*
  advanced utils:
  These methods are not "base" because they throw errors
  */

  /**
   * @tested
   * Simply check if the string argument is of length exp_len
   *
   * @param {String} string
   * @param {Number} exp_len
   * @return {Boolean}
   * @throws {TypeError} when the argument are invalid
   **/
  hasStringLength (string, exp_len) {
    if (hlp.isString(string) && hlp.isInteger(exp_len)) {
      return string.length === exp_len;
    }
    hlp.throw('Invalid parameter args: must be String for string and Number for exp_len', TypeError);
  },
  /**
   * @tested
   * Simple extend the given argument to a length that is equal
   * to the desired length by adding the addition character to
   * the beginning of the string. If the str_or_num has already
   * a length equal or greater than the desired_length, this
   * method will return the same str_or_num as a string.
   *
   * @param {Number} desired_length
   * @param {Number|String} str_or_num
   * @param {Number|String} addition_character (default: ' ') of length 1
   * @return {String}
   * @throws {Error|TypeError} When parameters are invalid
   **/
  extendString (desired_length, str_or_num, addition_character = ' ') {
    // checks if this is a valid desired_length parameter
    hlp.assert.elIsInteger(desired_length, 'Invalid type argument for desired_length: must be int', TypeError);

    let result;
    // checks if this is a valid obs parameter
    if (hlp.isInteger(str_or_num)) {
      result = str_or_num.toString();
    } else if (hlp.isString(str_or_num)) {
      result = str_or_num;
    } else {
      hlp.throw('Invalid type argument for obs', TypeError);
    }

    // return if our length is already valid
    if (desired_length <= result.length) {
      return result;
    }

    // check for a valid addition_character parameter this will throw an
    // error if add, which is the input addition_character converted to
    // string, is not a string or a string of length 1
    const addition_char = hlp.isInteger(addition_character) ?
      addition_character.toString() :
      addition_character;

    hlp.assert.elIsString(addition_char, 'addition_character must be a String', TypeError);
    hlp.assert.stringHasLength(addition_char, 1, 'addition_character must be a string of length 1');

    // extend the number with the addition_character
    while (result.length < desired_length) {
      result = addition_character + result;
    }
    return result;
  },
  /**
   * @tested
   * Checks if the given strings contains non numeric characters
   *
   * @param {String} string
   * @return {Boolean}
   * @throws {Error} When argument is not a string
   **/
  containsNonNumeric (string) {
    hlp.assert.elIsString(string, 'argument must be of type String');
    return string.match(/\D/) !== null;
  },
  /**
   * @tested
   * converts a string to a number
   *
   *
   * @param {String} string
   * @return {Number}
   * @throws {Error} if the argument is not a string
   * @throws {Error} if the argument is a string that contains non-numeric characters
   **/
  convertStringToNumber (string) {
    hlp.assert.elIsString(string);
    hlp.assert.strContainsOnlyNumeric(string);
    return parseFloat(string);
  },
  /**
   * @tested
   * checks if the Primitive element is contained in the array of Primitive elements
   *
   *
   * @param {hlp.Primitive} el
   * @param {Array<hlp.Primitive>} array
   * @return {Boolean}
   * @throws {Error} if el is not Primitive or the array contains a non-primitive element
   **/
  isPrimitiveElInArray (el, array) {
    hlp.assert.elIsPrimitive(el, 'element must be of Primitive type');
    for (let test_el of array) {
      hlp.assert.elIsPrimitive(test_el, `test_element (${test_el}) must be of Primitive type`);
      if (el === test_el) {
        return true;
      }
    }
    return false;
  },
  /**
   * @tested
   * checks if the Primitive element is contained in the array of Primitive elements
   *
   * @param {hlp.Primitive} el1
   * @param {hlp.Primitive} el2
   * @return {Boolean}
   * @throws {Error} if els arent Primitive
   **/
  arePrimitiveElsEqual (el1, el2) {
    hlp.assert.elIsPrimitive(el1);
    hlp.assert.elIsPrimitive(el2);
    return el1 === el2;
  },

  /**
   * Parameters that are repeated
   * {String} message: message to display in case the assert method throws
   *    each method has a default throw message.
   * {Error} ErrorInstance: An instance of error (i.e. ErrorInstance.prototype
   *    is an instance of Error). The argument throws an Error of this instance.
   *    This is default to Error, but can be any of:
   *    TypeError|EvalError|RangeError|SyntaxError|ReferenceError|URIError
   *    if that condition is valid. */
  assert: {
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not a number */
    elIsNumber (el, message = null, ErrorInstance = null) {
      if (!hlp.isNumber(el)) {
        hlp.throw(message || 'element arg was not a number', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not an integer */
    elIsInteger (el, message = null, ErrorInstance = null) {
      if (!hlp.isInteger(el)) {
        hlp.throw(message || 'element arg was not an integer', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not null */
    elIsNull (el, message = null, ErrorInstance = null) {
      if (!hlp.isNull(el)) {
        hlp.throw(message || 'element arg was not null', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is null */
    elIsNotNull (el, message = null, ErrorInstance = null) {
      if (hlp.isNull(el)) {
        hlp.throw(message || 'element arg was null', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is undefined */
    elIsNotUndefined (el, message = null, ErrorInstance = null) {
      if (hlp.isUndefined(el)) {
        hlp.throw(message || 'element arg was undefined', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not a String */
    elIsString (el, message = null, ErrorInstance = null) {
      if (!hlp.isString(el)) {
        hlp.throw(message || 'element arg was not a String', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not an Array */
    elIsArray (el, message = null, ErrorInstance = null) {
      if (!hlp.isArray(el)) {
        hlp.throw(message || 'element arg was not an Array', ErrorInstance);
      }
    },
    /**
     * @param {Object} el
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when el is not of type 'hlp.Primitive' */
    elIsPrimitive (el, message = null, ErrorInstance = null) {
      if (!hlp.isPrimitive(el)) {
        hlp.throw(message || 'element arg was Primitive', ErrorInstance);
      }
    },
    /**
     * @param {String} str
     * @param {Number} exp_len (Integer)
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when the string length is not exp_len */
    stringHasLength (str, exp_len, message = null, ErrorInstance = Error) {
      if (!hlp.hasStringLength(str, exp_len)) {
        hlp.throw(message || `string ${str} does not have length ${exp_len}`, ErrorInstance);
      }
    },
    /**
     * @param {String} str
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when string contains non numeric characters */
    strContainsOnlyNumeric (str, message = null, ErrorInstance = Error) {
      if (hlp.containsNonNumeric(str)) {
        hlp.throw(message || `string ${str} contains non-numeric characters`, ErrorInstance);
      }
    },
    /**
     * @param {hlp.Primitive} prim1
     * @param {hlp.Primitive} prim2
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when the two primitive type arguments are not equal */
    primitivesAreEqual (prim1, prim2, message = null, ErrorInstance = Error) {
      if (!hlp.arePrimitiveElsEqual(prim1, prim2)) {
        hlp.throw(message || `${prim1} and ${prim2} are not equal`, ErrorInstance);
      }
    }
  },
};

module.exports = hlp;
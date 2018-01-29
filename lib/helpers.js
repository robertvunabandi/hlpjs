'use strict';

const hlp = {

  /**
   * Simply throw an error with constructor ErrorInstance with the given message
   * This will only throw if the ErrorInstance prototype is an instance of Error
   *
   * @param {String} message
   * @param {Error} ErrorInstance
   * @void
   * @throws
   **/
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
   * This method checks if the arg is of primitive type.
   * i.e. String, Number, null, or undefined.
   *
   * @param {Object} arg
   * @return {Boolean}
   **/
  isPrimitive (arg) {
    return hlp.isString(arg) ||
      hlp.isNumber(arg) ||
      hlp.isNull(arg) ||
      hlp.isUndefined(arg);
  },
  /**
   * Defining a primitive type so that we can add it to the jsdoc
   * @constructor
   **/
  Primitive (arg) {
    hlp.assert.argIsPrimitive(arg, 'arg must be of Primitive type to be declared primitive');
    this.el = arg;
  },

  /*
  advanced utils:
  These methods are not "base" because they throw errors
  */

  /**
   * @tested
   * Simply check if the string argument is of length exp_len
   *
   * @param {String} str
   * @param {Number} exp_len
   * @return {Boolean}
   * @throws {TypeError} when the argument are invalid
   **/
  hasStringLength (str, exp_len) {
    if (hlp.isString(str) && hlp.isInteger(exp_len)) {
      return str.length === exp_len;
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
    hlp.assert.argIsInteger(desired_length, 'Invalid type argument for desired_length: must be int', TypeError);

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

    hlp.assert.argIsString(addition_char, 'addition_character must be a String', TypeError);
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
   * @param {String} str
   * @return {Boolean}
   * @throws {Error} When argument is not a string
   **/
  containsNonNumeric (str) {
    hlp.assert.argIsString(str, 'argument must be of type String');
    return str.match(/\D/) !== null;
  },
  /**
   * @tested
   * converts a string to a number
   *
   *
   * @param {String} str
   * @return {Number}
   * @throws {Error} if the argument is not a String or if str contains non-numeric characters
   **/
  convertStringToNumber (str) {
    hlp.assert.argIsString(str);
    try {
      hlp.assert.stringContainsOnlyNumeric(str);

    } catch (assertion_error) {
      let str_without_point = str.replace('.', '');
      hlp.assert.stringContainsOnlyNumeric(str_without_point);
      if (str.match(/\./g).length > 1) {
        throw assertion_error;
      }
    }
    return parseFloat(str);
  },
  /**
   * @tested
   * checks if the Primitive element is contained in the array of Primitive elements
   *
   *
   * @param {hlp.Primitive} primitive
   * @param {Array<hlp.Primitive>} arr
   * @return {Boolean}
   * @throws {Error} if primitive1 is not Primitive or the array contains a non-primitive element
   **/
  isPrimitiveArgInArray (primitive, arr) {
    const candidate_err_msg = (candidate) => `candidate (${candidate}) must be of Primitive type`;
    hlp.assert.argIsPrimitive(primitive, 'element must be of Primitive type', TypeError);
    for (let candidate of arr) {
      hlp.assert.argIsPrimitive(candidate, candidate_err_msg(candidate), TypeError);
      if (primitive === candidate) {
        return true;
      }
    }
    return false;
  },
  /**
   * @tested
   * checks if the Primitive element is contained in the array of Primitive elements
   *
   * @param {hlp.Primitive} primitive1
   * @param {hlp.Primitive} primitive2
   * @return {Boolean}
   * @throws {Error} if arguments aren't Primitive
   **/
  arePrimitiveArgsEqual (primitive1, primitive2) {
    hlp.assert.argIsPrimitive(primitive1);
    hlp.assert.argIsPrimitive(primitive2);
    return primitive1 === primitive2;
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
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not a number */
    argIsNumber (arg, message = null, ErrorInstance = null) {
      if (!hlp.isNumber(arg)) {
        hlp.throw(message || 'element arg was not a number', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not an integer */
    argIsInteger (arg, message = null, ErrorInstance = null) {
      if (!hlp.isInteger(arg)) {
        hlp.throw(message || 'element arg was not an integer', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not null */
    argIsNull (arg, message = null, ErrorInstance = null) {
      if (!hlp.isNull(arg)) {
        hlp.throw(message || 'element arg was not null', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is null */
    argIsNotNull (arg, message = null, ErrorInstance = null) {
      if (hlp.isNull(arg)) {
        hlp.throw(message || 'element arg was null', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is undefined */
    argIsNotUndefined (arg, message = null, ErrorInstance = null) {
      if (hlp.isUndefined(arg)) {
        hlp.throw(message || 'element arg was undefined', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not a String */
    argIsString (arg, message = null, ErrorInstance = null) {
      if (!hlp.isString(arg)) {
        hlp.throw(message || 'element arg was not a String', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not an Array */
    argIsArray (arg, message = null, ErrorInstance = null) {
      if (!hlp.isArray(arg)) {
        hlp.throw(message || 'element arg was not an Array', ErrorInstance);
      }
    },
    /**
     * @param {Object} arg
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when arg is not of type 'hlp.Primitive' */
    argIsPrimitive (arg, message = null, ErrorInstance = null) {
      if (!hlp.isPrimitive(arg)) {
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
    stringContainsOnlyNumeric (str, message = null, ErrorInstance = Error) {
      if (hlp.containsNonNumeric(str)) {
        hlp.throw(message || `string ${str} contains non-numeric characters`, ErrorInstance);
      }
    },
    /**
     * @param {hlp.Primitive} primitive1
     * @param {hlp.Primitive} primitive2
     * @param {String} message
     * @param {Error} ErrorInstance
     * @throws when the two primitive type arguments are not equal */
    primitivesAreEqual (primitive1, primitive2, message = null, ErrorInstance = Error) {
      if (!hlp.arePrimitiveArgsEqual(primitive1, primitive2)) {
        hlp.throw(message || `${primitive1} and ${primitive2} are not equal`, ErrorInstance);
      }
    }
  },
};

module.exports = hlp;
/* global describe, it, expect */
'use strict';
const hlp = require('../lib/index');
const sr_true = 'should return true';
const sr_false = 'should return false';
const s_throw = 'should throw exceptions';
describe('helpers', function () {

  /* throw method */

  describe('throw', function () {
    it(s_throw, function () {
      expect(() => hlp.throw('wow')).to.throw(Error);
      expect(() => hlp.throw('wow', TypeError)).to.throw(TypeError);
      expect(() => hlp.throw('wow', EvalError)).to.throw(EvalError);
      expect(() => hlp.throw('wow', RangeError)).to.throw(RangeError);
      expect(() => hlp.throw('wow', SyntaxError)).to.throw(SyntaxError);
      expect(() => hlp.throw('wow', ReferenceError)).to.throw(ReferenceError);
      expect(() => hlp.throw('wow', URIError)).to.throw(URIError);
    });
  });

  /* base utils */

  describe('isBoolean', function () {
    it(sr_true, function () {
      let bool = false;
      expect(hlp.isBoolean(false)).to.equal(true);
      expect(hlp.isBoolean(true)).to.equal(true);
      expect(hlp.isBoolean(bool)).to.equal(true);
    });
    it(sr_false, function () {
      expect(hlp.isBoolean(undefined)).to.equal(false);
      expect(hlp.isBoolean(null)).to.equal(false);
      expect(hlp.isBoolean([])).to.equal(false);
      expect(hlp.isBoolean({})).to.equal(false);
      expect(hlp.isBoolean(NaN)).to.equal(false);
      expect(hlp.isBoolean('a')).to.equal(false);
      expect(hlp.isBoolean(1.51)).to.equal(false);
    });
  });

  describe('isNumber', function () {
    it(sr_true, function () {
      expect(hlp.isNumber(1)).to.equal(true);
      expect(hlp.isNumber(1.5)).to.equal(true);
      expect(hlp.isNumber(20)).to.equal(true);
    });
    it(sr_false, function () {
      expect(hlp.isNumber(undefined)).to.equal(false);
      expect(hlp.isNumber(null)).to.equal(false);
      expect(hlp.isNumber([])).to.equal(false);
      expect(hlp.isNumber({})).to.equal(false);
      expect(hlp.isNumber(NaN)).to.equal(false);
      expect(hlp.isNumber('a')).to.equal(false);
    });
  });
  describe('isInteger', function () {
    it(sr_true, function () {
      expect(hlp.isInteger(1)).to.equal(true);
      expect(hlp.isInteger(20)).to.equal(true);
    });
    it(sr_false, function () {
      expect(hlp.isInteger(undefined)).to.equal(false);
      expect(hlp.isInteger(null)).to.equal(false);
      expect(hlp.isInteger([])).to.equal(false);
      expect(hlp.isInteger({})).to.equal(false);
      expect(hlp.isInteger(NaN)).to.equal(false);
      expect(hlp.isInteger('a')).to.equal(false);
      expect(hlp.isInteger(1.5)).to.equal(false);
    });
  });
  describe('isNull', function () {
    it(sr_false, function () {
      expect(hlp.isNull(undefined)).to.equal(false);
      expect(hlp.isNull("undefined")).to.equal(false);
      expect(hlp.isNull("1")).to.equal(false);
      expect(hlp.isNull({})).to.equal(false);
      expect(hlp.isNull([])).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.isNull(null)).to.equal(true);
      expect(hlp.isNull(( () => null )())).to.equal(true);
    });
  });
  describe('isUndefined', function () {
    it(sr_false, function () {
      expect(hlp.isUndefined(null)).to.equal(false);
      expect(hlp.isUndefined("undefined")).to.equal(false);
      expect(hlp.isUndefined("1")).to.equal(false);
      expect(hlp.isUndefined({})).to.equal(false);
      expect(hlp.isUndefined([])).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.isUndefined(undefined)).to.equal(true);
      expect(hlp.isUndefined(( () => undefined )())).to.equal(true);
    });
  });

  describe('isString', function () {
    it(sr_false, function () {
      expect(hlp.isString(null)).to.equal(false);
      expect(hlp.isString(1)).to.equal(false);
      expect(hlp.isString(1.52)).to.equal(false);
      expect(hlp.isString({})).to.equal(false);
      expect(hlp.isString([])).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.isString('undefined')).to.equal(true);
      expect(hlp.isString(( () => 'hi' )())).to.equal(true);
    });
  });
  describe('isArray', function () {
    it(sr_false, function () {
      expect(hlp.isArray(null)).to.equal(false);
      expect(hlp.isArray(1)).to.equal(false);
      expect(hlp.isArray(1.52)).to.equal(false);
      expect(hlp.isArray({})).to.equal(false);
      expect(hlp.isArray({0: 1, 1: 4})).to.equal(false);
      expect(hlp.isArray('{}')).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.isArray([1,3,5])).to.equal(true);
      expect(hlp.isArray(( () => ['hi'] )())).to.equal(true);
    });
  });
  describe('isPrimitive', function () {
    it(sr_true, function () {
      expect(hlp.isPrimitive(null)).to.equal(true);
      expect(hlp.isPrimitive(undefined)).to.equal(true);
      expect(hlp.isPrimitive(1)).to.equal(true);
      expect(hlp.isPrimitive(1.52)).to.equal(true);
      expect(hlp.isPrimitive("hello")).to.equal(true);
    });
    it(sr_false, function () {
      expect(hlp.isPrimitive({})).to.equal(false);
      expect(hlp.isPrimitive([])).to.equal(false);
    });
  });

  /* string utils */

  describe('hasStringLength', function () {
    it(s_throw, function () {
      expect(() => hlp.hasStringLength()).to.throw(Error);
      expect(() => hlp.hasStringLength(null)).to.throw(Error);
      expect(() => hlp.hasStringLength(undefined)).to.throw(Error);
      expect(() => hlp.hasStringLength([])).to.throw(Error);
      expect(() => hlp.hasStringLength({})).to.throw(Error);
      expect(() => hlp.hasStringLength('a')).to.throw(Error);
      expect(() => hlp.hasStringLength('a', null)).to.throw(Error);
      expect(() => hlp.hasStringLength('a', undefined)).to.throw(Error);
      expect(() => hlp.hasStringLength('a', [])).to.throw(Error);
      expect(() => hlp.hasStringLength('a', {})).to.throw(Error);
      expect(() => hlp.hasStringLength('a', 1.000000001)).to.throw(Error);
    });
    it(sr_false, function () {
      expect(hlp.hasStringLength('adfsdssf', 1)).to.equal(false);
      expect(hlp.hasStringLength('1ssd', 3)).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.hasStringLength('adfsdssf', 8)).to.equal(true);
      expect(hlp.hasStringLength('1ssd', 4)).to.equal(true);
    });
  });

  describe('extendString', function () {
    it('should work with numbers', function () {
      expect(hlp.extendString(5, 1, 0)).to.equal('00001');
      expect(hlp.extendString(5, 11, 1)).to.equal('11111');
      expect(hlp.extendString(5, 111)).to.equal('  111');
      expect(hlp.extendString(5, 1111, 6)).to.equal('61111');
      expect(hlp.extendString(5, 11111)).to.equal('11111');
      expect(hlp.extendString(4, 11111)).to.equal('11111');
    });
    it('should work with strings', function () {
      expect(hlp.extendString(5, '1', 0)).to.equal('00001');
      expect(hlp.extendString(5, '11', '1')).to.equal('11111');
      expect(hlp.extendString(5, '111')).to.equal('  111');
      expect(hlp.extendString(5, '1111', 6)).to.equal('61111');
      expect(hlp.extendString(5, '11111')).to.equal('11111');
      expect(hlp.extendString(4, '11111')).to.equal('11111');
    });
    it(s_throw, function () {
      expect(() => hlp.extendString('5', '1')).to.throw(Error);
      expect(() => hlp.extendString(undefined, '1')).to.throw(Error);
      expect(() => hlp.extendString(null, '1')).to.throw(Error);
      expect(() => hlp.extendString([], '1')).to.throw(Error);
      expect(() => hlp.extendString({}, '1')).to.throw(Error);
      expect(() => hlp.extendString(4, undefined)).to.throw(Error);
      expect(() => hlp.extendString(4, null)).to.throw(Error);
      expect(() => hlp.extendString(4, [])).to.throw(Error);
      expect(() => hlp.extendString(4, {})).to.throw(Error);
    });
  });

  describe('containsNonNumeric', function () {
    it(sr_false, function () {
      expect(hlp.containsNonNumeric('23532')).to.equal(false);
      expect(hlp.containsNonNumeric('232')).to.equal(false);
      expect(hlp.containsNonNumeric('2991')).to.equal(false);
      expect(hlp.containsNonNumeric('1931')).to.equal(false);
      expect(hlp.containsNonNumeric('0')).to.equal(false);
    });

    it(sr_true, function () {
      expect(hlp.containsNonNumeric('2d3532')).to.equal(true);
      expect(hlp.containsNonNumeric('2-32')).to.equal(true);
      expect(hlp.containsNonNumeric('2^991')).to.equal(true);
      expect(hlp.containsNonNumeric('2`9')).to.equal(true);
      expect(hlp.containsNonNumeric('193+1')).to.equal(true);
      expect(hlp.containsNonNumeric('0_')).to.equal(true);
      expect(hlp.containsNonNumeric('.0')).to.equal(true);
    });

    it(s_throw, function () {
      expect(() => hlp.containsNonNumeric(undefined)).to.throw(Error);
      expect(() => hlp.containsNonNumeric(null)).to.throw(Error);
      expect(() => hlp.containsNonNumeric(3)).to.throw(Error);
      expect(() => hlp.containsNonNumeric(1.4)).to.throw(Error);
      expect(() => hlp.containsNonNumeric([])).to.throw(Error);
      expect(() => hlp.containsNonNumeric({})).to.throw(Error);
    });
  });

  describe('convertStringToNumber', function () {
    it('should work', function () {
      expect(hlp.convertStringToNumber('1')).to.equal(1);
      expect(hlp.convertStringToNumber('13')).to.equal(13);
      expect(hlp.convertStringToNumber('123413')).to.equal(123413);
      expect(hlp.convertStringToNumber('.123413')).to.equal(0.123413);
      expect(hlp.convertStringToNumber('123413.')).to.equal(123413);
    });
    it(s_throw, function () {
      expect(() => hlp.convertStringToNumber(1)).to.throw(Error);
      expect(() => hlp.convertStringToNumber(455)).to.throw(Error);
      expect(() => hlp.convertStringToNumber('ad')).to.throw(Error);
      expect(() => hlp.convertStringToNumber('1..4')).to.throw(Error);
      expect(() => hlp.convertStringToNumber('1.4.1')).to.throw(Error);
      expect(() => hlp.convertStringToNumber([])).to.throw(Error);
      expect(() => hlp.convertStringToNumber({})).to.throw(Error);
      expect(() => hlp.convertStringToNumber(null)).to.throw(Error);
      expect(() => hlp.convertStringToNumber(undefined)).to.throw(Error);
    });
  });

  describe('isElemInArray', function () {
    it('should throw because of invalid element', function () {
      expect(() => hlp.isPrimitiveArgInArray({}, ['hello'])).to.throw(Error);
      expect(() => hlp.isPrimitiveArgInArray([], ['hello'])).to.throw(Error);
      expect(() => hlp.isPrimitiveArgInArray(() => 3, ['hello'])).to.throw(Error);
    });
    it('should throw because of invalid array', function () {
      expect(() => hlp.isPrimitiveArgInArray(1, [{}])).to.throw(Error);
      expect(() => hlp.isPrimitiveArgInArray(1, [[]])).to.throw(Error);
      expect(() => hlp.isPrimitiveArgInArray(1, [() => 1])).to.throw(Error);
    });
    it(sr_true, function () {
      expect(hlp.isPrimitiveArgInArray(1, [1, 4, 5, 5, 35, "hello"])).to.equal(true);
      expect(hlp.isPrimitiveArgInArray("1", [1, 4, null, 5, 35, "hello", "1"])).to.equal(true);
      expect(hlp.isPrimitiveArgInArray("hello", [1, 4, 5, null, 35, "hello"])).to.equal(true);
    });
    it(sr_false, function () {
      expect(hlp.isPrimitiveArgInArray(2, [1, 4, 5, 5, 35, "hello"])).to.equal(false);
      expect(hlp.isPrimitiveArgInArray("mom", [1, 4, null, 5, 35, "hello", "1"])).to.equal(false);
      expect(hlp.isPrimitiveArgInArray(undefined, [1, 4, 5, null, 35, "hello"])).to.equal(false);
    });
  });

  describe('arePrimitiveArgsEqual', function () {
    it(s_throw, function () {
      expect(() => hlp.arePrimitiveArgsEqual([], {})).to.throw(Error);
      expect(() => hlp.arePrimitiveArgsEqual(null, {})).to.throw(Error);
    });
    it(sr_false, function () {
      expect(hlp.arePrimitiveArgsEqual(null, 1)).to.equal(false);
      expect(hlp.arePrimitiveArgsEqual(1.4, 1)).to.equal(false);
      expect(hlp.arePrimitiveArgsEqual(1.4, undefined)).to.equal(false);
    });
    it(sr_true, function () {
      expect(hlp.arePrimitiveArgsEqual()).to.equal(true);
      expect(hlp.arePrimitiveArgsEqual(null, null)).to.equal(true);
      expect(hlp.arePrimitiveArgsEqual(1, 1)).to.equal(true);
      expect(hlp.arePrimitiveArgsEqual("hello", "hello")).to.equal(true);

    });
  });
});


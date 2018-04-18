/**
 * @fileoverview Enforce a linebreak in tests before the first assertion.
 * @author evan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/break-before-expect"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = { ecmaVersion: 6 };
var ruleTester = new RuleTester();
ruleTester.run("break-before-expect", rule, {

  valid: [
    {
      code: `
        it('does some stuff', () => {
          expect(spy).toHaveBeenCalled();
        });
      `,
      parserOptions,
    },
    {
      code: `
        it('does some stuff', () => {
          const link = wrapper.find('Link');
          link.instance().onClick();

          expect(spy).toHaveBeenCalled();
        });
      `,
      parserOptions,
    },
    {
      code: `
        it('does some stuff', () => {
          const link = wrapper.find('Link');
          link.instance().onClick();

          expect(spy).toHaveBeenCalled();
          expect(spy).toBeASpy();
        });
      `,
      parserOptions,
    },
  ],

  invalid: [
    {
      code: `
        it('does some stuff', () => {
          const link = wrapper.find('Link');
          link.instance().onClick();
          expect(spy).toHaveBeenCalled();
        });
      `,
      parserOptions,
      errors: [{
        message: "Put a newline before your first assertion",
        type: 'CallExpression',
      }],
    },
    {
      code: `
        it('does some stuff', () => {
          const link = wrapper.find('Link');
          link.instance().onClick();
          expect(spy).toHaveBeenCalled();
          expect(spy).toBeASpy();
        });
      `,
      parserOptions,
      errors: [{
        message: "Put a newline before your first assertion",
        type: 'CallExpression',
      }],
    },
  ]
});

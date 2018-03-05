/**
 * @fileoverview Only use constructors with enzyme .find
 * @author Evan Lloyd
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/enzyme-find-constructors-only');
const RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = { ecmaVersion: 6 };
const ruleTester = new RuleTester();
ruleTester.run('enzyme-find-constructors-only', rule, {

  valid: [
    {
      code: 'const child = wrapper.find(Link)',
      parserOptions,
    },
    {
      code: 'let child = wrapper.find(Link)',
      parserOptions,
    },
    {
      code: "let child = wrapper.find('Connect(Link)')",
      parserOptions,
    },
    {
      code: 'let child = [1, 2].find(isEven)',
      parserOptions,
    },
  ],

  invalid: [
    {
      code: "const child = wrapper.find('Link');",
      parserOptions,
      errors: [{
        message: "Please use a constructor with 'find': 'find(Link)', not a string",
        type: 'CallExpression',
      }],
    },
  ],
});

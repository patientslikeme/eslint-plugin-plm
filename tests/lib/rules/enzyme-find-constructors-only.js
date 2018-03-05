/**
 * @fileoverview Only use constructors with enzyme .find
 * @author evan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/enzyme-find-constructors-only"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const parserOptions = { ecmaVersion: 6 };
const ruleTester = new RuleTester();
ruleTester.run("enzyme-find-constructors-only", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "const child = wrapper.find('Link');",
            parserOptions,
            errors: [{
                message: "Please use a constructor with `find`, not a string literal",
                type: "CallExpression"
            }]
        }
    ]
});

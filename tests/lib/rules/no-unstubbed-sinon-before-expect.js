/**
 * @fileoverview no
 * @author Evan Lloyd
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-unstubbed-sinon-before-expect"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-unstubbed-sinon-before-expect", rule, {

  valid: [
    // {
    //   code:`it("passes shit", () => {
    //     var ajaxStub = sinon.stub(AjaxHelpers, 'post', ajaxCallBack);
    //     ajaxStub.restore();
    //     expect(true).toEqual('cat');
    //   });`,
    //   globals: ['it'],
    //   parserOptions: { ecmaVersion: 6  },
    // },
  ],

  invalid: [
    {
      code:`it("should fail", () => {
        var ajaxStub = sinon.stub(AjaxHelpers, 'post', ajaxCallBack);
        expect(true).toEqual('cat');
        ajaxStub.restore();
      });`,
      parserOptions: { ecmaVersion: 6  },
      globals: ['it'],
      errors: [{
        message: "Restore stubs before `expect`",
        type: "Otherwise terrible things will happen"
      }]
    }
  ]
});

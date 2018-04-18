/**
 * @fileoverview Enforce a linebreak in tests before the first assertion.
 * @author evan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Enforce a linebreak in tests before the first assertion.",
      category: "Fill me in",
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {

    // variables should be defined here
    let REPORTED = false;

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    //
    // return {
    //   Program: () => {
    //     const sourceCode = context.getSourceCode();
    //     const src = sourceCode.getText();
    //     const NEWLINE = "\n";
    //     const matches = /\n\n/.exec(src)
    //     console.log(matches);
    //   }
    // }

    return {
      "CallExpression": function(node) {
        if (node.callee && node.callee.type === 'Identifier' && node.callee.name === 'expect') {
          const sourceCode = context.getSourceCode(node);
          const src = sourceCode.getText();
          const singleLine = sourceCode.lines.length === 1;
          const hasNewLine = /\n\n\s*expect/.exec(src)
          if (singleLine || hasNewLine || REPORTED) {
            return null;
          }
          REPORTED = true;
          return context.report({
            node,
            message: 'Put a newline before your first assertion'
          })
        }
        return null;
      }
    };
  }
};

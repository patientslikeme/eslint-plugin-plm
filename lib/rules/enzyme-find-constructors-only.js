/**
 * @fileoverview Only use constructors with enzyme .find
 * @author evan
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Only use constructors with enzyme .find",
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
    // if the args to find includes one of these, it should be okay
    const whitelistedStrings = ['Connect'];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression: (node) => {
        if (node.callee && node.callee.property && node.callee.property.name === 'find') {
          // look at the args
          const args = node.arguments;
          const argToFind = args[0];
          // needs a guard on presence
          if (argToFind.type === 'Literal') {
            return context.report({
              node: node,
              message: 'Please use a constructor with `find`, not a string literal',
            });
          }

        }
        return;
      }

      // give me methods

    };
  }
};

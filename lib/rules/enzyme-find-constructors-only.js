/**
 * @fileoverview Only use constructors with enzyme .find
 * @author evan
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Only use constructors with enzyme .find',
      category: 'react-testing',
      recommended: false,
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function create(context) {
    // variables should be defined here
    // if the args to find includes one of these, it should be okay
    const WHITELISTED_STRINGS = ['Connect'];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section
    //
    function isWhitelisted(string) {
      return WHITELISTED_STRINGS.some((whitelisted) => string.includes(whitelisted));
    }

    function reportError({ node, stringLiteral }) {
      return context.report({
        node,
        message: `Please use a constructor with 'find': 'find(${stringLiteral})', not a string`,
      });
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression: (node) => {
        if (node.callee && node.callee.property && node.callee.property.name === 'find') {
          const args = node.arguments;
          const argToFind = args[0] || {};

          if (argToFind.type === 'Literal' && !isWhitelisted(argToFind.value)) {
            return reportError({
              node,
              stringLiteral: argToFind.value,
            });
          }
        }
        return null;
      },
    };
  },
};

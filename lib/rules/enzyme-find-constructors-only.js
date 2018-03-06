/**
 * @fileoverview Only use constructors with enzyme .find
 * @author Evan Lloyd
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
    fixable: 'code',  // or "code" or "whitespace"
    schema: [], // no options
  },

  create: function create(context) {
    // if the args to find includes one of these, it should be okay
    const WHITELISTED_STRINGS = ['Connect'];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isWhitelisted(string) {
      return WHITELISTED_STRINGS.some((whitelisted) => string.includes(whitelisted));
    }

    function hasInitialCapital(string) {
      const firstChar = string[0];

      return firstChar != firstChar.toLowerCase() && firstChar == firstChar.toUpperCase();
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
          const { value } = argToFind;

          if (argToFind.type === 'Literal' && hasInitialCapital(value) && !isWhitelisted(value)) {
            return reportError({
              node,
              stringLiteral: value,
            });
          }
        }
        return null;
      },
    };
  },
};

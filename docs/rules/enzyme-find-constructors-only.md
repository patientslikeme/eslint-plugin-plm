# Only use constructors with enzyme .find (enzyme-find-constructors-only)

Enforce the use of a constructor with Enzyme's `.find` because
it's faster and doesn't rely on `component.displayName`.

Makes the wild assumption that all react components have an initial capital
letter.


## Rule Details

Examples of **incorrect** code for this rule:

```js
const avatar = wrapper.find('Avatar');
```

Examples of **correct** code for this rule:

```js
import Avatar from '../Avatar';

const avatar = wrapper.find(Avatar);
```

## Usage with connected components

Strings with `'Connect'` are whitelisted for usage with redux connected
components:

```js
const avatar = wrapper.find('Connect(Avatar)');
```

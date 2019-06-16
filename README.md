# NodeJS Jackett

[![license](https://img.shields.io/github/license/danteissaias/jackett.svg)](https://github.com/danteissaias/vision/blob/master/LICENSE.md)
![dependencies](https://img.shields.io/david/danteissaias/jackett.svg)
[![npm](https://img.shields.io/npm/v/jackett.svg)](https://npmjs.com/jackett)

## Installation

From npm

```
npm install jackett
```

From github

```
npm install github:danteissaias/jackett
```

## Examples

You can find usage examples [here](examples)

```typescript
import { Jackett } from './src';

(async () => {
  const j = new Jackett('https://jackett.example.com', 'apiKey');
  const r = await j.search('Silicon Valley S5');
  console.log(r.Results[0].Title);
})();
```

## Contribution

If you want to add anything feel free - make sure to format all code with prettier.

## License

This code is licensed under the MIT license.

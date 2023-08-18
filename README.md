<h1 align="center" style="border-bottom: none;">💾 topgun-redis-adapter</h1>
<h3>Standard <a href="https://github.com/TopGunBuild/topgun">TopGun</a> Graph Adapter interface for <a href="https://redis.io/docs/clients/nodejs/">Redis</a></h3>

<p align="center">
  <a href="https://github.com/semantic-release/semantic-release">
      <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://npm.im/topgun-redis-adapter">
    <img alt="npm" src="https://badgen.net/npm/v/topgun-redis-adapter">
  </a>
  <a href="https://bundlephobia.com/result?p=topgun-redis-adapter">
    <img alt="bundlephobia" src="https://img.shields.io/bundlephobia/minzip/topgun-redis-adapter.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Install

`npm install topgun-redis-adapter`

## How to use adapter

```js
import { TGServer } from 'topgun/server';
import { createRedisAdapter } from 'topgun-redis-adapter';

const server = new TGServer({
    adapter: createRedisAdapter(),
    port: 8765
});
```

## License

MIT

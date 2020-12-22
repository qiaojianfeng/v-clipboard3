const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const path = require('path');
const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ` * VClipboard3.js v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} Qiaojianfeng\n` +
  ' * Released under the MIT License.\n' +
  ' */';

const resolve = (p) => {
  return path.resolve(__dirname, '../', p);
};
const env = process.env.NODE_ENV;
const builds = {
  'v-clipboard3-dev': {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/v-clipboard3.js'),
    format: 'cjs',
    env: 'development',
    banner,
    plugins: [
      nodeResolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript(), // so Rollup can convert TypeScript to JavaScript
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  'v-clipboard3-prod': {
    entry: resolve('src/main.ts'),
    dest: resolve('dist/v-clipboard3.min.js'),
    format: 'cjs',
    env: 'production',
    banner,
    plugins: [
      nodeResolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript(), // so Rollup can convert TypeScript to JavaScript
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
};

function genConfig(name) {
  const opts = builds[name];
  const config = {
    input: opts.entry,
    external: opts.external,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      exports: 'named',
      name: opts.moduleName || 'VClipboard3',
    },
    plugins: opts.plugins,
  };
  return config;
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET);
} else {
  exports.getBuild = genConfig;
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}

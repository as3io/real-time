const {
  task,
  watch,
  src,
  parallel,
} = require('gulp');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const log = require('fancy-log');
const {
  green,
  magenta,
  cyan,
  red,
} = require('chalk');
const { spawn } = require('child_process');

let node;
const serve = async () => {
  if (node) node.kill();
  node = await spawn('node', ['src/index.js'], { stdio: 'inherit' });
  node.on('close', (code, signal) => {
    const exited = [];
    if (code) exited.push(`code ${magenta(code)}`);
    if (signal) exited.push(`signal ${magenta(signal)}`);
    log(`Process ${green('exited')} with ${exited.join(' ')}`);
  });
};

const lint = () => src(['src/**/*.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

task('default', () => {
  const watcher = watch(
    ['src/**/*.js'],
    { queue: false, ignoreInitial: false },
    parallel([serve, lint]),
  );
  watcher.on('change', (path) => log(`File ${green(path)} was ${cyan('changed')}`));
  watcher.on('unlink', (path) => log(`File ${green(path)} was ${red('removed')}.`));
});

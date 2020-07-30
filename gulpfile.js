/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const ts = require('gulp-typescript');
const merge = require('merge2');
const chalk = require('chalk');
const clean = require('gulp-clean');

const dirDevelop = ['src/**'];
const dirDevelopJS = ['src/**/*.js'];
const dirDevelopTS = ['src/**/*.ts', 'src/**/*.tsx', '!node_modules/**/*.d.ts'];
const dirPublish = 'lib';
const copyFiles = ['package.json', 'README.md'];

const { log } = console;
const tsProject = ts.createProject('tsconfig.json', {
  noImplicitAny: false,
});

const fileWatchColorMap = {
  added: 'blue',
  changed: 'green',
  deleted: 'red',
};

// handle es5+
function babelTask() {
  return gulp.src(dirDevelopJS)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dirPublish))
    .pipe(plumber.stop());
}

// handle typescript
function tsTask() {
  const tsResult = gulp.src(dirDevelopTS)
    .pipe(plumber())
    .pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest(dirPublish)), // create *.d.ts
    tsResult.js.pipe(gulp.dest(dirPublish)), // create *.js
  ]).pipe(plumber.stop());
}

function scriptTask() {
  return Promise.all([
    babelTask(),
    tsTask(),
  ]);
}

// copy package.json to publish folder
gulp.task('copy', ['clean'], () => {
  return gulp.src(copyFiles)
    .pipe(plumber())
    .pipe(gulp.dest(dirPublish))
    .pipe(plumber.stop());
});

// build project to publish folder
gulp.task('build', ['copy'], scriptTask);

// watch project files to change
gulp.task('watch', () => {
  scriptTask().then(() => {
    gulp.watch(dirDevelop, scriptTask)
      .on('change', (event) => {
        const logTxt = `[${new Date().toLocaleString()}] File ${event.type} - ${event.path}`;
        const curColor = fileWatchColorMap[event.type];
        log(chalk[curColor](logTxt));
      });
  });
});

gulp.task('clean', () => {
  return gulp.src(dirPublish).pipe(clean());
});

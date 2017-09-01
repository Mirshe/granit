'use strict'
const gulp = require("gulp");
const foos = require("./tasksFoo");
const bs = require("browser-sync").create();
let build = foos.build("builds/dev/**/*.*", "builds/prod");
let sass = foos.sass("builds/dev/**/*.scss", "builds/prod");
let lint = foos.lint("./builds/dev/**/*.js", "./builds/prod");
let init = foos.init();
let add = foos.add("./*");
let commit = foos.commit("./*");
let addremote = foos.addremote('https://github.com/Mirshe/granit.git');
let push = foos.push();
let gitStart = gulp.series(init, add, commit, addremote, push);
let gitDo = gulp.series(add, commit, push);
function sync() {
	return bs.init({
		server: "./builds/prod"
	});
};
gulp.task("default", gulp.series(build, sass, gitStart, sync));
gulp.watch("./builds/dev/**/*.scss", sass);
gulp.watch("./builds/dev/**/*.*", gulp.series(build, lint, gitDo));
bs.watch("./builds/prod").on("change", bs.reload);

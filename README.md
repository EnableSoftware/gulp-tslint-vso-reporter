# gulp-tslint-vso-formatter

A [`gulp-tslint`](https://github.com/panuhorsmalahti/gulp-tslint) reporter 
for Visual Studio Online and Team Foundation Server.

# Usage

    import gulp from "gulp";
    import tslint from "gulp-tslint";
    import vsoReporter from "gulp-tslint-vso-reporter";

    gulp.task("typescript:lint", function() {
        return gulp.src("greeter.ts")
            .pipe(tslint())
            .pipe(tslint.report(vsoReporter));
    });

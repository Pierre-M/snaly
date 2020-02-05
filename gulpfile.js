"use strict";

const gulp = require("gulp");
const path = require("path");
const async = require("async");
const iconfont = require("gulp-iconfont");
const consolidate = require("gulp-consolidate");

const ICONS_CONFIG_DIR = path.join(__dirname, "./build/icon-font");
const ICONS_SRC_GLOB = path.join(ICONS_CONFIG_DIR, "/svg/*.svg");
const ICONS_SCSS_TEMPLATE = path.join(ICONS_CONFIG_DIR, "/_icons.scss");

const ICONS_FONTS_DEST = path.join(__dirname, "./src/assets/fonts");
const ICONS_SCSS_DEST = path.join(__dirname, "./src/ui/style/");

gulp.task("build-icon-font", function(done) {
    const iconStream = gulp.src([ICONS_SRC_GLOB]).pipe(
        iconfont({
            formats: ["ttf", "eot", "woff", "woff2"],
            fontHeight: 2048,
            normalize: true,
            fontName: "snaly-icons"
        })
    );

    async.parallel(
        [
            cb => {
                iconStream.on("glyphs", function(glyphs, options) {
                    gulp.src(ICONS_SCSS_TEMPLATE)
                        .pipe(
                            consolidate("lodash", {
                                glyphs: glyphs,
                                fontName: "snaly-icons",
                                fontPath: "../../../assets/fonts/",
                                className: "icon"
                            })
                        )
                        .pipe(gulp.dest(ICONS_SCSS_DEST))
                        .on("finish", cb);
                });
            },
            cb => {
                iconStream.pipe(gulp.dest(ICONS_FONTS_DEST)).on("finish", cb);
            }
        ],
        done
    );
});

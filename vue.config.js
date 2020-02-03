"use strict";

const path = require("path");

module.exports = {
    devServer: {
        disableHostCheck: true
    },

    css: {
        loaderOptions: {
            scss: {
                prependData: "@import '@/ui/style/_base.scss';"
            }
        }
    }
};

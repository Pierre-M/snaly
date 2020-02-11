"use strict";

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
    },

    pwa: {
        themeColor: "#000"
    }
};

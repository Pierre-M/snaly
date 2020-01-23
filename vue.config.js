"use strict";

const path = require("path");

module.exports = {
  publicPath: process.env.DEPLOY_ENV === "PROD" ? "/snaly/" : "/",

  css: {
    loaderOptions: {
      scss: {
        prependData: "@import '@/ui/style/_base.scss';"
      }
    }
  }
};

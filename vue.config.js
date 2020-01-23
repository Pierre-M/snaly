"use strict";

module.exports = {
  publicPath: process.env.DEPLOY_ENV === "PROD" ? "/snaly/" : "/"
};

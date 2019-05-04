"use_strict"
/**
 * Library loading
 */

const loadingDiv = document.querySelector("#loading")
loadingDiv.hidden = false

if (!window.Promise) window.Promise = require("es6-promise").Promise

import(/* webpackChunkName: "app" */ "./app")
  .then(() => loadingDiv.hidden = true)
  .catch(console.error)

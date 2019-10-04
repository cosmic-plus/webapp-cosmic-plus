"use_strict"
/**
 * Library loading
 */

const loadingDiv = document.querySelector("#loading")
loadingDiv.hidden = false

import(/* webpackChunkName: "app" */ "./app")
  .then(() => loadingDiv.hidden = true)
  .catch(console.error)

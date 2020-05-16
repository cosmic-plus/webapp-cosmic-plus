"use strict"
/**
 * GitHub embedded view
 */
const urlView = module.exports

const html = require("@cosmic-plus/domutils/es5/html")

const iframe = html.create("iframe", ".urlView")
html.append(document.body, iframe)

const domain = window.location.href.split("/", 3).join("/") + "/"
const domainRegexp = new RegExp(`^${domain}(.*)`)
const viewRegexp = new RegExp(`^${domain}#view:`)

/**
 * Main functions
 */

urlView.open = function (page) {
  iframe.src = domain + page.replace("%23", "#")
  onIframeInteractive(iframe, () => rewriteLinks(iframe))
  html.show(iframe)
}

urlView.close = function () {
  html.hide(iframe)
  iframe.src = "about:blank"
}

/**
 * Helpers
 */
function onIframeInteractive (iframe, thunk) {
  const iwindow = iframe.contentWindow
  const xdocument = iwindow.document

  const timer = setInterval(() => {
    const idocument = iwindow.document
    if (xdocument === idocument) return
    const state = idocument.readyState
    if (state !== "interactive" && state !== "complete") return

    thunk()
    clearInterval(timer)
  }, 40)
}

function rewriteLinks (iframe) {
  const idocument = iframe.contentWindow.document

  for (let index in idocument.links) {
    const link = idocument.links[index]
    if (!link || !link.href) continue

    // Prevent nested navigation.
    if (link.href.match(viewRegexp)) {
      link.href = link.href.replace("#view:", "")
    }

    const isSameDomain = link.href.match(domainRegexp)
    if (isSameDomain) {
      // `href` for copying link & navigation in new tab/window, `onclick` for
      // same-page navigation.
      const href = isSameDomain[1]
      const encodedHref = href.replace("#", "%23")
      link.href = `${domain}#view:${encodedHref}`
      link.onclick = event => {
        event.preventDefault()
        location.hash = `#view:${encodedHref}`
      }
    } else if (link.href.substr(0, 1) !== "#") {
      link.target = "_blank"
      link.rel = "noopener"
    }
  }
}

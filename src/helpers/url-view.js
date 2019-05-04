"use_strict"
/**
 * GitHub embedded view
 */
const urlView = module.exports

const html = require("@cosmic-plus/domutils/es5/html")

const iframe = html.create("iframe", ".urlView")
html.append(document.body, iframe)

const domain = `${window.location.protocol}//${window.location.hostname}/`
const domainRegexp = new RegExp(`^${domain}(.*)`)

/**
 * Main functions
 */

urlView.open = function (page) {
  iframe.onload = () => rewriteIframe(iframe)
  iframe.src = domain + page
  html.show(iframe)
  resizeIframe(iframe)
}

urlView.close = function () {
  html.hide(iframe)
  iframe.src = "about:blank"
}

/**
 * Helpers
 */

function rewriteIframe (iframe) {
  const iwindow = iframe.contentWindow
  const idocument = iwindow.document
  const generator = idocument.head.querySelector("[name='generator']")

  // GitHub pages generates two titles.
  if (generator && generator.content.substr(0, 6) === "Jekyll") {
    html.destroy(html.grab("h1", idocument))
  }

  rewriteLinks(iframe)
  resizeIframe(iframe)
}

function rewriteLinks (iframe) {
  const idocument = iframe.contentWindow.document

  for (let index in idocument.links) {
    const link = idocument.links[index]
    if (!link || !link.href) continue

    const isSameDomain = link.href.match(domainRegexp)
    if (isSameDomain) {
      link.onclick = () => location.hash = "#view:" + isSameDomain[1]
    } else if (link.href.substr(0, 1) !== "#") {
      link.target = "_top"
    }
  }
}

function resizeIframe (iframe) {
  iframe.height = 0
  iframe.height = iframe.contentWindow.document.documentElement.scrollHeight + 1
  iframe.style.border = "none"
}
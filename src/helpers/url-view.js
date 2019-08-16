"use_strict"
/**
 * GitHub embedded view
 */
const urlView = module.exports

const dom = require("@cosmic-plus/domutils/es5/dom")
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
      const [page, hash] = isSameDomain[1].split("#", 1)
      const pathname = iframe.contentWindow.location.pathname
      if (pathname.substr(1) === page) continue
      link.onclick = () => location.hash = "#view:" + isSameDomain[1]
    } else if (link.href.substr(0, 1) !== "#") {
      link.target = "_blank"
      link.rel = "noopener"
    }
  }
}

function resizeIframe (iframe) {
  iframe.height = 0
  const idocument = iframe.contentWindow.document.documentElement
  const margins = dom.header.offsetHeight + dom.footer.offsetHeight
  const minHeight = window.innerHeight - margins
  iframe.height = Math.max(minHeight, idocument.scrollHeight + 1)
}

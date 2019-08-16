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
  iframe.onload = () => rewriteLinks(iframe)
  iframe.src = domain + page
  html.show(iframe)
}

urlView.close = function () {
  html.hide(iframe)
  iframe.src = "about:blank"
}

/**
 * Helpers
 */

function rewriteLinks (iframe) {
  const idocument = iframe.contentWindow.document

  for (let index in idocument.links) {
    const link = idocument.links[index]
    if (!link || !link.href) continue

    const isSameDomain = link.href.match(domainRegexp)
    if (isSameDomain) {
      const href = isSameDomain[1]
      const [page, hash] = href.split("#", 2)
      const pathname = iframe.contentWindow.location.pathname

      // `href` for copying link & navigation in new tab/window, `onclick` for
      // same-page nagivation.
      if (pathname.substr(1) === page) {
        // Anchor links.
        link.href = `${domain}#view:${href}`
        link.onclick = event => {
          event.preventDefault()
          idocument.location.hash = "#" + hash
        }
      } else {
        // Page links.
        link.href = `${domain}#view:${href}`
        link.onclick = () => location.hash = `#view:${href}`
      }
    } else if (link.href.substr(0, 1) !== "#") {
      link.target = "_blank"
      link.rel = "noopener"
    }
  }
}

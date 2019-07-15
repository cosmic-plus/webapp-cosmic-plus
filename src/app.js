"use_strict"
/**
 * Cosmic Plus interface
 */

require("@cosmic-plus/domutils/es5/polyfill")

const dom = require("@cosmic-plus/domutils/es5/dom")
const html = require("@cosmic-plus/domutils/es5/html")
const Tabs = require("@cosmic-plus/domutils/es5/tabs")
const Gui = require("@cosmic-plus/domutils/es5/gui")

const ContentGui = require("./content")
const urlView = require("./helpers/url-view")

const about = new Gui(require("../bundled/about.html"))
require("./footer")

/**
 * Website Tabs
 */

const tabs = new Tabs({ nav: dom.header, view: dom.main })
tabs.add("#applications", "Applications", new ContentGui("webapp"))
tabs.add("#javascript", "JavaScript", new ContentGui("libjs"))
tabs.add("#about", "About", about)
tabs.add("#blog", "Blog", "")
tabs[tabs.length - 1].link.onclick = null
tabs[tabs.length - 1].link.href = "https://medium.com/cosmic-plus"

tabs.listen("select", tab => location.hash = tab)

/**
 * Navigation Handler
 */

function hashHandler () {
  scrollTo(0, 0)
  if (location.hash.substr(0, 6) === "#view:") {
    urlView.open(location.hash.substr(6))
    html.hide(dom.main)
  } else {
    if (!tabs.selected) tabs.select("#applications")
    urlView.close()
    html.show(dom.main)
  }
}

window.onhashchange = hashHandler
hashHandler()

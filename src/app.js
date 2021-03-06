"use strict"
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

const tabs = new Tabs({ nav: dom.header, selector: dom.header, view: dom.main })
tabs.add("#applications", "Applications", new ContentGui("webapp"))
tabs.add("#libraries", "Libraries", new ContentGui("libjs"))
tabs.add("#about", "About", about)
tabs.add("#blog", "Blog", () =>
  location.replace("https://medium.com/cosmic-plus")
)

tabs.select(null)
tabs.select(location.hash)
tabs.listen("select", tab => {
  if (tab) location.hash = tab
})

/**
 * Navigation Handler
 */

function hashHandler () {
  dom.main.scrollTop = 0

  if (location.hash.substr(0, 6) === "#view:") {
    tabs.select(null)
    urlView.open(location.hash.substr(6))
    html.hide(dom.main)
  } else if (!tabs.selected) {
    tabs.select("#applications")
  } else {
    urlView.close()
    html.show(dom.main)
  }
}

window.onhashchange = hashHandler
hashHandler()

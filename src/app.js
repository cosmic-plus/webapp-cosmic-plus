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

require("./footer")

/**
 * Website Tabs
 */

const tabs = new Tabs({ nav: dom.header, view: dom.main })
tabs.add("#applications", "Applications", new ContentGui("webapp"))
tabs.add("#javascript", "JavaScript", new ContentGui("libjs"))

tabs.add(
  "#about",
  "About",
  new Gui(`
  <section><h2>Mission</h2>

    <p>I (MisterTicot) created Cosmic Plus with the following goals in
    mind:</p>

    <ul>

      <li>Providing end-users with some fundamental high-quality softwares.</li>

      <li>Providing an high-level open source development kit for Stellar
      applications.</li>

      <li>Defending the interests of the community by promoting balanced &
      vendor-neutral solutions for the technical challenges we're facing.</li>

      <li>Coordinating with other developpers that are making efforts in the
      same direction.</li>

    </ul>

  </section>


  <section><h2>Philosophy</h2>

    <p>Cosmic Plus embraces the cooperative mindset of the free software
    community. I believe that in a competitive space, it is critically important
    that some independent actors are able to contribute without having their
    private interest directly at stake.</p>

    <p>All Cosmic Plus softwares are released under a permissive free software
    licence (MIT). What is made publicly available doesn't need to be coded time
    and time again. This enables other developpers to focus on what make their
    applications unique, which ultimately benefit to end users.</p>

    <p>Important design choices are publicly discussed with the community prior
    to implementation, and feedback is systematically taken in account.</p>

  </section>

  <section><h2>Economic Model</h2>

    <p>Such a project needs to be financed in ways that won't impact design
    choices. This is partly why Cosmic Plus is running a non-profit economic
    model.</p>

    <p>So far, I financed it thanks to two Build Challenges the Stellar
    Developper Foundation organized. In the future, I'll try to finance the hard
    work from other kind of contest and from donations.</p>

    <p>I'm conscious that maintaining that ethic is a demanding challenge.
    However, I'm confident that Cosmic Plus can reach an economic stability
    thanks to the community & Stellar Foundation support.</p>

  </section>

  <section><h2>Privacy</h2>

    <p>Privacy is a right which is why Cosmic Plus softwares don't use
    ads/trackers and don't collect/publish any data about users activity.
    However, Cosmic Plus web applications are distributed through GitHub,
    Cloudflare and to a lesser extend Azure. Those services may keep logs of
    who's downloading the apps.</p>

  </section>

`)
)

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

"use_strict"
/**
 * Cosmic Plus interface
 */

const dom = require("@cosmic-plus/jsutils/dom")
const html = require("@cosmic-plus/jsutils/html")
const Tabs = require("@cosmic-plus/jsutils/tabs")
const Gui = require("@cosmic-plus/jsutils/gui")

const ContentGui = require("./content")
const SideFrame = require("./side-frame")

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

tabs.select(location.hash)
if (!tabs.selected) tabs.select("#applications")
tabs.listen("select", tab => location.hash = tab)

/**
 * GitHub Pages display
 */

const iframe = html.create("iframe")
html.append(document.body, iframe)

function hashHandler () {
  let hash = location.hash
  if (hash.substr(0, 6) === "#view:") {
    html.show(iframe)
    iframe.height = 0
    iframe.onload = showIframe
    iframe.src = "https://cosmic.plus/" + hash.substr(6)
  } else {
    html.hide(iframe)
    html.show(dom.main)
    scrollTo(0, 0)
  }
}

function showIframe () {
  const innerDocument = iframe.contentWindow.document
  iframe.height = innerDocument.body.scrollHeight + 10
  const generator = innerDocument.head.querySelector("[name='generator']")
  if (generator && generator.content.substr(0, 6) === "Jekyll") {
    // GitHub pages generate two page titles
    html.destroy(html.grab("h1", innerDocument))
  }
  rewriteLinks(innerDocument)

  html.hide(dom.main)
  tabs.select(location.hash)
  scrollTo(0, 0)
  const innerHash = location.hash.split("#")[1]
  if (innerHash) iframe.contentWindow.location.hash = innerHash
}

function rewriteLinks (document) {
  for (let index in document.links) {
    const link = document.links[index]
    if (!link || !link.href) continue

    const view = link.href.match(/^https:\/\/cosmic.plus\/(.*)/)
    if (view) {
      link.onclick = () => {
        location.hash = `#view:${view[1]}`
        return false
      }
    } else if (link.href.substr(0, 1) !== "#") {
      link.target = "_top"
    }
  }
}

window.onhashchange = hashHandler
hashHandler()

/**
 * Donate
 */

function donate () {
  const amount = prompt(`\
Cosmic Plus runs on donation.

Please contribute to its development according to what you think its products worth.

Enter an amount (in Lumens):\
`)

  if (isNaN(Number(amount))) {
    confirm(`Not a valid amount: ${amount}`)
  } else if (amount) {
    new SideFrame(
      `https://cosmic.link/?payment&network=public&memo=Donate%20to%20Cosmic%20Plus&amount=${amount}&destination=GAWO2C52D57XBT7SQL6YB3XPHFLFD2J4Z5RN7HPFZSHXJMXH72HRXNV3`
    )
  }
}

const donateIcon = new Gui(`<a title="Donate" %onclick>%svg</a>`, {
  svg: new Gui(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" d="M0 0h512v512H0z"/><path d="M211.719 367.797C219.469 379.281 224 393.109 224 408c0 39.734-32.266 72-72 72-39.758 0-72-32.266-72-72 0-23.172 11.148-43.563 28.164-56.734 1.852 5.594 4.336 11.125 8.289 15.906 7.055 8.516 20.336 18.266 43.531 16.344 7.578-.641 15.844-2.547 24.586-5.641 8.875-3.078 18.508-6.5 27.149-10.078zM389.875 32.578c-13.344 3.797-24.156 10.672-38.813 18.328-90 47-196.25 39.25-220 77-27.469 51.672-48.883 89.203-48.945 107.625-.016.063-.055.094-.07.141.586 19.953 19.625 58.438 29.07 75.969 6.789-15.516 17.492-29.219 32.25-40.688 7.414-5.766 13.289-9.922 18.617-13.5-3.016-9.25-6.945-20.016-10.875-28.203 10.742-7.391 26.078-26.484 31.398-40.313 13.227.094 30.25-3.172 44.773-6.938 6.406 6.844 12.977 13.563 21.766 20.016-3.961 14.344-7.07 27.063-23.438 38.359-22.313 15.438-42.734 21.578-69.484 43.109-16.086 12.953-26.07 28.203-30.625 45.641-3.148 12.094 4.734 53.016 58 33.141 10.023-3.75 23.398-8.531 34.875-14.25 23.797-11.813 52.922-40.781 61-44.828 15.234-7.641 49.813-10.656 86.313-35.016 12.531-8.375 22.063-20.688 26.477-33.625 33.242-64.828 60.883-59.656 68.633-72.563C477.734 133.734 423.563 23 389.875 32.578z"/></svg>`
  ),
  onclick: donate
})

/**
 * Footer Icons
 */

class Icon extends Gui {
  constructor (title, href, svg) {
    super(`<a %href %title target="_blank" rel="noopener">${svg}</a>`, {
      title,
      href,
      svg
    })
  }
}

/**
 * SVG from @fortawesome/font-awesome-free
 * CC BY 4.0 License (https://creativecommons.org/licenses/by/4.0/)
 */
html.append(
  dom.footer,
  new Icon(
    "Keybase",
    "https://keybase.io/team/cosmic_plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 412.3 512\"><path d=\"M177.2 430.9c0 9.8-8 17.8-17.8 17.8s-17.8-8-17.8-17.8 8-17.8 17.8-17.8c9.8-.1 17.8 7.9 17.8 17.8zM270 413c-9.8 0-17.8 8-17.8 17.8s8 17.8 17.8 17.8 17.8-8 17.8-17.8-8-17.8-17.8-17.8zm142.3-36c0 38.9-7.6 73.9-22.2 103h-27.3c23.5-38.7 30.5-94.8 22.4-134.3-16.1 29.5-52.1 38.6-85.9 28.8-127.8-37.5-192.5 19.7-234.6 50.3l18.9-59.3-39.9 42.3c4.8 26.7 15.7 51.3 31.2 72.3H46.1c-9.7-15.8-17.2-33-22.2-51.3L.1 454c0-74.9-5.5-147.6 61.5-215.2 20.2-20.4 43.7-36.2 69.1-46.7-6.8-13.5-9.5-29.2-7.8-46l-19.9-1.2c-17.9-1.1-31.6-16.5-30.6-34.4v-.1L74 84.2c1.1-17.1 15.4-30.6 32.5-30.6 1.3 0-.3-.1 28.2 1.7 13.9.8 21.5 9.8 22.8 11.4 7.1-10.4 14.5-20.5 24.6-34.5l20.6 12.1c-13.6 29-9.1 36.2-9 36.3 3.9 0 13.9-.5 32.4 5.7C246 92.9 262 107 271 126c.4.9 15.5 29 1.2 62.6 19 6.1 51.3 19.9 82.4 51.8 36.6 37.6 57.7 87.4 57.7 136.6zM128 122.3c3.2-10 7.7-19.7 13.1-29.4.1-2 2.2-13.1-7.8-13.8-28.5-1.8-26.3-1.6-26.7-1.6-4.6 0-8.3 3.5-8.6 8.1l-1.6 26.2c-.3 4.7 3.4 8.8 8.1 9.1l23.5 1.4zm25.8 61.8c5.6 9.4 14.1 16.1 22.3 20 0-21.2 28.5-41.9 52.8-17.5l8.4 10.3c20.8-18.8 19.4-45.3 12.1-60.9-13.8-29.1-46.9-32-54.3-31.7-10.3.4-19.7-5.4-23.7-15.3-13.7 21.2-37.2 62.5-17.6 95.1zm82.9 68.4L217 268.6c-1.9 1.6-2.2 4.4-.6 6.3l8.9 10.9c1 1.2 3.8 2.7 6.3.6l19.6-16 5.5 6.8c4.9 6 13.8-1.4 9-7.3-63.6-78.3-41.5-51.1-55.3-68.1-4.7-6-13.9 1.4-9 7.3 1.9 2.3 18.4 22.6 19.8 24.3l-9.6 7.9c-4.6 3.8 2.6 13.3 7.4 9.4l9.7-8 8 9.8zm118.4 25.7c-16.9-23.7-42.6-46.7-73.4-60.4-7.9-3.5-15-6.1-22.9-8.6-2 2.2-4.1 4.3-6.4 6.2l31.9 39.2c10.4 12.7 8.5 31.5-4.2 41.9-1.3 1.1-13.1 10.7-29 4.9-2.9 2.3-10.1 9.9-22.2 9.9-8.6 0-16.6-3.8-22.1-10.5l-8.9-10.9c-6.3-7.8-7.9-17.9-5-26.8-8.2-9.9-8.3-21.3-4.6-30-7.2-1.3-26.7-6.2-42.7-21.4-55.8 20.7-88 64.4-101.3 91.2-14.9 30.2-18.8 60.9-19.9 90.2 8.2-8.7-3.9 4.1 114-120.9l-29.9 93.6c57.8-31.1 124-36 197.4-14.4 23.6 6.9 45.1 1.6 56-13.9 11.1-15.6 8.5-37.7-6.8-59.3zM110.6 107.3l15.6 1 1-15.6-15.6-1-1 15.6z\"/></svg>"
  ),
  new Icon(
    "Telegram",
    "https://t.me/cosmic_plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z\"/></svg>"
  ),
  new Icon(
    "Reddit",
    "https://reddit.com/r/cosmic_plus",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"/></svg>`
  ),
  new Icon(
    "Twitter",
    "https://twitter.com/cosmic_plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z\"/></svg>"
  ),
  new Icon(
    "Medium",
    "https://medium.com/cosmic-plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z\"/></svg>"
  ),
  new Icon(
    "GitHub",
    "https://github.com/cosmic-plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 496 512\"><path d=\"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z\"/></svg>"
  ),
  new Icon(
    "Mail",
    "mailto:mister.ticot@cosmic.plus",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z\"/></svg>"
  ),
  donateIcon
)

"use strict"
/**
 * Footer
 */

const dom = require("@cosmic-plus/domutils/es5/dom")
const html = require("@cosmic-plus/domutils/es5/html")

const donate = require("./helpers/donate")
const Icon = require("./helpers/icon")

html.append(
  dom.footer,
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/twitter.svg"),
    "Follow on Twitter",
    "https://twitter.com/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/reddit-alien.svg"),
    "Follow on Reddit",
    "https://reddit.com/r/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/medium-m.svg"),
    "Follow on Medium",
    "https://medium.com/cosmic-plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/telegram-plane.svg"),
    "Chat on Telegram",
    "https://t.me/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/keybase.svg"),
    "Chat on Keybase",
    "https://keybase.io/team/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/github-alt.svg"),
    "Source-code on GitHub",
    "https://git.cosmic.plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/solid/envelope.svg"),
    "Contact by Email",
    "mailto:mister.ticot@cosmic.plus"
  ),
  new Icon(
    require("@cosmic-plus/assets/svg/donate.svg"),
    "Donate Lumens",
    donate
  )
)

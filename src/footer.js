"use_strict"
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
    require("@fortawesome/fontawesome-free/svgs/brands/keybase.svg"),
    "Keybase",
    "https://keybase.io/team/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/telegram-plane.svg"),
    "Telegram",
    "https://t.me/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/reddit-alien.svg"),
    "Reddit",
    "https://reddit.com/r/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/twitter.svg"),
    "Twitter",
    "https://twitter.com/cosmic_plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/medium-m.svg"),
    "Medium",
    "https://medium.com/cosmic-plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/brands/github-alt.svg"),
    "GitHub",
    "https://git.cosmic.plus"
  ),
  new Icon(
    require("@fortawesome/fontawesome-free/svgs/solid/envelope.svg"),
    "Email",
    "mailto:mister.ticot@cosmic.plus"
  ),
  new Icon(require("../bundled/donate.svg"), "Donate", donate)
)

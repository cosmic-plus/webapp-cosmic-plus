"use_strict"
/**
 * Footer Icons
 */
const Gui = require("@cosmic-plus/domutils/es5/gui")

class Icon extends Gui {
  constructor (title, href, svg) {
    super(
      `<a %href %title target="_blank" rel="noopener">${svg}</a>`,
      { title, href, svg })
  }
}

module.exports = Icon

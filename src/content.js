"use_strict"
/**
 * Content class
 */

const Gui = require("@cosmic-plus/jsutils/gui")
const content = require("./content.json").content

/**
 * Class
 */

class ContentGui extends Gui {
  constructor (type) {
    super(`%formatItem:items...`)
    this.items = content.filter(item => item.type === type) || []
  }

  formatItem (item) {
    return new ContentGui.Section(item)
  }
}

ContentGui.Section = class ContentSection extends Gui {
  constructor (item) {
    super(
      `
<section class="ContentSection" %style>
  %formatBackground:background
  <em>%short_desc</em>
  <h2>%name</h2>
  <p>%description</p>
  <hr>
  <nav>%formatLink:links...</nav>
</section>
    `,
      item
    )
  }

  formatLink (link) {
    return new Gui(`<a href=%1>%0</a>`, link)
  }
  formatBackground (background) {
    if (background) {
      return new Gui(`<img class="background" src=%background>`, { background })
    }
  }
}

/**
 * Export
 */

module.exports = ContentGui

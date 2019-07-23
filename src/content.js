"use_strict"
/**
 * Content class
 */

const Gui = require("@cosmic-plus/domutils/es5/gui")
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
  %toBackground:background
  <aside>%short_desc</aside>
  <h2>%name</h2>
  <p>%description</p>
  <nav>%toLink:links...</nav>
</section>
    `,
      item
    )
  }

  toLink (link) {
    if (link[1].startsWith("#")) {
      return new Gui(`<a href=%1 >%0</a>`, link)
    } else {
      return new Gui(`<a href=%1 target="_blank" rel="noopener">%0</a>`, link)
    }
  }

  toBackground (background) {
    if (background) {
      return new Gui(`<img class="background" src=%background>`, { background })
    }
  }
}

/**
 * Export
 */

module.exports = ContentGui

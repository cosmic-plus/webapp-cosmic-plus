"use_strict"
/**
 * Donate Interface
 */
const SideFrame = require("./side-frame")

function donate () {
  const amount = prompt(`\
Cosmic.plus welcome donations. Each contribution matters. :)

Amount in Lumens:\
`)

  if (isNaN(Number(amount))) confirm(`Not a valid amount: ${amount}`)
  else if (amount) showDonationFrame(amount)
}

function showDonationFrame (amount) {
  const base = "https://cosmic.link/?payment&network=public"
  const memo = "Donatation%20to%20Cosmic.plus"
  const destination = "GAWO2C52D57XBT7SQL6YB3XPHFLFD2J4Z5RN7HPFZSHXJMXH72HRXNV3"
  const url = `${base}&memo=${memo}&amount=${amount}&destination=${destination}`
  new SideFrame(url)
}

module.exports = donate

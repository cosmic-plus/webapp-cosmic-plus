"use strict"
/**
 * Donate Interface
 */
const SideFrame = require("cosmic-lib/es5/helpers/side-frame")

function donate () {
  const amount = prompt(`\
Donations are put to good use. Thank you!

Amount in Lumens:\
`)

  if (isNaN(Number(amount))) confirm(`Not a valid amount: ${amount}`)
  else if (amount) showDonationFrame(amount)
}

function showDonationFrame (amount) {
  const base = "https://cosmic.link/?payment&network=public"
  const memo = "Donation%20to%20Cosmic.plus"
  const destination = "tips*cosmic.plus"
  const url = `${base}&memo=${memo}&amount=${amount}&destination=${destination}`
  new SideFrame(url)
}

module.exports = donate

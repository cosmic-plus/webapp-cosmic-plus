"use_strict"
/**
 * Donate Interface
 */
const SideFrame = require("./side-frame")

function donate () {
  const amount = prompt(`\
Cosmic Plus runs on donation. Each contribution makes me happy. :)

Enter an amount (in Lumens):\
`)

  if (isNaN(Number(amount))) confirm(`Not a valid amount: ${amount}`)
  else if (amount) showDonationFrame(amount)
}

function showDonationFrame (amount) {
  const base = "https://cosmic.link/?payment&network=public"
  const memo = "Donate%20to%20Cosmic.Plus"
  const destination = "GAWO2C52D57XBT7SQL6YB3XPHFLFD2J4Z5RN7HPFZSHXJMXH72HRXNV3"
  const url = `${base}&memo=${memo}&amount=${amount}&destination=${destination}`
  new SideFrame(url)
}

module.exports = donate

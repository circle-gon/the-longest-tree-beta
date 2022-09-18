const modInfo = {
  name: "The Biggest Tree",
  id: "BigTreeID123",
  author: "A Group Of People",
  pointsName: "points",
  modFiles: ["tree.js", "layers/universeMachine.js", "layers/uni1.js", "layers/uni2.js"],
  discordName: "",
  discordLink: "",
  initialStartPoints: Decimal.dTen, // Used for hard resets and new players
  offlineLimit: 10,  // In hours
}

// Set your version in num and name
const VERSION = {
  num: "0.0",
  name: "Literally nothing",
}

const changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

const winText = "Congratulations! You have reached the end and beaten this game, for now..."

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
const doNotCallTheseFunctionsEveryTick = [

]

function getStartPoints() {
  return modInfo.initialStartPoints
}

// Determines if it should show points/sec
function canGenPoints() {
  return true
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return Decimal.dZero

  let gain = Decimal.dOne
  if (hasUpgrade("r", 12)) gain = gain.add(upgradeEffect("r", 12))
  if (hasUpgrade("p", 11)) gain = gain.times(Decimal.dTwo)
  if (hasUpgrade("p", 12)) gain = gain.times(Decimal.dTwo)
  if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
  if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
	if (hasUpgrade("p", 32)) gain=gain.mul(clickableEffect("p", 11))
  if (player.d.unlocked) gain = gain.pow(tmp.d.effect)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {

  }
}

// Display extra things at the top of the page
const displayThings = [
  () => player.u.universe === 0 ? "<br>Start a universe challenge!" : ""
]

// Determines when the game "ends"
function isEndgame() {
  return player.points.gte("e280000000")
}



// Less important things beyond this point!

// Style for the background, can be a function
const backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600 // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {

}
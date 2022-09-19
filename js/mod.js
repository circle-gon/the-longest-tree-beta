// DO NOT CHANGE ID
const modInfo = {
  name: "The Biggest Tree",
  id: "BigTreeID123",
  author: "A Group Of People",
  pointsName: "points",
  modFiles: ["tree.js", "layers/universeMachine.js", "layers/uni1.js", "layers/uni2.js"],
  discordName: "The Longest Tree",
  discordLink: "https://discord.gg/EyyjFVVwTS",
  initialStartPoints: Decimal.dTen, // Used for hard resets and new players
  offlineLimit: 168,  // In hours
}

// Set your version in num and name
const VERSION = {
  num: "0.0.1.5 Beta",
  name: "The Longest Prestige",
}

const changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.1</h3><br>
		- Added universes, U1, U2, Prestige, Reputation, and Difficulty.<br>
		- Added upgrades and the Universe Transportation Machine.<br>
		- Added the Garbage collector and incinerator.`

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
  if (hasUpgrade("p", 15)) gain = gain.mul(clickableEffect("p", 11))
  if (hasUpgrade("p", 11)) gain = gain.times(Decimal.dTwo)
  if (hasUpgrade("p", 12)) gain = gain.times(Decimal.dTwo)
  if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
  if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
	if (hasUpgrade("p", 32)) gain=gain.mul(clickableEffect("p", 11))
	if(hasUpgrade("r",31))gain=gain.mul(2)
  gain = gain.pow(Decimal.pow(1.01, Math.min(25, player.d.upgrades.filter(x=>(x%10<6&&x/10<6)).length)))
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
  return hasUpgrade("r",23)
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
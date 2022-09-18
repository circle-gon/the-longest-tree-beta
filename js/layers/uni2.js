
addLayer("r", {
  universe: 2,
  name: "reputation", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order,
  row: 0,
  startData() {
    return {
      unlocked: true,
      points: Decimal.dZero,
      dumped: Decimal.dZero,
    }
  },
  color: "#B423EC",
  requires: new Decimal(10000), // Can be a function that takes requirement increases into account
  resource: "reputation points", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    let mult = Decimal.dOne
    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    let exp = Decimal.dOne
    return exp
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { key: "r", description: "R: Reset for reputation points", onPress() { 
    if (canReset(this.layer)) doReset(this.layer) 
    } 
    },
  ],
  layerShown() { return player.u.universe === 2 },
  upgrades: {
    11: {
      title: "Reputation boost",
      description() { return "Reputation boosts prestige point gain. Currently: x" + format(tmp.r.upgrades[11].effect) },
      cost: new Decimal(1),
      effect() {
        return player.r.points.add(1).cbrt()
      },
      unlocked() {
        return true
      }
    },
    12: {
      title: "Oh no, more recursion!",
      description() { return "Per upgrade add 1 to base point gain. Currently: +" + formatWhole(tmp.r.upgrades[12].effect) },
      cost: new Decimal(5),
      effect() {
        return player.r.upgrades.length
      },
      unlocked() {
        return true
      }
    },
    13: {
      title: "An Established Link",
      description() {
        return hasUpgrade("r", 13) ? "You really didn't think the developer was that evil right?" : "Re-establish the link between U1 and U2."
      },
      cost: new Decimal(25),
      unlocked() {
        return true
      }
    },
  },
  tabFormat: [
    "main-display",
    "prestige-button",
    "resource-display",
    "upgrades",
  ]
})
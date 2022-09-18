
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
			money: Decimal.dZero,
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
		if (hasUpgrade("r", 22)) mult = mult.mul(upgradeEffect("r", 22))
    return mult
  },
  gainExp: Decimal.dOne, // Calculate the exponent on main currency from bonuses
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { 
      key: "r", 
      description: "R: Reset for reputation points", 
      onPress() { 
        if (canReset(this.layer)) doReset(this.layer) 
      } 
    },
  ],
  layerShown() { 
    return player.u.universe === 2 
  },
  upgrades: {
    11: {
      title: "Reputation boost",
      description() { return "Reputation boosts prestige point gain. Currently: x" + format(tmp.r.upgrades[11].effect) },
      cost: Decimal.dOne,
      effect() {
        return player.r.points.add(Decimal.dOne).cbrt()
      }
    },
    12: {
      title: "Oh no, more recursion!",
      description() { 
        return "Per upgrade add 1 to base point gain. Currently: +" + formatWhole(tmp.r.upgrades[12].effect) 
      },
      cost: new Decimal(5),
      effect() {
        return player.r.upgrades.length
      },
    },
    13: {
      title: "An Established Link",
      description() {
        return hasUpgrade("r", 13) ? "You really didn't think the developer was that evil right?" : "Re-establish the link between U1 and U2."
      },
      cost: new Decimal(25)
    },
    21: {
      title: "$$$$$$$$$$$$$$",
      description: "Start gaining money based on your reputation.",
      cost: new Decimal(1),
      unlocked() {
        return hasMilestone("d", 0)
      }
    },
    22: {
      title: "%%%%%%%%%%%%%",
      description() {
        return "Use your wealth to gain more reputation! Currently: x" + format(upgradeEffect(this.layer, this.id))
      },
			effect() {
        return player.r.money.pow(0.25)
      }, //just ^0.25
      cost: Decimal.dTwo,
      unlocked() {
        return hasUpgrade("r", 21)
      }
    },
    23: {
      title: "^^^^^^^^^^^^",
      description: "Unlock the shop!",
      cost: new Decimal(56),
      unlocked() {
        return hasUpgrade("r", 22)
      }
    },
		31: {
      title: "Generic Upgrade 20",
      description: "Doubles point gain.",
      cost: new Decimal(25)
    },
  	32: {
      title: "More maggots!",
      description: "Spend your money on more maggots, therefore boosting garbage collection even more!",
      cost: new Decimal(25)
    },
  },
	update(diff){
		if (hasUpgrade("r", 21)) player.r.money = player.r.money.add(tmp.r.moneyGain.mul(diff))
	},
	moneyGain() {
		let gain = player.r.points.add(Decimal.dOne).log10().pow(Decimal.dTwo)
		return gain
	},
  tabFormat: {
		"Upgrades": {
			unlocked(){return true},
			content:[
    "main-display",
    "prestige-button",
    "resource-display",
    ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
				["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
		["display-text", () => {
			if (hasMilestone("d", 0)) return "You have $" + format(player.r.money) + ". You are gaining $" + format(tmp.r.moneyGain) + "/s."
    }]
				]
				},
		"Shop": {
			unlocked(){return hasUpgrade("r",23)},
			content:["main-display",
    "prestige-button",
    "resource-display",
							 ["row",[["upgrade",31],["upgrade",32]]],
			],
    }
  }
})
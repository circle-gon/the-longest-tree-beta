
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
  requires() {
    let req = new Decimal(10000)
      
    //if (player.d.unlocked) req = req.pow(tmp.d.effect)
    return req
  },
  resource: "reputation points", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { return player.points }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent(){
		let exp = new Decimal(0.05)
    if (hasUpgrade("r", 34)) exp = exp.mul(4)
    if (hasUpgrade("d", 54)) exp = exp.plus(0.11)
		return exp
  }, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    let mult = Decimal.dOne
		if (hasUpgrade("r", 22)) mult = mult.mul(upgradeEffect("r", 22))
    return mult
  },
  gainExp(){
		if(hasUpgrade("d",51))return upgradeEffect("d", 11)
		return Decimal.dOne},
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
        return hasMilestone("d", 1)
      }
    },
    22: {
      title: "%%%%%%%%%%%%%",
      description() {
        return "Use your wealth to gain more reputation! Currently: x" + format(upgradeEffect(this.layer, this.id)) + (hasUpgrade("d", 52) ? " (set by difficulty upgrade 52)" : "")
      },
			effect() {
				if(hasUpgrade("d",52))return 100
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
      description: "Spend your money on more maggots, therefore boosting garbage even more! Raises prestige points to garbage conversation by 1.2.",
      cost: new Decimal(25)
    },
  	33: {
      title: "Fire Energy",
      description: "Raises the incinerating garbage effect by ^1.5.",
      cost: new Decimal(125)
    },
  	34: {
      title: "Reputable Source",
      description: "Raise reputation gain to ^4 before any other exp affectors.",
      cost: new Decimal(250)
    },
  	35: {
      title: "Making Life Easier",
      description: "Divide difficulty requirement by sqrt(difficulty+1).",
      effect() {
        return player.d.points.plus(Decimal.dOne).sqrt()
      },
      effectDisplay() {
        return "/" + format(upgradeEffect("r", 35))
      },
      cost: new Decimal(969)
    },
		36: {
      title: "Mega-Reputation",
      description: "It's time for another layer! Unfortunately you'll have to wait for the next update.",
      cost: new Decimal(1e6)
    },
  },
	update(diff){
		if (hasUpgrade("r", 21)) player.r.money = player.r.money.add(tmp.r.moneyGain.mul(diff))
	},
	moneyGain() {
		let gain = player.r.points.add(Decimal.dOne).log10().pow(Decimal.dTwo).div(10)
    gain = gain.sub(buyableEffect("m", 12).cost)
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
							 ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35],["upgrade",36]]],
			],
    }
  }
})
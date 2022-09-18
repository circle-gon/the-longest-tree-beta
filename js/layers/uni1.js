addLayer("p", {
  universe: 1,
  name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: Decimal.dZero,
    }
  },
  color: "#4BDC13",
  requires: Decimal.dTen, // Can be a function that takes requirement increases into account
  resource: "prestige points", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() { 
    return player.points 
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent() {
		if (player.d.points.lte(3)) return 0.75
		return new Decimal(0.01).add(Decimal.div(0.74, player.d.points.sub(3).div(20).add(Decimal.dOne)))
	
	}, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
    let mult = Decimal.dOne
    if (hasUpgrade("p", 25)) mult = mult.mul(upgradeEffect("p", 25))
    if (hasUpgrade("p", 15)) mult = mult.mul(clickableEffect("p", 11))
    if (hasUpgrade("r", 11)) mult = mult.mul(upgradeEffect("r", 11))
    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    let exp = Decimal.dOne
    if (!hasUpgrade("p", 24) && hasUpgrade("p", 15) && !hasMilestone("d",1)) exp = exp.mul(0.75)
    return exp
  }, //hi
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { 
      key: "p", 
      description: "P: Reset for prestige points", 
      onPress() { 
        if (canReset("p")) doReset("p") 
      } 
    },
  ],
  layerShown() { 
    return player.u.universe === 1 
  },
  clickables: {
    11: {
      title: "Garbage collector",
      display() {
        return `Throw some of your extra prestige points into this garbage collector to get a boost to points and prestige points!<br>Amount of garbage: ${format(getClickableState("p", 11))}<br>Effect: ${format(clickableEffect("p", 11))}x<br>Click to gain ${format(tmp.p.clickables[11].gain)} garbage!`
      },
      unlocked() {
        return hasUpgrade("p", 15)
      },
      onClick() {
        //what even is this s upposed to do
        setClickableState("p", 11, Decimal.plus(player.p.clickables[11], tmp.p.clickables[11].gain))
        player.p.points = Decimal.dZero
      }, //I tried copying some code that'd made it easier to edit instead of adding the multipliers they just multiply dumped
      canClick() {
        return player.p.points.gt(Decimal.dZero)
      },
      effect() {
        return Decimal.dOne.add(getClickableState("p", 11)).log(8).plus(Decimal.dOne)
      },
      gain() {
        let dump = player.p.points
        if (hasUpgrade("p", 31)) dump = dump.mul(upgradeEffect("p", 31))
        if (hasUpgrade("p", 23)) dump = dump.pow(new Decimal(1.8))
        if (hasUpgrade("r", 32)) dump = dump.pow(new Decimal(1.2))
        return dump
      }
    },
		12: {
      title: "Garbage Incinerator",
      display() {
        return `Throw some of your extra garbage into this incinerator to get a boost to points!<br>Amount of burned garbage: ${format(getClickableState("p", 12))}<br>Effect: ${format(clickableEffect("p", 12))}x<br>Click to burn ${format(tmp.p.clickables[12].gain)} garbage!`
      },
      unlocked() {
        return hasUpgrade("p", 32)
      },
      onClick() {
        player.p.clickables[12] = Decimal.add(player.p.clickables[12], tmp.p.clickables[12].gain)
        setClickableState("p", 11, Decimal.dZero)
      }, 
      canClick() {
        return Decimal.gt(getClickableState("p", 11), Decimal.dZero)
      },
			effect() {
        return Decimal.dOne.add(player.p.clickables[12]).ln().add(Decimal.dOne)
      },
			gain() {
        return getClickableState("p", 11)
      },
    },
  },
  upgrades: {
    11: {
      title: "Generic upgrade #1",
      description: "Doubles point gain.",
      cost: Decimal.dOne
    },
    12: {
      title: "Generic-er upgrade #1.5",
      description: "Doubles point gain, again.",
      cost: Decimal.dTwo,
      unlocked() {
        return hasUpgrade("p", 11)
      }
    },
    13: {
      title: "Generic upgrade #2",
      description: `Better upgrade when? Multiplies point gain based on points.`,
      cost: new Decimal(5),
      effect() {
        return player.points.add(Decimal.dOne).log10().add(Decimal.dOne)
      },
      effectDisplay() {
        return format(upgradeEffect("p", 13)) + "x"
      },
      unlocked() {
        return hasUpgrade("p", 12)
      }
    },
    14: {
      title: "Finally, Prestige Points aren't useless!",
      description: "Something better than point gain when? Anyway, multiplies point gain by prestige points.",
      cost: new Decimal(12),
      effect() {
        return player.p.points.pow(hasUpgrade("p", 15) ? 0.5 : 1 / 3).plus(Decimal.dOne)
      },
      effectDisplay() {
        return format(upgradeEffect("p", 14)) + "x"
      },
      unlocked() {
        return hasUpgrade("p", 13)
      }
    },
    15: {
      title() {
        return hasUpgrade("p", 15) ? "A lotta stuffs..." : "Mysterious?"
      },
      description() {
        return hasUpgrade("p", 15) ? `${!hasUpgrade("p", 24) ? "You just got utterly trolled, raises Prestige Point gain by ^0.75, but m" : "M"}akes the previous upgrade better. Also unlocks some more upgrades, and a... garbage collector?!` : player.p.points.gte(100) ? "Well, I guess you gotta buy it..." : "???"
      },//game bugged check console
      cost: new Decimal(50),
      unlocked() { return hasUpgrade("p", 14) }
    },
    21: {
      title() {
        return hasUpgrade("p", 22) ? "The godly challenge" : "Another useful upgrade?!"
      },
      description: "Unlocks a layer: [REDACTED]",
      cost: new Decimal(1e696969),
      unlocked() {
        return hasUpgrade("p", 15)
      }
    },
    22: {
      title: "The previous upgrade shouldn't be that impossible...",
      description: "Unlocks a mysterious switch...",
      cost: new Decimal(200),
      unlocked() {
        return hasUpgrade("p", 15)
      },
    },
    23: {
      title: "Upgrade with garbage name",
      description: "For your sanity, we've decided to not show you the pathetic, garbage pun. (raises prestige point to garbage conversion by 1.8)",
      cost: new Decimal(500),
      unlocked() {
        return hasUpgrade("p", 15)
      }
    },
    24: {
      title: "The actual garbage collector",
      description: "You found the machine that actually collects the garbage! Since you own a garbage collector, there's no longer a tax on the points! (upgrade 5's downside is disabled)",
      cost: new Decimal(1000),
      unlocked() {
        return hasUpgrade("p", 23)
      }
    },
    25: {
      title: "Prestiged Prestige Points",
      description: "Multiplies garbage and prestige gain by 1.1 for every OOM of prestige points.",
      cost: new Decimal(5000),
      unlocked() {
        return hasUpgrade("p", 24)
      },
      effect() {
        return Decimal.pow(1.1, player.p.points.max(10).log10())
      },
      effectDisplay() {
        return format(upgradeEffect("p", 25)) + "x"
      }
    },
    26: {
      title: "More universes, more possibilities!",
      description: "Unlocks universe 2.",
      cost: new Decimal(25000),
      unlocked() {
        return hasUpgrade("p", 25)
      },
    },
    31: {
      title: "Maggots?",
      description: "Increases garbage gain based on the existing amount of garbage, don't ask how this works.",
      cost: new Decimal(75000),
      unlocked() {
        return hasUpgrade("p", 26)
      },
      effect() {
        return Decimal.pow(1.1, Decimal.max(getClickableState("p", 11), Decimal.dTen).log10())
      },
      effectDisplay() {
        return format(upgradeEffect("p", 31)) + "x"
      }
    },
    32: {
      title: "Incinerator",
      description: "Allows burning garbage for points.",
      cost: new Decimal(100000),
      unlocked() {
        return hasUpgrade("p", 25) && (player.d.points.gte(Decimal.dTwo) || hasMilestone("d", 0))
      },
    },
   },
    tabFormat: [
      "main-display",
      "prestige-button",
      "resource-display",
      "upgrades",
      [
        "row",
        [
          ["clickable", 11],
          ["clickable", 12]
        ]
      ]
    ]
})

addLayer("d", {
  universe: 1,
  name: "difficulty", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  effect() {
    return Decimal.pow(hasMilestone("d",1)?0.85:0.8, player.d.points)
  }, 
  effectDescription() { return "raising point gain to the ^" + format(tmp.d.effect) },
  branches: ["p"],
  startData() {
    return {
      unlocked: false,
      points: Decimal.dZero,
    }
  },
  color: "#AB9F43",
  requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
  resource: "difficulty points", // Name of prestige currency
  baseResource: "prestige points", // Name of resource prestige is based on
  baseAmount() { return player.p.points }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: 1,
  exponent: 1, // Prestige currency exponent
  gainMult: Decimal.dOne, // Calculate the multiplier for main currency from bonuses
  gainExp: Decimal.dOne, // Calculate the exponent on main currency from bonuses
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    { 
      key: "d", 
      description: "D: Reset for difficulty", 
      onPress() { 
        if (canReset("d")) doReset("d") 
      } 
    },
  ],
  layerShown() { 
    return player.u.universe === 1 && (hasUpgrade("p", 31) || player.d.unlocked) 
  },
   upgrades: {
    11: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks more upgrades, raises point gain by 1.01",
      cost: new Decimal(4),
    },
    12: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(5),
    unlocked() {
      return hasUpgrade("d", 11)
    },
    },
    13: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(6),
    unlocked() {
      return hasUpgrade("d", 12)
      },
    },
    14: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(7),
    unlocked() {
      return hasUpgrade("d", 13)
      },
    },
    15: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(8),
    unlocked() {
      return hasUpgrade("d", 14)
      },
    },
    21: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(5),
    unlocked() {
      return hasUpgrade("d", 11)
      },
    },
    22: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(6),
    unlocked() {
      return hasUpgrade("d", 12)
      },
    },
    23: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(7),
    unlocked() {
      return hasUpgrade("d", 13)
      },
    },
    24: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(8),
    unlocked() {
      return hasUpgrade("d", 14)
      },
    },
    25: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(9),
    unlocked() {
      return hasUpgrade("d", 15)
      },
    },
    31: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(6),
    unlocked() {
      return hasUpgrade("d", 21)
      },
    },
    32: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(7),
    unlocked() {
      return hasUpgrade("d", 22)
      },
    },
    33: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(8),
    unlocked() {
      return hasUpgrade("d", 23)
      },
    },
    34: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(9),
    unlocked() {
      return hasUpgrade("d", 24)
      },
    },
    35: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: Decimal.dTen,
    unlocked() {
      return hasUpgrade("d", 25)
      },
    },
    41: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(7),
    unlocked() {
      return hasUpgrade("d", 31)
      },
    },
    42: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(8),
    unlocked() {
      return hasUpgrade("d", 32)
      },
    },
    43: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(9),
    unlocked() {
      return hasUpgrade("d", 33)
      },
    },
    44: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: Decimal.dTen,
    unlocked() {
      return hasUpgrade("d", 34)
      },
    },
    45: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(11),
    unlocked() {
      return hasUpgrade("d", 35)
      },
    },
    51: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(8),
    unlocked() {
      return hasUpgrade("d", 41)
      },
    },
    52: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(9),
    unlocked() {
      return hasUpgrade("d", 42)
      },
    },
    53: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: Decimal.dTen,
    unlocked() {
      return hasUpgrade("d", 43)
      },
    },
    54: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Unlocks more upgrades, raises point gain by 1.01",
    cost: new Decimal(11),
    unlocked() {
      return hasUpgrade("d", 44)
      },
    },
    55: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
    title: "Generic upgrades",
    description: "Raises point gain by 1.01",
    cost: new Decimal(12),
    unlocked() {
      return hasUpgrade("d", 45)
      },
    },
   },
	effect() {
    return Decimal.pow(hasMilestone("d",1) ? 0.85 : 0.8, player.d.points)
  },
  milestones:{
		0:{
			requirementDescription: "3 Difficulty",
			effectDescription: "Keep U1, U2, and the universe machine unlocked. Unlock a new U2 feature. Sadly, your garbage collector got taken away :(",
			done() {
        return player.d.points.gte(3)
      },
		},
		1:{
			requirementDescription: "4 Difficulty",
			effectDescription: "The Difficulty effect is now 0.85^x. Difficulty now nerfs prestige gain exponent.",
			done() {
        return player.d.points.gte(4)
      },
		},
	},
  tabFormat: [
    "main-display",
    "prestige-button",
    "resource-display",
		"milestones",
    "upgrades",
		
  ]
})
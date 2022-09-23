addLayer("p", {
  passiveGeneration() {
    let g = 0
    if (hasMilestone("d", 5)) g += 0.1
    if (hasMilestone("d", 6)) g += 0.125
    return g
  },
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
    if (hasUpgrade("p", 33) && player.p.points <= new Decimal(1e6)) mult = mult.mul(1.25)
		if (hasUpgrade("d",53))mult = mult.mul(1.25)
		if (hasUpgrade("d",35))mult = mult.mul(1.25)
    return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    let exp = Decimal.dOne
    if (!hasUpgrade("p", 24) && hasUpgrade("p", 15) && !hasMilestone("d", 1)) exp = exp.mul(0.75)
    return exp
  }, //hi
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [{
    key: "p",
    description: "P: Reset for prestige points",
    onPress() {
      if (canReset("p")) doReset("p")
    }
  }, ],
  layerShown() {
    return player.u.universe === 1
  },
	update(diff){
		if(hasUpgrade("p",34))setClickableState("p",11,Decimal.add(player.p.clickables[11],tmp.p.clickables[11].gain.mul(diff)))
		if(hasUpgrade("p",35))setClickableState("p",12,Decimal.add(player.p.clickables[12],tmp.p.clickables[12].gain.mul(diff)))
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
        if (hasUpgrade("p", 23)) dump = dump.pow(1.8)
        if (hasUpgrade("r", 32)) dump = dump.pow(1.2)
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
        return Decimal.dOne.add(player.p.clickables[12]).ln().add(Decimal.dOne).pow(hasUpgrade("r", 33) ? 1.5 : 1)
      },
      gain() {
        return new Decimal(getClickableState("p", 11))
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
        return player.points.add(Decimal.dOne).log10().add(Decimal.dOne).pow(hasUpgrade("d",25)?2:1)
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
      }, //game bugged check console
      cost: new Decimal(50),
      unlocked() {
        return hasUpgrade("p", 14)
      }
    },
    21: {
      title() {
        return hasUpgrade("p", 22) ? "The godly challenge" : "Another useful upgrade?!"
      },
      description: "Unlocks a layer: [REDACTED]",
      cost: new Decimal(1e20), // don't ask why
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
        return Decimal.pow(1.1, player.p.points.max(Decimal.dTen).log10())
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
        return hasUpgrade("p", 31) && (player.d.points.gte(Decimal.dTwo) || hasMilestone("d", 0))
      },
    },
    33: {
      title: "Compensation",
      description: "Multiplies prestige point gain by 1.25 while under 1e6 prestige points",
      cost: new Decimal(150000),
      unlocked() {
        return (hasUpgrade("p", 32) && hasUpgrade("d", 13))
      },
    },
    34: {
      title: "Trash Collection Service",
      description: "Automatically gain trash based on prestige points.",
      cost: new Decimal(1.11e11),
      unlocked() {
        return hasUpgrade("d", 55)
      },
    },
    35: {
      title: "Trash Burning Service",
      description: "Automatically burn trash.",
      cost: new Decimal(1e12),
      unlocked() {
        return hasUpgrade("d", 55)
      },
    },
  },
  doReset(l) {
    if (layers[l].row > this.row && layers[l].universe === 1) {
      const keep = []
      if (hasMilestone("d", 2)) keep.push("upgrades")
      if (hasMilestone("d", 4)) keep.push("clickables")
      layerDataReset("p", keep)
    }
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
  autoPrestige() {
    return hasMilestone("d", 3)
  },
  universe: 1,
  name: "difficulty", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  effect() {
    return Decimal.pow(hasUpgrade("d",55)?1.05:hasUpgrade("d",15)?0.875:hasMilestone("d", 1) ? 0.85 : 0.8, player.d.points).div(hasUpgrade("d",55)?5:1).min(1)
  },
  effectDescription() {
    return "which are raising point gain to the ^" + format(tmp.d.effect)
  },
  branches: ["p"],
  startData() {
    return {
      unlocked: false,
      points: Decimal.dZero
    }
  },
  color: "#AB9F43",
  requires(){let r= new Decimal(1e6)
						if(hasUpgrade("r",35))r=r.div(player.d.points.add(1).sqrt())
						 return r
						}, // Can be a function that takes requirement increases into account
  resource: "difficulty points", // Name of prestige currency
  baseResource: "prestige points", // Name of resource prestige is based on
  baseAmount() {
    return player.p.points
  }, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base(){
		if(hasUpgrade("d",55))return 10
		return 1},
  exponent: 1, // Prestige currency exponent
  gainMult: Decimal.dOne, // Calculate the multiplier for main currency from bonuses
  gainExp: Decimal.dOne, // Calculate the exponent on main currency from bonuses
  row: 1, // Row the layer is in on the tree (0 is the first row)
  canBuyMax: false,
  hotkeys: [{
    key: "d",
    description: "D: Reset for difficulty",
    onPress() {
      if (canReset("d")) doReset("d")
    }
  }, ],
  layerShown() {
    return player.u.universe === 1 && (hasUpgrade("p", 31) || player.d.unlocked)
  },
  upgrades: {
    11: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(4),
      unlocked() {
        return hasUpgrade("p", 32) || hasUpgrade("d", 11)
      },
    },
    12: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(5),
      unlocked() {
        return hasUpgrade("d", 11)
      },
    },
    13: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(6),
      unlocked() {
        return hasUpgrade("d", 12)
      },
    },
    14: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(7),
      unlocked() {
        return hasUpgrade("d", 13)
      },
    },
    15: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "NG+++ Buffs",
      description: "Reduce the difficulty nerf (^0.85 -> ^0.875)",
      cost: new Decimal(8),
      unlocked() {
        return hasUpgrade("d", 14)
      },
    },
    21: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(5),
      unlocked() {
        return hasUpgrade("d", 11)
      },
    },
    22: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, multiplies point gain by 2.2 after all exponents",
      cost: new Decimal(6),
      unlocked() {
        return hasUpgrade("d", 12)
      },
    },
    23: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(7),
      unlocked() {
        return hasUpgrade("d", 13)
      },
    },
    24: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(8),
      unlocked() {
        return hasUpgrade("d", 14)
      },
    },
    25: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic Upgrade #3",
      description: "Generic Upgrade #2 ^2 but disable the first 2 prestige upgrades",
      cost: new Decimal(9),
      unlocked() {
        return hasUpgrade("d", 15)
      },
    },
    31: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(6),
      unlocked() {
        return hasUpgrade("d", 21)
      },
    },
    32: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(7),
      unlocked() {
        return hasUpgrade("d", 22)
      },
    },
    33: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, multiplies point gain by 3.3 after all exponents",
      cost: new Decimal(8),
      unlocked() {
        return hasUpgrade("d", 23)
      },
    },
    34: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(9),
      unlocked() {
        return hasUpgrade("d", 24)
      },
    },
    35: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Prestige Upgrade 33",
      description: "1.25x prestige points",
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
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(8),
      unlocked() {
        return hasUpgrade("d", 32)
      },
    },
    43: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, raises point gain by 1.01",
      cost: new Decimal(9),
      unlocked() {
        return hasUpgrade("d", 33)
      },
    },
    44: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades",
      description: "Unlocks another generic upgrade, multiplies point gain by 4.4 after all exponents",
      cost: Decimal.dTen,
      unlocked() {
        return hasUpgrade("d", 34)
      },
    },
    45: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "those 12 difficulties",
      description: "Gain 12 bees every second and point gain ^1.2",
      cost: new Decimal(12),
      unlocked() {
        return hasUpgrade("d", 35)
      },
    },
    51: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Generic upgrades????",
      description: "Generic upgrades that raise point gain also raise reputation gain",
      cost: new Decimal(8),
      unlocked() {
        return hasUpgrade("d", 41)
      },
    },
    52: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Consistency",
      description: "Set reputation upgrade '%%%%%%%%' to 100x.",
      cost: new Decimal(9),
      unlocked() {
        return hasUpgrade("d", 42)
      },
    },
    53: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Prestige Upgrade 33",
      description: "1.25x prestige points",
      cost: Decimal.dTen,
      unlocked() {
        return hasUpgrade("d", 43)
      },
    },
    54: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "ALL 11 DIFFICULTIES",
      description: "reputation exponent +0.11",
      cost: new Decimal(11),
      unlocked() {
        return hasUpgrade("d", 44)
      },
    },
    55: { // 11->51 + 12, 12->52 + 13, 13->53 + 14, 14->54 + 15, 15->55 
      title: "Anti-Difficulty",
      description: "Difficulty effect is ^1.05 and /5 (max ^1) instead of ^0.875, but difficulty cost increases by 10x.",
      cost: new Decimal(20),
      unlocked() {
        return hasUpgrade("d", 45)
      },
    },
    61: {
      title: "Something new?",
      description: "Unlocks a <b><i>minigame</i></b>.",
      cost: new Decimal(6),
      unlocked() {
        return hasUpgrade("d", 12) || hasUpgrade("d", 21)
      },
    },
    62: {
      title: "Less repetitive?",
      description: "You can now buy max difficulty.",
      cost: new Decimal(1),
      unlocked() {
        return hasUpgrade("d", 55)
      }
    }
  },
	canBuyMax(){return hasUpgrade("d",62)},
  milestones: {
    0: {
      requirementDescription: "3 Difficulty",
      effectDescription: "Keep U1, U2, and the universe machine unlocked. Unlock a new U2 feature. Sadly, your garbage collector got taken away :(",
      done() {
        return player.d.points.gte(3)
      },
    },
    1: {
      requirementDescription: "4 Difficulty",
      effectDescription: "The Difficulty effect is now 0.85^x. Difficulty now nerfs prestige gain exponent.",
      done() {
        return player.d.points.gte(4)
      },
    },
    2: {
      requirementDescription: "5 Difficulty",
      effectDescription: "Keep prestige upgrades.",
      done() {
        return player.d.points.gte(5)
      },
    },
    3: {
      requirementDescription: "6 Difficulty",
      effectDescription: "Automatically reset for difficulty.",
      done() {
        return player.d.points.gte(6)
      },
    },
    4: {
      requirementDescription: "7 Difficulty",
      effectDescription: "Garbage does not reset on difficulty.",
      done() {
        return player.d.points.gte(7)
      },
    },
    5: {
      requirementDescription: "8 Difficulty",
      effectDescription: "Gain 10% Prestige Points / sec",
      done() {
        return player.d.points.gte(8)
      },
    },
    6: {
      requirementDescription: "9 Difficulty",
      effectDescription: "+12.5% effect to previous milestone ( Additive )",
      done() {
        return player.d.points.gte(9)
      },
    },
    7: {
      requirementDescription: "11 Difficulty",
      effectDescription: "Unlock Helium layer",
      done() {
        return player.d.points.gte(11)
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

addLayer("m", {
  universe: 0,
  name: "Minigame",
  symbol: "M",
  row: "side",
  color: "#FF0000",
  type: "none",
  position: 1, // this is position, not row
  layerShown() {
    return player.u.universe === 1 && hasUpgrade("d", 61)
  },
  startData() {
    return {
      proc: Decimal.dZero,
      bees: Decimal.dZero,
      prog: Decimal.dZero,
      notpicked: Decimal.dZero,
      honey: Decimal.dZero,
      totalSold: Decimal.dZero,
      beeCooldown: Decimal.dZero,
      reproduction: Decimal.dZero
    }
  },
  procGain() {
    return Decimal.dOne
  },
  tooltip() {
    if (hasUpgrade("m", 13)) {
      return `${format(player.m.bees)} Bees, ${format(player.m.honey)} Honey`
    }
    if (hasUpgrade("m", 12)) {
      return `${format(player.m.bees)} Bees`
    }
    if (hasUpgrade("m", 11)) {
      return `${format(player.m.proc)} Procrasination`
    }
    return "Go explore some more..."
  },
  honeyGain() {
    // bee constant, 12 bees x 6 weeks
    return player.m.bees.mul(tmp.m.beesOver.gt(0) ? 0.5 : 1).mul(1 / 72).sub(buyableEffect("m", 12).eff)
  },
  realHoneyGain() {
    return buyableEffect("m", 12).eff
  },
  beesOver() {
    return player.m.bees.sub(player.m.buyables[11]).max(Decimal.dZero)
  },
  timeToFinish() {
    return new Decimal(6)
  },
  beehiveSize() {
    return 100
  },
  value() {
    return new Decimal(10 / 64)
  },
  beeCooldown() {
    let time = Decimal.dOne
    if (hasUpgrade("m", 14)) time = time.div(7)
    return time
  },
  beeLoss() {
    return tmp.m.beesOver.div(2)
  },
  beeGain() {
    let gain = Decimal.dZero
    if (hasUpgrade("m", 15)) gain = tmp.m.beeTrapper
    gain = gain.sub(tmp.m.beeLoss)
		if(hasUpgrade("d",45)) gain=gain.add(12)
    return gain
  },
  beeTrapper() {
    let base = new Decimal(7)
    if (hasUpgrade("m", 16)) base = base.mul(upgradeEffect("m", 16))
    return base
  },
  beeReproduction() {
    //if (player.m.bees.lt(100)) return Decimal.dZero
    return player.m.bees.max(0).sqrt()
  },
  update(diff) {
    if (hasUpgrade("m", 11)) player.m.proc = player.m.proc.plus(tmp.m.procGain.mul(diff))
    if (hasUpgrade("m", 21)) {
      player.m.reproduction = player.m.reproduction.plus(tmp.m.beeReproduction.mul(diff))
    }
    if (hasUpgrade("m", 13)) {
      if (player.m.prog.gte(1)) {
        player.m.prog = Decimal.dZero
        player.m.bees = player.m.reproduction
        player.m.reproduction = Decimal.dZero
      } else if (player.m.bees.gt(Decimal.dZero)) {
        player.m.notpicked = player.m.notpicked.plus(tmp.m.honeyGain.mul(diff)).max(0)
        player.m.prog = player.m.prog.plus(tmp.m.timeToFinish.div(diff).recip())
      }
      player.m.beeCooldown = player.m.beeCooldown.sub(diff).max(0)
      player.m.bees = player.m.bees.plus(tmp.m.beeGain.mul(diff)).max(0)
    }
    player.m.honey = player.m.honey.plus(tmp.m.realHoneyGain.mul(diff))
  },
  buyables: {
    11: {
      title: "Flowers!",
      display() {
        return `Well, bees need flowers to produce honey. You have ${getBuyableAmount("m", 11)} flowers. Costs $10.`
      },
      cost() {
        return 10
      },
      canAfford() {
        return player.r.money.gte(tmp.m.buyables[11].cost)
      },
      buy() {
        player.r.money = player.r.money.sub(tmp.m.buyables[11].cost)
        player.m.buyables[11] = player.m.buyables[11].plus(Decimal.dOne)
      },
      unlocked() {
        return hasUpgrade("m", 12)
      }
    },
    12: {
      title: "Lazy bone employee",
      display() {
        return `Collects 1 teaspoon of honey from the bee hive. You have ${getBuyableAmount("m", 12)} of these bad guys. Also costs $0.1 per tick per these employees.`
      },
      effect(x) {
        const cost = x.mul(0.1)
        return {
          cost: player.r.money.lt(cost) ? Decimal.dZero : cost,
          eff: player.r.money.lt(x) || player.m.notpicked.lt(x) ? Decimal.dZero : x
        }
      },
      cost() {
        return 0
      },
      canAfford() {
        return player.r.money.gt(0)
      },
      buy() {
        player.m.buyables[12] = player.m.buyables[12].plus(Decimal.dOne)
      },
      unlocked() {
        return hasUpgrade("m", 22)
      },
      sellOne() {
        player.m.buyables[12] = player.m.buyables[12].sub(Decimal.dOne)
      },
      canSellOne() {
        return player.m.buyables[12].gte(Decimal.dOne)
      },
      sellAll() {
        player.m.buyables[12] = Decimal.dZero
      },
      canSellAll() {
        return player.m.buyables[12].gt(Decimal.dZero)
      }
    }
  },
  clickables: {
    11: {
      title: "Collect some bees!",
      display() {
        return `You gotta get some bees if you wanna sell some honey... Currently you get 1 bees and cooldown is ${format(tmp.m.beeCooldown)} second (currently ${format(player.m.beeCooldown)} secs left).`
      },
      canClick() {
        return player.m.beeCooldown.eq(0)
      },
      onClick() {
        player.m.bees = player.m.bees.plus(1)
        // from 0
        if (player.m.bees.eq(1)) {
          player.m.beeStart = Date.now()
        }
        player.m.beeCooldown = tmp.m.beeCooldown
      },
      unlocked() {
        return hasUpgrade("m", 12)
      }
    },
    12: {
      title: "Get the honey!",
      display() {
        return `You can get ${format(player.m.notpicked)} teaspoons of honey if you collect it now!`
      },
      canClick() {
        return player.m.notpicked.gt(0)
      },
      onClick() {
        player.m.honey = player.m.honey.plus(player.m.notpicked)
        player.m.totalSold = player.m.totalSold.plus(player.m.notpicked)
        player.m.notpicked = Decimal.dZero
      },
      unlocked() {
        return hasUpgrade("m", 13)
      }
    },
    13: {
      title: "Sell the honey!",
      display() {
        return `You can get $${format(tmp.m.value.mul(player.m.honey))} if you sell it now! ($${format(tmp.m.value)} per 1 teaspoon)`
      },
      canClick() {
        return player.m.honey.gte(1)
      },
      onClick() {
        const sell = player.m.honey.floor()
        player.r.money = player.r.money.plus(sell.mul(tmp.m.value))
        player.m.honey = player.m.honey.sub(sell)
      },
      unlocked() {
        return hasUpgrade("m", 13)
      }
    }
  },
  upgrades: {
    11: {
      title: "Start",
      description: "Create a business. You don't know what you will be doing though... Also generates procrasination.",
      cost: new Decimal(100),
      currencyDisplayName: "$",
      currencyInternalName: "money",
      currencyLayer: "r"
    },
    12: {
      title: "Do something!",
      description() {
        return hasUpgrade("m", 12) ? "Maybe I should start selling honey?" : "Hmm... what should I do?"
      },
      cost: Decimal.dTen,
      currencyDisplayName: "procrasination",
      currencyInternalName: "proc",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 11)
      }
    },
    13: {
      title: "Read up on bee books",
      description: "Bees need nectar to make some honey, so I guess buying flowers wouldn't be a bad idea...? Keep the bees because obviously what is the point of killing them.",
      canAfford() {
        return player.m.bees.gte(Decimal.dTwo)
      },
      cost: Decimal.dTwo,
      pay() {
        // do nothing
        // okay maybe for those people who use devSpeed maybe they should get trolled :cart_troll: :troll:
        player.devSpeed = 1
      },
      currencyDisplayName: "bees",
      currencyInternalName: "bees",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 12)
      }
    },
    14: {
      title: "More active bee trapping",
      description: "Stop being lazy! Bee trapping time is /7.",
      cost: new Decimal(100),
      currencyDisplayName: "procrasination",
      currencyInternalName: "proc",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 13)
      }
    },
    15: {
      title: "Slightly less lazier than you are",
      description: "Unlocks the Auto Bee Trapper 1200 (trimps reference). Traps 7 Bees a second.",
      cost: new Decimal(100),
      currencyDisplayName: "procrasination",
      currencyInternalName: "proc",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 13)
      }
    },
    16: {
      title: "The Law Of Attraction",
      description: "The amount of bees you have multiplies trapper effectiveness.",
      effect() {
        return player.m.bees.max(1).log10().add(Decimal.dOne)
      },
      effectDisplay() {
        return format(tmp.m.upgrades[16].effect) + "x"
      },
      cost: new Decimal(40),
      pay() {
        // do nothing
        // okay maybe for those people who use devSpeed maybe they should get trolled :cart_troll: :troll:
        player.devSpeed = 1
      },
      currencyDisplayName: "bees",
      currencyInternalName: "bees",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 15)
      }
    },
    21: {
      title: "Beeeeeeeeee reproduction",
      description: "Bees now reproduce.",
      cost: new Decimal(100),
      pay() {
        // do nothing
        // okay maybe for those people who use devSpeed maybe they should get trolled :cart_troll: :troll:
        player.devSpeed = 1
      },
      currencyDisplayName: "bees",
      currencyInternalName: "bees",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 15)
      }
    },
    22: {
      title: "Something new, again",
      description: "Unlocks <i>employees</i>.",
      cost: new Decimal(128),
      currencyDisplayName: "honey",
      currencyInternalName: "honey",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 16)
      }
    },
    /*14: {
      title: "Reproducing",
      description: "This isn't really profitable... let's let the bees reproduce themselves!",
      canAfford() {
        return player.m.totalSold.gte(5)
      },
      cost: 5,
      pay() {
        // do nothing
        // okay maybe for those people who use devSpeed maybe they should get trolled :cart_troll: :troll:
        player.devSpeed = 1
      },
      currencyDisplayName: "teaspoons of honey sold",
      currencyInternalName: "totalSold",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 13)
      }
    },
    15: {
      title: "Packaging",
      description: "Sell honey as packages instead of selling them in teaspoons. This multiplies the selling requirement by 64, but doubles the sell value.",
      canAfford() {
        return player.m.bees.gte(2500)
      },
      cost: new Decimal(2500),
      pay() {
        // do nothing
        // okay maybe for those people who use devSpeed maybe they should get trolled :cart_troll: :troll:
        player.devSpeed = 1
      },
      currencyDisplayName: "bees",
      currencyInternalName: "bees",
      currencyLayer: "m",
      unlocked() {
        return hasUpgrade("m", 14)
      }
    },*/

  },
  tabFormat: {
    "Main": {
      content: [
        ["display-text", () => `You have $${format(player.r.money)} (+${format(tmp.r.moneyGain)}/s) (from reputation layer in u2).`],
        ["display-text", () => hasUpgrade("m", 11) ? `You have ${format(player.m.proc)} (+${format(tmp.m.procGain)}/s) procrasination.` : ""],
        "upgrades"
      ]
    },
    "Bees": {
      content: [
        ["display-text", () => `You have $${format(player.r.money)} (+${format(tmp.r.moneyGain)}/s) (from reputation layer in u2).`],
        ["display-text", () => hasUpgrade("m", 13) ? `You have ${format(player.m.notpicked)} (+${format(tmp.m.honeyGain)}) teaspoons of honey to get!` : ""],
        ["display-text", () => hasUpgrade("m", 13) ? `Time elapsed: ${format(player.m.prog.mul(tmp.m.timeToFinish))}/${format(tmp.m.timeToFinish)} seconds` : ''],
        ["display-text", () => hasUpgrade("m", 13) ? `You have ${formatWhole(player.m.bees)} ${tmp.m.beeGain.neq(0) ? `(+${formatWhole(tmp.m.beeGain)}/sec)` : ''} bees.` : ''],
        ["display-text", () => hasUpgrade("m", 21) ? `Your bees have produced ${formatWhole(player.m.reproduction)} (+${formatWhole(tmp.m.beeReproduction)}/sec) new bees.` : ""],
        ["display-text", () => player.m.bees.gt(player.m.buyables[11]) && hasUpgrade("m", 13) ? "You have more bees than flowers, so your bees are dying of starvation, and work at 50% efficency." : "", {
          color: "red"
        }],
        ["display-text", () => hasUpgrade("m", 13) ? `You have ${format(player.m.honey)} ${tmp.m.realHoneyGain.neq(0) ? `(+${formatWhole(tmp.m.realHoneyGain)}/sec)` : ''} teaspoons of honey.` : ""],
        ["row", [
          ["clickable", 11],
          ["buyable", 11]
        ]],
        ["row", [
          ["clickable", 12],
          ["clickable", 13]
        ]]
      ],
      unlocked() {
        return hasUpgrade("m", 12)
      }
    },
    "Employees": {
      content: [
        ["buyable", 12]
      ]
    },
    "Info": {
      content: [
        ["display-text",
          `All bees die after 6 seconds (ticking from the first bee bought from 0 bees) and produce 1/72 honey every second. If you do not have enough flowers for your bees they will start dying and work at 50% efficency.`
        ]
      ],
      unlocked() {
        return hasUpgrade("m", 12)
      }
    },
    "Skills": {
      content: [
        ["raw-html", `
      <div>
        nothing for now
      </div>
      `]
      ],
      unlocked() {
        return false
      }
    }
  }
})

/* TODO LIST: 
- Make a buyable bc i still suck at coding
-- More upgrades
--- More content 
*/
// yay  we  have  a new layer
addLayer("he", { // literal trolling time
  name: "Helium", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "He", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  row: 1,
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
    }
  },
  layerShown() {
    return hasMilestone("d",7) && player.u.universe === 1
  },
  color: "#cfecf0",
  branches: ["d", "p"],
  requires: new Decimal(1000), // Can be a function that takes requirement increases into account
  resource: "Helium", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.9, // Prestige currency exponent
  gainMult() {
    return new Decimal(1) // Calculate the multiplier for main currency from bonuses
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
  },

  passiveGeneration() {
    let g = 0
    if (hasUpgrade("he", 11)) g += 0.111
    if (hasUpgrade("he", 13)) g += 0.111
    if (hasUpgrade("he", 17)) g += 0.222
    if (hasUpgrade("he", 25)) g += 0.222
    return g
  },

  upgrades: {
    11: {
      title: "Alpha Radiation",
      description: "+11.1% Helium / sec",
      cost: new Decimal(2)
    },
    12: {
      title: "Helium Denser",
      description: "Increase point gain by 2.1x",
      cost: new Decimal(25)
    },
    13: {
      title: "Beta Radiation",
      description: "+11.1% Helium / sec",

      cost: new Decimal(150)
    },
    14: {
      title: "Radioactive Decayer MK.I",
      description: "2.25x to point gain",
      cost: new Decimal(250)
    },
    15: {
      title: "Radioactive Decayer MK.II",
      description: "2.33x to point gain",
      cost: new Decimal(750)
    },
    16: {
      title: "Radioactive Decayer MK.III",
      description: "2.45x to point gain",
      cost: new Decimal(2100)
    },
    21: {
      title: "Gamma Radiation",
      description: "+22.2% Helium / sec",
      cost: new Decimal(3000)
    },
    22: {
      title: "Radioactive Decayer MK.IV",
      description: "2.66x to point gain",
      cost: new Decimal(6000)
    },
    23: {
      title: "Radioactive Decayer MK.V",
      description: "2.85x to point gain",
      cost: new Decimal(11000)
    },
    24: {
      title: "Radioactive Decayer MK.VI",
      description: "3.03x to point gain",
      cost: new Decimal(21000)
    },
    25: {
      title: "Delta Radiation",
      description: "+22.2% Helium / sec",
      cost: new Decimal(30000)
    },
  },
  hotkeys: [],
})
addLayer("u", {
  universe: 0,
  name: "Universe",
  symbol: "U",
  row: "side",
  color: "#7777FF",
  type: "none",
  position: 0, // this is position, not row
  layerShown() {
		if(hasMilestone("d",0))return true
    if (player.u.universe === 2) return hasUpgrade("r", 13)
    return hasUpgrade("p", 22)
  },
  startData() {
    return {
      uniSelected: 1,
      universe: 1
    }
  },
  tooltip() {
    return "Universe " + player.u.universe
  },
  clickables: {
    11: {
      title: "Change the universe selector here!",
      display() {
        return "Max universe: " + tmp.u.maxUniverse
      },
      onClick() {
        player.u.uniSelected = player.u.uniSelected % tmp.u.maxUniverse + 1
      },
      canClick: true
    },
    12: {
      title: "You gotta be kidding me huh...",
      display() {
        return `Dive into universe <b class="uni">${player.u.uniSelected}</b> which contains different mechanics, and a <b>[REDACTED]</b>. (change the universe using the selector)`
      },
      onClick() {
        player.u.universe = player.u.uniSelected
      },
      canClick: true
    }
  },
  maxUniverse() {
    let maxUniverse = 1
    if (hasUpgrade("p", 26)) maxUniverse++
		if(hasMilestone("d",0)) maxUniverse=2
    return maxUniverse
  },
  tabFormat: [
    ["display-html",
      () => `You are currently in universe <b class="uni">${player.u.universe}</b>`],
    ["row",
      [
        ["clickable", 12],
        "blank",
        "blank",
        ["clickable", 11]
      ]
    ]
  ]
})
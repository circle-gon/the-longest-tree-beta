var layoutInfo = {
  startTab: "none",
  startNavTab: "tree-tab",
	showTree: true,
  treeLayout: null 
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
  layerShown: "ghost",
})


addLayer("tree-tab", {
  tabFormat: [["tree", () => layoutInfo.treeLayout ?? TREE_LAYERS]],
  previousTab: "",
  leftTab: true,
})
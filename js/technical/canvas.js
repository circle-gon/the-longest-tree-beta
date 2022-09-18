let canvas, ctx, colors_theme;

window.addEventListener("resize", resizeCanvas);

function retrieveCanvasData() {
	const treeCanv = document.getElementById("treeCanvas");
	const treeTab = document.getElementById("treeTab");
	if (!treeCanv) return false;
	canvas = treeCanv;
	ctx = canvas.getContext("2d");
	return true;
}

function resizeCanvas() {
	if (!retrieveCanvasData()) return
	canvas.width = 0;
  canvas.height = 0;
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	drawTree();
}

function drawTree() {
	if (!retrieveCanvasData()) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const layer in layers){
		if (!tmp[layer].layerShown && !tmp[layer].branches) continue;
		for (const branch in tmp[layer].branches) {
		  drawTreeBranch(layer, tmp[layer].branches[branch]);
		}
		drawComponentBranches(layer, tmp[layer].upgrades, "upgrade-");
		drawComponentBranches(layer, tmp[layer].buyables, "buyable-");
		drawComponentBranches(layer, tmp[layer].clickables, "clickable-");
	}
}

function drawComponentBranches(layer, data, prefix) {
	for (const id in data) {
		if (!data[id].branches) continue;
		for (const branch in data[id].branches) {
			drawTreeBranch(id, data[id].branches[branch], prefix + layer + "-");
		}
	}
}

function drawTreeBranch(num1, data, prefix) { // taken from Antimatter Dimensions & adjusted slightly
  let num2 = data, color_id = 1, width = 15;
	if (Array.isArray(data)){
		num2 = data[0];
		color_id = data[1];
		width = data[2] || width;
	}

	if (typeof color_id === "number") color_id = colors_theme[color_id]
	if (prefix) {
	  num1 = prefix + num1;
		num2 = prefix + num2;
	}
	if (!document.getElementById(num1) || !document.getElementById(num2)) return;

	const start = document.getElementById(num1).getBoundingClientRect();
  const end = document.getElementById(num2).getBoundingClientRect();
  const x1 = start.left + (start.width / 2) + document.body.scrollLeft;
  const y1 = start.top + (start.height / 2) + document.body.scrollTop;
  const x2 = end.left + (end.width / 2) + document.body.scrollLeft;
  const y2 = end.top + (end.height / 2) + document.body.scrollTop;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.strokeStyle = color_id;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

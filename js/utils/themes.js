// ************ Themes ************
const themes = [
  "default", 
  "aqua", 
  "compact2"
]; // this is going to be fun

const colors = {
	default: {
		1: "#ffffff", // Branch color 1
		2: "#bfbfbf", // Branch color 2
		3: "#7f7f7f", // Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
  compact2: {
		1: "#f5bfff",
		2: "#9d8fbf",
		3: "#7f5f79",
		color: "#af77c9",
		points: "#f4f0ff",
		locked: "#ff94a0",
		background: "#7134eb", // purpl
		background_tooltip: "rgba(30, 30, 130, 0.75)",
	},
}

function changeTheme() {
	colors_theme = colors[options.theme];
	document.body.style.setProperty("--background", colors_theme.background);
	document.body.style.setProperty("--background_tooltip", colors_theme["background_tooltip"]);
	document.body.style.setProperty("--color", colors_theme.color);
	document.body.style.setProperty("--points", colors_theme.points);
	document.body.style.setProperty("--locked", colors_theme.locked);
}
function getThemeName() {
	return options.theme ?? "default";
}

function switchTheme() {
	const index = themes.indexOf(options.theme);
	if (index >= themes.length - 1) options.theme = themes[0];
	else options.theme = themes[index + 1];
	changeTheme();
	resizeCanvas();
}

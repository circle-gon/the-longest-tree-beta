// Load files

for (const file of modInfo.modFiles) {
  const script = document.createElement("script");
  script.setAttribute("src", `js/${file}`);
  document.head.append(script);
}


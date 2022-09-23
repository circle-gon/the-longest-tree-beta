const modInfo={name:"The Biggest Tree",id:"BigTreeID123",author:"A Group Of People",pointsName:"points",modFiles:["tree.js","layers/universeMachine.js","layers/uni1.js","layers/uni2.js"],discordName:"The Longest Tree",discordLink:"https://discord.gg/EyyjFVVwTS",initialStartPoints:Decimal.dTen,offlineLimit:1},VERSION={num:"0.0.2 Beta",name:"The Longest Difficulty"},changelog="<h1>Changelog:</h1><br>\n<h3>v0.0.2</h3><br>\n\t\t- Added the Bees minigame.<br>\n\t\t- Added helium.<br>\n\t\t- Implemented the rest of the Difficulty upgrades.<br>\n\t\t- Added a few more milestones, prestige upgrades, and reputation upgrades.<br>\n\t<h3>v0.0.1</h3><br>\n\t\t- Added universes, U1, U2, Prestige, Reputation, and Difficulty.<br>\n\t\t- Added upgrades and the Universe Transportation Machine.<br>\n\t\t- Added the Garbage collector and incinerator.",winText="Congratulations! You have reached the end and beaten this game, for now...",doNotCallTheseFunctionsEveryTick=[];function getStartPoints(){return modInfo.initialStartPoints}function canGenPoints(){return!0}function getPointGen(){if(!canGenPoints())return Decimal.dZero;let e=Decimal.dOne;return hasUpgrade("r",12)&&(e=e.add(upgradeEffect("r",12))),hasUpgrade("p",15)&&(e=e.mul(clickableEffect("p",11))),hasUpgrade("d",25)||(hasUpgrade("p",11)&&(e=e.times(Decimal.dTwo)),hasUpgrade("p",12)&&(e=e.times(Decimal.dTwo))),hasUpgrade("p",13)&&(e=e.times(upgradeEffect("p",13))),hasUpgrade("p",14)&&(e=e.times(upgradeEffect("p",14))),hasUpgrade("p",32)&&(e=e.mul(clickableEffect("p",11))),hasUpgrade("r",31)&&(e=e.mul(2)),e=e.pow(upgradeEffect("d",11)),player.d.unlocked&&(e=e.pow(tmp.d.effect)),hasUpgrade("d",22)&&(e=e.mul(2.2)),hasUpgrade("d",33)&&(e=e.mul(3.3)),hasUpgrade("d",44)&&(e=e.mul(4.4)),hasUpgrade("he",12)&&(e=e.mul(2.2)),hasUpgrade("he",14)&&(e=e.mul(2.25)),hasUpgrade("he",15)&&(e=e.mul(2.33)),hasUpgrade("he",16)&&(e=e.mul(2.45)),hasUpgrade("he",22)&&(e=e.mul(2.66)),hasUpgrade("he",23)&&(e=e.mul(2.85)),hasUpgrade("he",24)&&(e=e.mul(3.03)),hasUpgrade("d",45)&&(e=e.pow(1.2)),e}function addedPlayerData(){return{}}const displayThings=[()=>0===player.u.universe?"<br>Start a universe challenge!":""];function isEndgame(){return hasUpgrade("r",36)}const backgroundStyle={};function maxTickLength(){return 3600}function fixOldSave(e){}

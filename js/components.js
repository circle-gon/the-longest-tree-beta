let app;function loadVue(){Vue.component("display-text",{props:["layer","data"],template:'<span class="instant" v-html="data"></span>'}),Vue.component("raw-html",{props:["layer","data"],template:'<span class="instant"  v-html="data"></span>'}),Vue.component("blank",{props:["layer","data"],computed:{style(){const t=Array.isArray(this.data);return{height:t?this.data[1]:this.data??"8px",width:t?this.data[0]:"17px"}}},template:'div class="instant" :style="style"></div>'}),Vue.component("display-image",{props:["layer","data"],template:'<img class="instant" v-bind:src= "data" v-bind:alt= "data">\n\t'}),Vue.component("row",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'\n\t\t<div class="upgTable instant">\n\t\t\t<div class="upgRow">\n\t\t\t\t<div v-for="(item, index) in data">\n\t\t\t\t<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + \'-\' + index"></div>\n\t\t\t\t<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + \'-\' + index"></div>\n\t\t\t\t<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + \'-\' + index"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t'}),Vue.component("column",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'\n\t\t<div class="upgTable instant">\n\t\t\t<div class="upgCol">\n\t\t\t\t<div v-for="(item, index) in data">\n\t\t\t\t\t<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + \'-\' + index"></div>\n\t\t\t\t\t<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + \'-\' + index"></div>\n\t\t\t\t\t<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + \'-\' + index"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t'}),Vue.component("layer-proxy",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'\n\t\t<div>\n\t\t\t<column :layer="data[0]" :data="data[1]" :key="key + \'col\'"></column>\n\t\t</div>\n\t\t'}),Vue.component("infobox",{props:["layer","data"],template:'\n\t\t<div class="story instant" v-if="tmp[layer].infoboxes && tmp[layer].infoboxes[data]!== undefined && tmp[layer].infoboxes[data].unlocked" v-bind:style="[{\'border-color\': tmp[layer].color, \'border-radius\': player.infoboxes[layer][data] ? 0 : \'8px\'}, tmp[layer].infoboxes[data].style]">\n\t\t\t<button class="story-title" v-bind:style="[{\'background-color\': tmp[layer].color}, tmp[layer].infoboxes[data].titleStyle]"\n\t\t\t\tv-on:click="player.infoboxes[layer][data] = !player.infoboxes[layer][data]">\n\t\t\t\t<span class="story-toggle">{{player.infoboxes[layer][data] ? "+" : "-"}}</span>\n\t\t\t\t<span v-html="tmp[layer].infoboxes[data].title ? tmp[layer].infoboxes[data].title : (tmp[layer].name)"></span>\n\t\t\t</button>\n\t\t\t<div v-if="!player.infoboxes[layer][data]" class="story-text" v-bind:style="tmp[layer].infoboxes[data].bodyStyle">\n\t\t\t\t<span v-html="tmp[layer].infoboxes[data].body ? tmp[layer].infoboxes[data].body : \'Blah\'"></span>\n\t\t\t</div>\n\t\t</div>\n\t\t'}),Vue.component("h-line",{props:["layer","data"],template:'\n\t\t\t\t<hr class="instant" v-bind:style="data ? {\'width\': data} : {}" class="hl">\n\t\t\t'}),Vue.component("v-line",{props:["layer","data"],template:'\n\t\t\t<div class="instant" v-bind:style="data ? {\'height\': data} : {}" class="vl2"></div>\n\t\t'}),Vue.component("challenges",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].challenges" class="upgTable">\n\t\t<div v-for="row in (data === undefined ? tmp[layer].challenges.rows : data)" class="upgRow">\n\t\t<div v-for="col in tmp[layer].challenges.cols">\n\t\t\t\t\t<challenge v-if="tmp[layer].challenges[row*10+col]!== undefined && tmp[layer].challenges[row*10+col].unlocked" :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.challenge"></challenge>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t'}),Vue.component("challenge",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].challenges && tmp[layer].challenges[data]!== undefined && tmp[layer].challenges[data].unlocked && !(options.hideChallenges && maxedChallenge(layer, [data]) && !inChallenge(layer, [data]))"\n\t\t\tv-bind:class="[\'challenge\', challengeStyle(layer, data), player[layer].activeChallenge === data ? \'resetNotify\' : \'\']" v-bind:style="tmp[layer].challenges[data].style">\n\t\t\t<br><h3 v-html="tmp[layer].challenges[data].name"></h3><br><br>\n\t\t\t<button v-bind:class="{ longUpg: true, can: true, [layer]: true }" v-bind:style="{\'background-color\': tmp[layer].color}" v-on:click="startChallenge(layer, data)">{{challengeButtonText(layer, data)}}</button><br><br>\n\t\t\t<span v-if="layers[layer].challenges[data].fullDisplay" v-html="run(layers[layer].challenges[data].fullDisplay, layers[layer].challenges[data])"></span>\n\t\t\t<span v-else>\n\t\t\t\t<span v-html="tmp[layer].challenges[data].challengeDescription"></span><br>\n\t\t\t\tGoal:  <span v-if="tmp[layer].challenges[data].goalDescription" v-html="tmp[layer].challenges[data].goalDescription"></span><span v-else>{{format(tmp[layer].challenges[data].goal)}} {{tmp[layer].challenges[data].currencyDisplayName ? tmp[layer].challenges[data].currencyDisplayName : modInfo.pointsName}}</span><br>\n\t\t\t\tReward: <span v-html="tmp[layer].challenges[data].rewardDescription"></span><br>\n\t\t\t\t<span v-if="layers[layer].challenges[data].rewardDisplay!==undefined">Currently: <span v-html="(tmp[layer].challenges[data].rewardDisplay) ? (run(layers[layer].challenges[data].rewardDisplay, layers[layer].challenges[data])) : format(tmp[layer].challenges[data].rewardEffect)"></span></span>\n\t\t\t</span>\n\t\t\t<node-mark :layer=\'layer\' :data=\'tmp[layer].challenges[data].marked\' :offset="20" :scale="1.5"></node-mark></span>\n\n\t\t</div>\n\t\t'}),Vue.component("upgrades",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].upgrades" class="upgTable">\n\t\t\t<div v-for="row in (data === undefined ? tmp[layer].upgrades.rows : data)" class="upgRow">\n\t\t\t\t<div v-for="col in tmp[layer].upgrades.cols"><div v-if="tmp[layer].upgrades[row*10+col]!== undefined && tmp[layer].upgrades[row*10+col].unlocked" class="upgAlign">\n\t\t\t\t\t<upgrade :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.upgrade"></upgrade>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t\t<br>\n\t\t</div>\n\t\t'}),Vue.component("upgrade",{props:["layer","data"],template:'\n\t\t<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id=\'"upgrade-" + layer + "-" + data\' v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, tooltipBox: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"\n\t\t\tv-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {\'background-color\': tmp[layer].color} : {}), tmp[layer].upgrades[data].style]">\n\t\t\t<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>\n\t\t\t<span v-else>\n\t\t\t\t<span v-if= "tmp[layer].upgrades[data].title"><h3 v-html="tmp[layer].upgrades[data].title"></h3><br></span>\n\t\t\t\t<span v-html="tmp[layer].upgrades[data].description"></span>\n\t\t\t\t<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>\n\t\t\t\t<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}\n\t\t\t</span>\n\t\t\t<tooltip v-if="tmp[layer].upgrades[data].tooltip" :text="tmp[layer].upgrades[data].tooltip"></tooltip>\n\n\t\t\t</button>\n\t\t'}),Vue.component("milestones",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].milestones">\n\t\t\t<table>\n\t\t\t\t<tr v-for="id in (data === undefined ? Object.keys(tmp[layer].milestones) : data)" v-if="tmp[layer].milestones[id]!== undefined && tmp[layer].milestones[id].unlocked && milestoneShown(layer, id)">\n\t\t\t\t\t<milestone :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles.milestone"></milestone>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t\t<br>\n\t\t</div>\n\t\t'}),Vue.component("milestone",{props:["layer","data"],template:'\n\t\t<td v-if="tmp[layer].milestones && tmp[layer].milestones[data]!== undefined && milestoneShown(layer, data) && tmp[layer].milestones[data].unlocked" v-bind:style="[tmp[layer].milestones[data].style]" v-bind:class="{milestone: !hasMilestone(layer, data), tooltipBox: true, milestoneDone: hasMilestone(layer, data)}">\n\t\t\t<h3 v-html="tmp[layer].milestones[data].requirementDescription"></h3><br>\n\t\t\t<span v-html="run(layers[layer].milestones[data].effectDescription, layers[layer].milestones[data])"></span><br>\n\t\t\t<tooltip v-if="tmp[layer].milestones[data].tooltip" :text="tmp[layer].milestones[data].tooltip"></tooltip>\n\n\t\t<span v-if="(tmp[layer].milestones[data].toggles)&&(hasMilestone(layer, data))" v-for="toggle in tmp[layer].milestones[data].toggles"><toggle :layer= "layer" :data= "toggle" v-bind:style="tmp[layer].componentStyles.toggle"></toggle>&nbsp;</span></td></tr>\n\t\t'}),Vue.component("toggle",{props:["layer","data"],template:'\n\t\t<button class="smallUpg can" v-bind:style="{\'background-color\': tmp[data[0]].color}" v-on:click="toggleAuto(data)">{{player[data[0]][data[1]]?"ON":"OFF"}}</button>\n\t\t'}),Vue.component("prestige-button",{props:["layer","data"],template:'\n\t\t<button v-if="(tmp[layer].type !== \'none\')" v-bind:class="{ [layer]: true, reset: true, locked: !tmp[layer].canReset, can: tmp[layer].canReset}"\n\t\t\tv-bind:style="[tmp[layer].canReset ? {\'background-color\': tmp[layer].color} : {}, tmp[layer].componentStyles[\'prestige-button\']]"\n\t\t\tv-html="prestigeButtonText(layer)" v-on:click="doReset(layer)">\n\t\t</button>\n\t\t'}),Vue.component("main-display",{props:["layer","data"],template:"\n\t\t<div><span v-if=\"player[layer].points.lt('1e1000')\">You have </span><h2 v-bind:style=\"{'color': tmp[layer].color, 'text-shadow': '0px 0px 10px ' + tmp[layer].color}\">{{data ? format(player[layer].points, data) : formatWhole(player[layer].points)}}</h2> {{tmp[layer].resource}}<span v-if=\"layers[layer].effectDescription\">, <span v-html=\"run(layers[layer].effectDescription, layers[layer])\"></span></span><br><br></div>\n\t\t"}),Vue.component("resource-display",{props:["layer"],template:'\n\t\t<div style="margin-top: -13px">\n\t\t\t<span v-if="tmp[layer].baseAmount"><br>You have {{formatWhole(tmp[layer].baseAmount)}} {{tmp[layer].baseResource}}</span>\n\t\t\t<span v-if="tmp[layer].passiveGeneration"><br>You are gaining {{format(tmp[layer].resetGain.times(tmp[layer].passiveGeneration))}} {{tmp[layer].resource}} per second</span>\n\t\t\t<br><br>\n\t\t\t<span v-if="tmp[layer].showBest">Your best {{tmp[layer].resource}} is {{formatWhole(player[layer].best)}}<br></span>\n\t\t\t<span v-if="tmp[layer].showTotal">You have made a total of {{formatWhole(player[layer].total)}} {{tmp[layer].resource}}<br></span>\n\t\t</div>\n\t\t'}),Vue.component("buyables",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].buyables" class="upgTable">\n\t\t\t<respec-button v-if="tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)" :layer = "layer" v-bind:style="[{\'margin-bottom\': \'12px\'}, tmp[layer].componentStyles[\'respec-button\']]"></respec-button>\n\t\t\t<div v-for="row in (data === undefined ? tmp[layer].buyables.rows : data)" class="upgRow">\n\t\t\t\t<div v-for="col in tmp[layer].buyables.cols"><div v-if="tmp[layer].buyables[row*10+col]!== undefined && tmp[layer].buyables[row*10+col].unlocked" class="upgAlign" v-bind:style="{\'margin-left\': \'7px\', \'margin-right\': \'7px\',  \'height\': (data ? data : \'inherit\'),}">\n\t\t\t\t\t<buyable :layer = "layer" :data = "row*10+col"></buyable>\n\t\t\t\t</div></div>\n\t\t\t\t<br>\n\t\t\t</div>\n\t\t</div>\n\t'}),Vue.component("buyable",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">\n\t\t\t<button v-bind:class="{ buyable: true, tooltipBox: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"\n\t\t\tv-bind:style="[tmp[layer].buyables[data].canBuy ? {\'background-color\': tmp[layer].color} : {}, tmp[layer].componentStyles.buyable, tmp[layer].buyables[data].style]"\n\t\t\tv-on:click="if(!interval) buyBuyable(layer, data)" :id=\'"buyable-" + layer + "-" + data\' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">\n\t\t\t\t<span v-if= "tmp[layer].buyables[data].title"><h2 v-html="tmp[layer].buyables[data].title"></h2><br></span>\n\t\t\t\t<span v-bind:style="{\'white-space\': \'pre-line\'}" v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>\n\t\t\t\t<node-mark :layer=\'layer\' :data=\'tmp[layer].buyables[data].marked\'></node-mark>\n\t\t\t\t<tooltip v-if="tmp[layer].buyables[data].tooltip" :text="tmp[layer].buyables[data].tooltip"></tooltip>\n\n\t\t\t</button>\n\t\t\t<br v-if="(tmp[layer].buyables[data].sellOne !== undefined && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)) || (tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false))">\n\t\t\t<sell-one :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles[\'sell-one\']" v-if="(tmp[layer].buyables[data].sellOne)&& !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)"></sell-one>\n\t\t\t<sell-all :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles[\'sell-all\']" v-if="(tmp[layer].buyables[data].sellAll)&& !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)"></sell-all>\n\t\t</div>\n\t\t',data:()=>({interval:!1,time:0}),methods:{start(){this.interval||(this.interval=setInterval(function(){this.time>=5&&buyBuyable(this.layer,this.data),this.time=this.time+1}.bind(this),50))},stop(){clearInterval(this.interval),this.interval=!1,this.time=0}}}),Vue.component("respec-button",{props:["layer","data"],template:'\n\t\t\t<div v-if="tmp[layer].buyables && tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)">\n\t\t\t\t<div class="tooltipBox respecCheckbox"><input type="checkbox" v-model="player[layer].noRespecConfirm" ><tooltip v-bind:text="\'Disable respec confirmation\'"></tooltip></div>\n\t\t\t\t<button v-on:click="respecBuyables(layer)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }" style="margin-right: 18px">{{tmp[layer].buyables.respecText ? tmp[layer].buyables.respecText : "Respec"}}</button>\n\t\t\t</div>\n\t\t\t'}),Vue.component("clickables",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].clickables" class="upgTable">\n\t\t\t<master-button v-if="tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)" :layer = "layer" v-bind:style="[{\'margin-bottom\': \'12px\'}, tmp[layer].componentStyles[\'master-button\']]"></master-button>\n\t\t\t<div v-for="row in (data === undefined ? tmp[layer].clickables.rows : data)" class="upgRow">\n\t\t\t\t<div v-for="col in tmp[layer].clickables.cols"><div v-if="tmp[layer].clickables[row*10+col]!== undefined && tmp[layer].clickables[row*10+col].unlocked" class="upgAlign" v-bind:style="{\'margin-left\': \'7px\', \'margin-right\': \'7px\',  \'height\': (data ? data : \'inherit\'),}">\n\t\t\t\t\t<clickable :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.clickable"></clickable>\n\t\t\t\t</div></div>\n\t\t\t\t<br>\n\t\t\t</div>\n\t\t</div>\n\t'}),Vue.component("clickable",{props:["layer","data"],template:'\n\t\t<button \n\t\t\tv-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked" \n\t\t\tv-bind:class="{ upg: true, tooltipBox: true, can: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"\n\t\t\tv-bind:style="[tmp[layer].clickables[data].canClick ? {\'background-color\': tmp[layer].color} : {}, tmp[layer].clickables[data].style]"\n\t\t\tv-on:click="if(!interval) clickClickable(layer, data)" :id=\'"clickable-" + layer + "-" + data\' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">\n\t\t\t<span v-if= "tmp[layer].clickables[data].title"><h2 v-html="tmp[layer].clickables[data].title"></h2><br></span>\n\t\t\t<span v-bind:style="{\'white-space\': \'pre-line\'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>\n\t\t\t<node-mark :layer=\'layer\' :data=\'tmp[layer].clickables[data].marked\'></node-mark>\n\t\t\t<tooltip v-if="tmp[layer].clickables[data].tooltip" :text="tmp[layer].clickables[data].tooltip"></tooltip>\n\n\t\t</button>\n\t\t',data:()=>({interval:!1,time:0}),methods:{start(){!this.interval&&layers[this.layer].clickables[this.data].onHold&&(this.interval=setInterval(function(){let t=layers[this.layer].clickables[this.data];this.time>=5&&run(t.canClick,t)&&run(t.onHold,t),this.time=this.time+1}.bind(this),50))},stop(){clearInterval(this.interval),this.interval=!1,this.time=0}}}),Vue.component("master-button",{props:["layer","data"],template:'\n\t\t<button v-if="tmp[layer].clickables && tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)"\n\t\t\tv-on:click="run(tmp[layer].clickables.masterButtonPress, tmp[layer].clickables)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].clickables.masterButtonText ? tmp[layer].clickables.masterButtonText : "Click me!"}}</button>\n\t'}),Vue.component("grid",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].grid" class="upgTable">\n\t\t\t<div v-for="row in (data === undefined ? tmp[layer].grid.rows : data)" class="upgRow">\n\t\t\t\t<div v-for="col in tmp[layer].grid.cols"><div v-if="run(layers[layer].grid.getUnlocked, layers[layer].grid, row*100+col)"\n\t\t\t\t\tclass="upgAlign" v-bind:style="{\'margin\': \'1px\',  \'height\': \'inherit\',}">\n\t\t\t\t\t<gridable :layer = "layer" :data = "row*100+col" v-bind:style="tmp[layer].componentStyles.gridable"></gridable>\n\t\t\t\t</div></div>\n\t\t\t\t<br>\n\t\t\t</div>\n\t\t</div>\n\t'}),Vue.component("gridable",{props:["layer","data"],template:'\n\t\t<button \n\t\tv-if="tmp[layer].grid && player[layer].grid[data]!== undefined && run(layers[layer].grid.getUnlocked, layers[layer].grid, data)" \n\t\tv-bind:class="{ tile: true, can: canClick, locked: !canClick, tooltipBox: true,}"\n\t\tv-bind:style="[canClick ? {\'background-color\': tmp[layer].color} : {}, gridRun(layer, \'getStyle\', player[this.layer].grid[this.data], this.data)]"\n\t\tv-on:click="clickGrid(layer, data)"  @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">\n\t\t\t<span v-if= "layers[layer].grid.getTitle"><h3 v-html="gridRun(this.layer, \'getTitle\', player[this.layer].grid[this.data], this.data)"></h3><br></span>\n\t\t\t<span v-bind:style="{\'white-space\': \'pre-line\'}" v-html="gridRun(this.layer, \'getDisplay\', player[this.layer].grid[this.data], this.data)"></span>\n\t\t\t<tooltip v-if="layers[layer].grid.getTooltip" :text="gridRun(this.layer, \'getTooltip\', player[this.layer].grid[this.data], this.data)"></tooltip>\n\n\t\t</button>\n\t\t',data:()=>({interval:!1,time:0}),computed:{canClick(){return gridRun(this.layer,"getCanClick",player[this.layer].grid[this.data],this.data)}},methods:{start(){!this.interval&&layers[this.layer].grid.onHold&&(this.interval=setInterval(function(){this.time>=5&&gridRun(this.layer,"getCanClick",player[this.layer].grid[this.data],this.data)&&gridRun(this.layer,"onHold",player[this.layer].grid[this.data],this.data),this.time=this.time+1}.bind(this),50))},stop(){clearInterval(this.interval),this.interval=!1,this.time=0}}}),Vue.component("microtabs",{props:["layer","data"],computed:{currentTab:()=>player.subtabs[layer][data]},template:'\n\t\t<div v-if="tmp[layer].microtabs" :style="{\'border-style\': \'solid\'}">\n\t\t\t<div class="upgTable instant">\n\t\t\t\t<tab-buttons :layer="layer" :data="tmp[layer].microtabs[data]" :name="data" v-bind:style="tmp[layer].componentStyles[\'tab-buttons\']"></tab-buttons>\n\t\t\t</div>\n\t\t\t<layer-tab v-if="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :layer="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :embedded="true"></layer-tab>\n\n\t\t\t<column v-else v-bind:style="tmp[layer].microtabs[data][player.subtabs[layer][data]].style" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>\n\t\t</div>\n\t\t'}),Vue.component("bar",{props:["layer","data"],computed:{style(){return constructBarStyle(this.layer,this.data)}},template:'\n\t\t<div v-if="tmp[layer].bars && tmp[layer].bars[data].unlocked" v-bind:style="{\'position\': \'relative\'}"><div v-bind:style="[tmp[layer].bars[data].style, style.dims, {\'display\': \'table\'}]">\n\t\t\t<div class = "overlayTextContainer barBorder" v-bind:style="[tmp[layer].bars[data].borderStyle, style.dims]">\n\t\t\t\t<span class = "overlayText" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].textStyle]" v-html="run(layers[layer].bars[data].display, layers[layer].bars[data])"></span>\n\t\t\t</div>\n\t\t\t<div class ="barBG barBorder" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].baseStyle, tmp[layer].bars[data].borderStyle,  style.dims]">\n\t\t\t\t<div class ="fill" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].fillStyle, style.fillDims]"></div>\n\t\t\t</div>\n\t\t</div></div>\n\t\t'}),Vue.component("achievements",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].achievements" class="upgTable">\n\t\t\t<div v-for="row in (data === undefined ? tmp[layer].achievements.rows : data)" class="upgRow">\n\t\t\t\t<div v-for="col in tmp[layer].achievements.cols"><div v-if="tmp[layer].achievements[row*10+col]!== undefined && tmp[layer].achievements[row*10+col].unlocked" class="upgAlign">\n\t\t\t\t\t<achievement :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.achievement"></achievement>\n\t\t\t\t</div></div>\n\t\t\t</div>\n\t\t\t<br>\n\t\t</div>\n\t\t'}),Vue.component("achievement",{props:["layer","data"],template:'\n\t\t<div v-if="tmp[layer].achievements && tmp[layer].achievements[data]!== undefined && tmp[layer].achievements[data].unlocked" v-bind:class="{ [layer]: true, achievement: true, tooltipBox:true, locked: !hasAchievement(layer, data), bought: hasAchievement(layer, data)}"\n\t\t\tv-bind:style="achievementStyle(layer, data)">\n\t\t\t<tooltip :text="\n\t\t\t(tmp[layer].achievements[data].tooltip == \'\') ? false : hasAchievement(layer, data) ? (tmp[layer].achievements[data].doneTooltip ? tmp[layer].achievements[data].doneTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : \'You did it!\'))\n\t\t\t: (tmp[layer].achievements[data].goalTooltip ? tmp[layer].achievements[data].goalTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : \'LOCKED\'))\n\t\t"></tooltip>\n\t\t\t<span v-if= "tmp[layer].achievements[data].name"><br><h3 v-bind:style="tmp[layer].achievements[data].textStyle" v-html="tmp[layer].achievements[data].name"></h3><br></span>\n\t\t</div>\n\t\t'}),Vue.component("tree",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'<div>\n\t\t<span class="upgRow" v-for="(row, r) in data"><table>\n\t\t\t<span v-for="(node, id) in row" style = "{width: 0px}">\n\t\t\t\t<tree-node :layer=\'node\' :prev=\'layer\' :abb=\'tmp[node].symbol\' :key="key + \'-\' + r + \'-\' + id"></tree-node>\n\t\t\t</span>\n\t\t\t<tr><table><button class="treeNode hidden"></button></table></tr>\n\t\t</span></div>\n\n\t'}),Vue.component("upgrade-tree",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'<thing-tree :layer="layer" :data = "data" :type = "\'upgrade\'"></thing-tree>'}),Vue.component("buyable-tree",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'<thing-tree :layer="layer" :data = "data" :type = "\'buyable\'"></thing-tree>'}),Vue.component("clickable-tree",{props:["layer","data"],computed:{key(){return this.$vnode.key}},template:'<thing-tree :layer="layer" :data = "data" :type = "\'clickable\'"></thing-tree>'}),Vue.component("thing-tree",{props:["layer","data","type"],computed:{key(){return this.$vnode.key}},template:'<div>\n\t\t<span class="upgRow" v-for="(row, r) in data"><table>\n\t\t\t<span v-for="id in row" style = "{width: 0px; height: 0px;}" v-if="tmp[layer][type+\'s\'][id]!== undefined && tmp[layer][type+\'s\'][id].unlocked" class="upgAlign">\n\t\t\t\t<div v-bind:is="type" :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles[type]" class = "treeThing"></div>\n\t\t\t</span>\n\t\t\t<tr><table><button class="treeNode hidden"></button></table></tr>\n\t\t</span></div>\n\t'}),Vue.component("text-input",{props:["layer","data"],template:'\n\t\t\t<input class="instant" :id="\'input-\' + layer + \'-\' + data" :value="player[layer][data].toString()" v-on:focus="focused(true)" v-on:blur="focused(false)"\n\t\t\tv-on:change="player[layer][data] = toValue(document.getElementById(\'input-\' + layer + \'-\' + data).value, player[layer][data])">\n\t\t'}),Vue.component("slider",{props:["layer","data"],template:'\n\t\t\t<div class="tooltipBox">\n\t\t\t<tooltip :text="player[layer][data[0]]"></tooltip><input type="range" v-model="player[layer][data[0]]" :min="data[1]" :max="data[2]"></div>\n\t\t'}),Vue.component("drop-down",{props:["layer","data"],template:'\n\t\t\t<select v-model="player[layer][data[0]]">\n\t\t\t\t<option v-for="item in data[1]" v-bind:value="item">{{item}}</option>\n\t\t\t</select>\n\t\t'}),Vue.component("sell-one",{props:["layer","data"],template:'\n\t\t\t<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellOne && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)" v-on:click="run(tmp[layer].buyables[data].sellOne, tmp[layer].buyables[data])"\n\t\t\t\tv-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellOneText ? tmp[layer].buyables.sellOneText : "Sell One"}}</button>\n\t'}),Vue.component("sell-all",{props:["layer","data"],template:'\n\t\t\t<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)" v-on:click="run(tmp[layer].buyables[data].sellAll, tmp[layer].buyables[data])"\n\t\t\t\tv-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellAllText ? tmp[layer].buyables.sellAllText : "Sell All"}}</button>\n\t'}),Vue.component("node-mark",systemComponents["node-mark"]),Vue.component("tab-buttons",systemComponents["tab-buttons"]),Vue.component("tree-node",systemComponents["tree-node"]),Vue.component("layer-tab",systemComponents["layer-tab"]),Vue.component("overlay-head",systemComponents["overlay-head"]),Vue.component("info-tab",systemComponents["info-tab"]),Vue.component("options-tab",systemComponents["options-tab"]),Vue.component("tooltip",systemComponents.tooltip),Vue.component("particle",systemComponents.particle),Vue.component("bg",systemComponents.bg),app=new Vue({el:"#app",data:{player:player,tmp:tmp,options:options,Decimal:Decimal,format:format,formatWhole:formatWhole,formatTime:formatTime,formatSmall:formatSmall,focused:focused,getThemeName:getThemeName,layerunlocked:layerunlocked,doReset:doReset,buyUpg:buyUpg,buyUpgrade:buyUpgrade,startChallenge:startChallenge,milestoneShown:milestoneShown,keepGoing:keepGoing,hasUpgrade:hasUpgrade,hasMilestone:hasMilestone,hasAchievement:hasAchievement,hasChallenge:hasChallenge,maxedChallenge:maxedChallenge,getBuyableAmount:getBuyableAmount,getClickableState:getClickableState,inChallenge:inChallenge,canAffordUpgrade:canAffordUpgrade,canBuyBuyable:canBuyBuyable,canCompleteChallenge:canCompleteChallenge,subtabShouldNotify:subtabShouldNotify,subtabResetNotify:subtabResetNotify,challengeStyle:challengeStyle,challengeButtonText:challengeButtonText,constructBarStyle:constructBarStyle,constructParticleStyle:constructParticleStyle,VERSION:VERSION,LAYERS:LAYERS,hotkeys:hotkeys,activePopups:activePopups,particles:particles,mouseX:mouseX,mouseY:mouseY,shiftDown:shiftDown,ctrlDown:ctrlDown,run:run,gridRun:gridRun}})}

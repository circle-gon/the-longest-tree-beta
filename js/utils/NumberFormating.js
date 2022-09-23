function exponentialFormat(e,t,o=!0){let r=e.log10().floor(),a=e.div(Decimal.pow(10,r));return 10==a.toStringWithDecimalPlaces(t)&&(a=decimalOne,r=r.add(1)),r=r.gte(1e9)?format(r,3):r.gte(1e4)?commaFormat(r,0):r.toStringWithDecimalPlaces(0),o?a.toStringWithDecimalPlaces(t)+"e"+r:"e"+r}function commaFormat(e,t){if(null==e)return"NaN";if(e.mag<1e-5)return(0).toFixed(t);let o=e.toStringWithDecimalPlaces(t).split(".");return o[0]=o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,"),1==o.length?o[0]:o[0]+"."+o[1]}function regularFormat(e,t){return null==e?"NaN":e.mag<1e-6?(0).toFixed(t):(e.mag<.1&&0!==t&&(t=Math.max(t,6)),e.toStringWithDecimalPlaces(t))}function fixValue(e,t=0){return e||new Decimal(t)}function sumValues(e){return(e=Object.values(e))[0]?e.reduce(((e,t)=>Decimal.add(e,t))):decimalZero}function format(e,t=2,o){if(o=o||modInfo.allowSmall,e=new Decimal(e),isNaN(e.sign)||isNaN(e.layer)||isNaN(e.mag))return player.hasNaN=!0,"NaN";if(e.sign<0)return"-"+format(e.neg(),t,o);if(e.mag==Number.POSITIVE_INFINITY)return"Infinity";if(e.gte("eeee1000")){var r=e.slog();return r.gte(1e6)?"F"+format(r.floor()):Decimal.pow(10,r.sub(r.floor())).toStringWithDecimalPlaces(3)+"F"+commaFormat(r.floor(),0)}if(e.gte("1e1000000"))return exponentialFormat(e,0,!1);if(e.gte("1e10000"))return exponentialFormat(e,0);if(e.gte(1e9))return exponentialFormat(e,t);if(e.gte(1e3))return commaFormat(e,0);if(e.gte(1e-4)||!o)return regularFormat(e,t);if(e.eq(0))return(0).toFixed(t);let a="";return(e=invertOOM(e)).lt("1e1000")?(a=exponentialFormat(e,t),a.replace(/([^(?:e|F)]*)$/,"-$1")):format(e,t)+"⁻¹"}function formatWhole(e){return(e=new Decimal(e)).gte(1e9)||e.lte(.99)&&!e.eq(0)?format(e,2):format(e,0)}function formatTime(e){return e<60?format(e)+"s":e<3600?formatWhole(Math.floor(e/60))+"m "+format(e%60)+"s":e<86400?formatWhole(Math.floor(e/3600))+"h "+formatWhole(Math.floor(e/60)%60)+"m "+format(e%60)+"s":e<31536e3?formatWhole(Math.floor(e/86400)%365)+"d "+formatWhole(Math.floor(e/3600)%24)+"h "+formatWhole(Math.floor(e/60)%60)+"m "+format(e%60)+"s":formatWhole(Math.floor(e/31536e3))+"y "+formatWhole(Math.floor(e/86400)%365)+"d "+formatWhole(Math.floor(e/3600)%24)+"h "+formatWhole(Math.floor(e/60)%60)+"m "+format(e%60)+"s"}function toPlaces(e,t,o){let r=(e=new Decimal(e)).toStringWithDecimalPlaces(t);return new Decimal(r).gte(o)&&(r=new Decimal(o-Math.pow(.1,t)).toStringWithDecimalPlaces(t)),r}function formatSmall(e,t=2){return format(e,t,!0)}function invertOOM(e){let t=e.log10().ceil(),o=e.div(Decimal.pow(10,t));return t=t.neg(),e=new Decimal(10).pow(t).times(o)}

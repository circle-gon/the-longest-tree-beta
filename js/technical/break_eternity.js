window.Decimal=function(){"use strict";var t=17,r=9e15,i=Math.log10(9e15),e=1/9e15,n=308,a=-324,s=5,o=function(){for(var t=[],r=a+1;r<=n;r++)t.push(Number("1e"+r));var i=323;return function(r){return t[r+i]}}(),h=function(t){return y.fromValue_noAlloc(t)},u=function(t,r,i){return y.fromComponents(t,r,i)},g=function(t,r,i){return y.fromComponents_noNormalize(t,r,i)},l=function(t,r){var i=r+1,e=Math.ceil(Math.log10(Math.abs(t))),n=Math.round(t*Math.pow(10,i-e))*Math.pow(10,e-i);return parseFloat(n.toFixed(Math.max(i-e,0)))},m=function(t){return Math.sign(t)*Math.log10(Math.abs(t))},f=function(t){if(!isFinite(t))return t;if(t<-50)return t===Math.trunc(t)?Number.NEGATIVE_INFINITY:0;for(var r=1;t<10;)r*=t,++t;var i=.9189385332046727;i+=(.5+(t-=1))*Math.log(t),i-=t;var e=t*t,n=t;return i+=1/(12*n),i+=1/(360*(n*=e)),i+=1/(1260*(n*=e)),i+=1/(1680*(n*=e)),i+=1/(1188*(n*=e)),i+=691/(360360*(n*=e)),i+=7/(1092*(n*=e)),i+=3617/(122400*(n*=e)),Math.exp(i)/r},c=.5671432904097838,p=function(t,r=1e-10){var i,e;if(!Number.isFinite(t))return t;if(0===t)return t;if(1===t)return c;i=t<10?0:Math.log(t)-Math.log(Math.log(t));for(var n=0;n<100;++n){if(e=(t*Math.exp(-i)+i*i)/(i+1),Math.abs(e-i)<r*Math.abs(e))return e;i=e}throw new Error("Iteration failed to converge: "+t)},y=function(){function n(t){this.sign=0,this.layer=0,this.mag=0,t instanceof n?this.fromDecimal(t):"number"==typeof t?this.fromNumber(t):"string"==typeof t&&this.fromString(t)}Object.defineProperty(n.prototype,"m",{get:function(){if(0===this.sign)return 0;if(0===this.layer){var t,r=Math.floor(Math.log10(this.mag));return t=5e-324===this.mag?5:this.mag/o(r),this.sign*t}if(1===this.layer){var i=this.mag-Math.floor(this.mag);return this.sign*Math.pow(10,i)}return this.sign},set:function(t){this.layer<=2?this.fromMantissaExponent(t,this.e):(this.sign=Math.sign(t),0===this.sign&&(this.layer,this.exponent))},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"e",{get:function(){return 0===this.sign?0:0===this.layer?Math.floor(Math.log10(this.mag)):1===this.layer?Math.floor(this.mag):2===this.layer?Math.floor(Math.sign(this.mag)*Math.pow(10,Math.abs(this.mag))):this.mag*Number.POSITIVE_INFINITY},set:function(t){this.fromMantissaExponent(this.m,t)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"s",{get:function(){return this.sign},set:function(t){0===t?(this.sign=0,this.layer=0,this.mag=0):this.sign=t},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"mantissa",{get:function(){return this.m},set:function(t){this.m=t},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"exponent",{get:function(){return this.e},set:function(t){this.e=t},enumerable:!0,configurable:!0}),n.fromComponents=function(t,r,i){return(new n).fromComponents(t,r,i)},n.fromComponents_noNormalize=function(t,r,i){return(new n).fromComponents_noNormalize(t,r,i)},n.fromMantissaExponent=function(t,r){return(new n).fromMantissaExponent(t,r)},n.fromMantissaExponent_noNormalize=function(t,r){return(new n).fromMantissaExponent_noNormalize(t,r)},n.fromDecimal=function(t){return(new n).fromDecimal(t)},n.fromNumber=function(t){return(new n).fromNumber(t)},n.fromString=function(t){return(new n).fromString(t)},n.fromValue=function(t){return(new n).fromValue(t)},n.fromValue_noAlloc=function(t){return t instanceof n?t:new n(t)},n.abs=function(t){return h(t).abs()},n.neg=function(t){return h(t).neg()},n.negate=function(t){return h(t).neg()},n.negated=function(t){return h(t).neg()},n.sign=function(t){return h(t).sign()},n.sgn=function(t){return h(t).sign()},n.round=function(t){return h(t).round()},n.floor=function(t){return h(t).floor()},n.ceil=function(t){return h(t).ceil()},n.trunc=function(t){return h(t).trunc()},n.add=function(t,r){return h(t).add(r)},n.plus=function(t,r){return h(t).add(r)},n.sub=function(t,r){return h(t).sub(r)},n.subtract=function(t,r){return h(t).sub(r)},n.minus=function(t,r){return h(t).sub(r)},n.mul=function(t,r){return h(t).mul(r)},n.multiply=function(t,r){return h(t).mul(r)},n.times=function(t,r){return h(t).mul(r)},n.div=function(t,r){return h(t).div(r)},n.divide=function(t,r){return h(t).div(r)},n.recip=function(t){return h(t).recip()},n.reciprocal=function(t){return h(t).recip()},n.reciprocate=function(t){return h(t).reciprocate()},n.cmp=function(t,r){return h(t).cmp(r)},n.cmpabs=function(t,r){return h(t).cmpabs(r)},n.compare=function(t,r){return h(t).cmp(r)},n.eq=function(t,r){return h(t).eq(r)},n.equals=function(t,r){return h(t).eq(r)},n.neq=function(t,r){return h(t).neq(r)},n.notEquals=function(t,r){return h(t).notEquals(r)},n.lt=function(t,r){return h(t).lt(r)},n.lte=function(t,r){return h(t).lte(r)},n.gt=function(t,r){return h(t).gt(r)},n.gte=function(t,r){return h(t).gte(r)},n.max=function(t,r){return h(t).max(r)},n.min=function(t,r){return h(t).min(r)},n.minabs=function(t,r){return h(t).minabs(r)},n.maxabs=function(t,r){return h(t).maxabs(r)},n.clamp=function(t,r,i){return h(t).clamp(r,i)},n.clampMin=function(t,r){return h(t).clampMin(r)},n.clampMax=function(t,r){return h(t).clampMax(r)},n.cmp_tolerance=function(t,r,i){return h(t).cmp_tolerance(r,i)},n.compare_tolerance=function(t,r,i){return h(t).cmp_tolerance(r,i)},n.eq_tolerance=function(t,r,i){return h(t).eq_tolerance(r,i)},n.equals_tolerance=function(t,r,i){return h(t).eq_tolerance(r,i)},n.neq_tolerance=function(t,r,i){return h(t).neq_tolerance(r,i)},n.notEquals_tolerance=function(t,r,i){return h(t).notEquals_tolerance(r,i)},n.lt_tolerance=function(t,r,i){return h(t).lt_tolerance(r,i)},n.lte_tolerance=function(t,r,i){return h(t).lte_tolerance(r,i)},n.gt_tolerance=function(t,r,i){return h(t).gt_tolerance(r,i)},n.gte_tolerance=function(t,r,i){return h(t).gte_tolerance(r,i)},n.pLog10=function(t){return h(t).pLog10()},n.absLog10=function(t){return h(t).absLog10()},n.log10=function(t){return h(t).log10()},n.log=function(t,r){return h(t).log(r)},n.log2=function(t){return h(t).log2()},n.ln=function(t){return h(t).ln()},n.logarithm=function(t,r){return h(t).logarithm(r)},n.pow=function(t,r){return h(t).pow(r)},n.pow10=function(t){return h(t).pow10()},n.root=function(t,r){return h(t).root(r)},n.factorial=function(t,r){return h(t).factorial()},n.gamma=function(t,r){return h(t).gamma()},n.lngamma=function(t,r){return h(t).lngamma()},n.exp=function(t){return h(t).exp()},n.sqr=function(t){return h(t).sqr()},n.sqrt=function(t){return h(t).sqrt()},n.cube=function(t){return h(t).cube()},n.cbrt=function(t){return h(t).cbrt()},n.tetrate=function(t,r=2,i=g(1,0,1)){return h(t).tetrate(r,i)},n.iteratedexp=function(t,r=2,i=g(1,0,1)){return h(t).iteratedexp(r,i)},n.iteratedlog=function(t,r=10,i=1){return h(t).iteratedlog(r,i)},n.layeradd10=function(t,r){return h(t).layeradd10(r)},n.layeradd=function(t,r,i=10){return h(t).layeradd(r,i)},n.slog=function(t,r=10){return h(t).slog(r)},n.lambertw=function(t){return h(t).lambertw()},n.ssqrt=function(t){return h(t).ssqrt()},n.pentate=function(t,r=2,i=g(1,0,1)){return h(t).pentate(r,i)},n.affordGeometricSeries=function(t,r,i,e){return this.affordGeometricSeries_core(h(t),h(r),h(i),e)},n.sumGeometricSeries=function(t,r,i,e){return this.sumGeometricSeries_core(t,h(r),h(i),e)},n.affordArithmeticSeries=function(t,r,i,e){return this.affordArithmeticSeries_core(h(t),h(r),h(i),h(e))},n.sumArithmeticSeries=function(t,r,i,e){return this.sumArithmeticSeries_core(h(t),h(r),h(i),h(e))},n.efficiencyOfPurchase=function(t,r,i){return this.efficiencyOfPurchase_core(h(t),h(r),h(i))},n.randomDecimalForTesting=function(t){if(20*Math.random()<1)return g(0,0,0);var r=Math.random()>.5?1:-1;if(20*Math.random()<1)return g(r,0,1);var i=Math.floor(Math.random()*(t+1)),e=0===i?616*Math.random()-308:16*Math.random();Math.random()>.9&&(e=Math.trunc(e));var n=Math.pow(10,e);return Math.random()>.9&&(n=Math.trunc(n)),u(r,i,n)},n.affordGeometricSeries_core=function(t,r,i,e){var a=r.mul(i.pow(e));return n.floor(t.div(a).mul(i.sub(1)).add(1).log10().div(i.log10()))},n.sumGeometricSeries_core=function(t,r,i,e){return r.mul(i.pow(e)).mul(n.sub(1,i.pow(t))).div(n.sub(1,i))},n.affordArithmeticSeries_core=function(t,r,i,e){var n=r.add(e.mul(i)).sub(i.div(2)),a=n.pow(2);return n.neg().add(a.add(i.mul(t).mul(2)).sqrt()).div(i).floor()},n.sumArithmeticSeries_core=function(t,r,i,e){var n=r.add(e.mul(i));return t.div(2).mul(n.mul(2).plus(t.sub(1).mul(i)))},n.efficiencyOfPurchase_core=function(t,r,i){return t.div(r).add(t.div(i))},n.prototype.normalize=function(){if(0===this.sign||0===this.mag&&0===this.layer)return this.sign=0,this.mag=0,this.layer=0,this;if(0===this.layer&&this.mag<0&&(this.mag=-this.mag,this.sign=-this.sign),0===this.layer&&this.mag<e)return this.layer+=1,this.mag=Math.log10(this.mag),this;var t=Math.abs(this.mag),n=Math.sign(this.mag);if(t>=r)return this.layer+=1,this.mag=n*Math.log10(t),this;for(;t<i&&this.layer>0;)this.layer-=1,0===this.layer?this.mag=Math.pow(10,this.mag):(this.mag=n*Math.pow(10,t),t=Math.abs(this.mag),n=Math.sign(this.mag));return 0===this.layer&&(this.mag<0?(this.mag=-this.mag,this.sign=-this.sign):0===this.mag&&(this.sign=0)),this},n.prototype.fromComponents=function(t,r,i){return this.sign=t,this.layer=r,this.mag=i,this.normalize(),this},n.prototype.fromComponents_noNormalize=function(t,r,i){return this.sign=t,this.layer=r,this.mag=i,this},n.prototype.fromMantissaExponent=function(t,r){return this.layer=1,this.sign=Math.sign(t),t=Math.abs(t),this.mag=r+Math.log10(t),this.normalize(),this},n.prototype.fromMantissaExponent_noNormalize=function(t,r){return this.fromMantissaExponent(t,r),this},n.prototype.fromDecimal=function(t){return this.sign=t.sign,this.layer=t.layer,this.mag=t.mag,this},n.prototype.fromNumber=function(t){return this.mag=Math.abs(t),this.sign=Math.sign(t),this.layer=0,this.normalize(),this};var a=!0,y=!1;n.prototype.fromString=function(t){a?t=t.replace(",",""):y&&(t=t.replace(",","."));var r=t.split("^^^");if(2===r.length){var i=parseFloat(r[0]),e=parseFloat(r[1]),s=1;if(2===(g=r[1].split(";")).length&&(s=parseFloat(g[1]),isFinite(s)||(s=1)),isFinite(i)&&isFinite(e)){var o=n.pentate(i,e,s);return this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this}}var g,l=t.split("^^");if(2===l.length&&(i=parseFloat(l[0]),e=parseFloat(l[1]),2===(g=l[1].split(";")).length&&(s=parseFloat(g[1]),isFinite(s)||(s=1)),isFinite(i)&&isFinite(e)))return o=n.tetrate(i,e,s),this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this;var f,c=t.split("^");if(2===c.length){i=parseFloat(c[0]);var p=parseFloat(c[1]);if(isFinite(i)&&isFinite(p))return o=n.pow(i,p),this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this}if(2===(f=(t=t.trim().toLowerCase()).split("pt")).length&&(i=10,e=parseFloat(f[0]),f[1]=f[1].replace("(",""),f[1]=f[1].replace(")",""),s=parseFloat(f[1]),isFinite(s)||(s=1),isFinite(i)&&isFinite(e)))return o=n.tetrate(i,e,s),this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this;if(2===(f=t.split("p")).length&&(i=10,e=parseFloat(f[0]),f[1]=f[1].replace("(",""),f[1]=f[1].replace(")",""),s=parseFloat(f[1]),isFinite(s)||(s=1),isFinite(i)&&isFinite(e)))return o=n.tetrate(i,e,s),this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this;var d=t.split("e"),M=d.length-1;if(0===M){var b=parseFloat(t);if(isFinite(b))return this.fromNumber(b)}else if(1===M&&(b=parseFloat(t),isFinite(b)&&0!==b))return this.fromNumber(b);var N=t.split("e^");if(2===N.length){this.sign=1,"-"==N[0].charAt(0)&&(this.sign=-1);for(var v="",F=0;F<N[1].length;++F){var _=N[1].charCodeAt(F);if(!(_>=43&&_<=57||101===_))return this.layer=parseFloat(v),this.mag=parseFloat(N[1].substr(F+1)),this.normalize(),this;v+=N[1].charAt(F)}}if(M<1)return this.sign=0,this.layer=0,this.mag=0,this;var w=parseFloat(d[0]);if(0===w)return this.sign=0,this.layer=0,this.mag=0,this;if(p=parseFloat(d[d.length-1]),M>=2){var q=parseFloat(d[d.length-2]);isFinite(q)&&(p*=Math.sign(q),p+=m(q))}if(isFinite(w))if(1===M)this.sign=Math.sign(w),this.layer=1,this.mag=p+Math.log10(Math.abs(w));else{if(this.sign=Math.sign(w),this.layer=M,2===M)return o=n.mul(u(1,2,p),h(w)),this.sign=o.sign,this.layer=o.layer,this.mag=o.mag,this;this.mag=p}else this.sign="-"===d[0]?-1:1,this.layer=M,this.mag=p;return this.normalize(),this},n.prototype.fromValue=function(t){return t instanceof n?this.fromDecimal(t):"number"==typeof t?this.fromNumber(t):"string"==typeof t?this.fromString(t):(this.sign=0,this.layer=0,this.mag=0,this)},n.prototype.toNumber=function(){return Number.isFinite(this.layer)?0===this.layer?this.sign*this.mag:1===this.layer?this.sign*Math.pow(10,this.mag):this.mag>0?this.sign>0?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:0:Number.NaN},n.prototype.mantissaWithDecimalPlaces=function(t){return isNaN(this.m)?Number.NaN:0===this.m?0:l(this.m,t)},n.prototype.magnitudeWithDecimalPlaces=function(t){return isNaN(this.mag)?Number.NaN:0===this.mag?0:l(this.mag,t)},n.prototype.toString=function(){return 0===this.layer?this.mag<1e21&&this.mag>1e-7||0===this.mag?(this.sign*this.mag).toString():this.m+"e"+this.e:1===this.layer?this.m+"e"+this.e:this.layer<=s?(-1===this.sign?"-":"")+"e".repeat(this.layer)+this.mag:(-1===this.sign?"-":"")+"(e^"+this.layer+")"+this.mag},n.prototype.toExponential=function(t){return 0===this.layer?(this.sign*this.mag).toExponential(t):this.toStringWithDecimalPlaces(t)},n.prototype.toFixed=function(t){return 0===this.layer?(this.sign*this.mag).toFixed(t):this.toStringWithDecimalPlaces(t)},n.prototype.toPrecision=function(t){return this.e<=-7?this.toExponential(t-1):t>this.e?this.toFixed(t-this.exponent-1):this.toExponential(t-1)},n.prototype.valueOf=function(){return this.toString()},n.prototype.toJSON=function(){return this.toString()},n.prototype.toStringWithDecimalPlaces=function(t){return 0===this.layer?this.mag<1e21&&this.mag>1e-7||0===this.mag?(this.sign*this.mag).toFixed(t):l(this.m,t)+"e"+l(this.e,t):1===this.layer?l(this.m,t)+"e"+l(this.e,t):this.layer<=s?(-1===this.sign?"-":"")+"e".repeat(this.layer)+l(this.mag,t):(-1===this.sign?"-":"")+"(e^"+this.layer+")"+l(this.mag,t)},n.prototype.abs=function(){return g(0===this.sign?0:1,this.layer,this.mag)},n.prototype.neg=function(){return g(-this.sign,this.layer,this.mag)},n.prototype.negate=function(){return this.neg()},n.prototype.negated=function(){return this.neg()},n.prototype.sign=function(){return this.sign},n.prototype.sgn=function(){return this.sign},n.prototype.round=function(){return this.mag<0?n.dZero:0===this.layer?u(this.sign,0,Math.round(this.mag)):this},n.prototype.floor=function(){return this.mag<0?n.dZero:0===this.layer?u(this.sign,0,Math.floor(this.mag)):this},n.prototype.ceil=function(){return this.mag<0?n.dZero:0===this.layer?u(this.sign,0,Math.ceil(this.mag)):this},n.prototype.trunc=function(){return this.mag<0?n.dZero:0===this.layer?u(this.sign,0,Math.trunc(this.mag)):this},n.prototype.add=function(r){var i,e,a=h(r);if(!Number.isFinite(this.layer))return this;if(!Number.isFinite(a.layer))return a;if(0===this.sign)return a;if(0===a.sign)return this;if(this.sign===-a.sign&&this.layer===a.layer&&this.mag===a.mag)return g(0,0,0);if(this.layer>=2||a.layer>=2)return this.maxabs(a);if(n.cmpabs(this,a)>0?(i=this,e=a):(i=a,e=this),0===i.layer&&0===e.layer)return h(i.sign*i.mag+e.sign*e.mag);var s=i.layer*Math.sign(i.mag),o=e.layer*Math.sign(e.mag);if(s-o>=2)return i;if(0===s&&-1===o){if(Math.abs(e.mag-Math.log10(i.mag))>t)return i;var l=Math.pow(10,Math.log10(i.mag)-e.mag),m=e.sign+i.sign*l;return u(Math.sign(m),1,e.mag+Math.log10(Math.abs(m)))}return 1===s&&0===o?Math.abs(i.mag-Math.log10(e.mag))>t?i:(l=Math.pow(10,i.mag-Math.log10(e.mag)),m=e.sign+i.sign*l,u(Math.sign(m),1,Math.log10(e.mag)+Math.log10(Math.abs(m)))):Math.abs(i.mag-e.mag)>t?i:(l=Math.pow(10,i.mag-e.mag),m=e.sign+i.sign*l,u(Math.sign(m),1,e.mag+Math.log10(Math.abs(m))))},n.prototype.plus=function(t){return this.add(t)},n.prototype.sub=function(t){return this.add(h(t).neg())},n.prototype.subtract=function(t){return this.sub(t)},n.prototype.minus=function(t){return this.sub(t)},n.prototype.mul=function(t){var r,i,e=h(t);if(!Number.isFinite(this.layer))return this;if(!Number.isFinite(e.layer))return e;if(0===this.sign||0===e.sign)return g(0,0,0);if(this.layer===e.layer&&this.mag===-e.mag)return g(this.sign*e.sign,0,1);if(this.layer>e.layer||this.layer==e.layer&&Math.abs(this.mag)>Math.abs(e.mag)?(r=this,i=e):(r=e,i=this),0===r.layer&&0===i.layer)return h(r.sign*i.sign*r.mag*i.mag);if(r.layer>=3||r.layer-i.layer>=2)return u(r.sign*i.sign,r.layer,r.mag);if(1===r.layer&&0===i.layer)return u(r.sign*i.sign,1,r.mag+Math.log10(i.mag));if(1===r.layer&&1===i.layer)return u(r.sign*i.sign,1,r.mag+i.mag);if(2===r.layer&&1===i.layer){var n=u(Math.sign(r.mag),r.layer-1,Math.abs(r.mag)).add(u(Math.sign(i.mag),i.layer-1,Math.abs(i.mag)));return u(r.sign*i.sign,n.layer+1,n.sign*n.mag)}if(2===r.layer&&2===i.layer)return n=u(Math.sign(r.mag),r.layer-1,Math.abs(r.mag)).add(u(Math.sign(i.mag),i.layer-1,Math.abs(i.mag))),u(r.sign*i.sign,n.layer+1,n.sign*n.mag);throw Error("Bad arguments to mul: "+this+", "+t)},n.prototype.multiply=function(t){return this.mul(t)},n.prototype.times=function(t){return this.mul(t)},n.prototype.div=function(t){var r=h(t);return this.mul(r.recip())},n.prototype.divide=function(t){return this.div(t)},n.prototype.divideBy=function(t){return this.div(t)},n.prototype.dividedBy=function(t){return this.div(t)},n.prototype.recip=function(){return 0===this.mag?n.dNaN:0===this.layer?u(this.sign,0,1/this.mag):u(this.sign,this.layer,-this.mag)},n.prototype.reciprocal=function(){return this.recip()},n.prototype.reciprocate=function(){return this.recip()},n.prototype.cmp=function(t){var r=h(t);return this.sign>r.sign?1:this.sign<r.sign?-1:this.sign*this.cmpabs(t)},n.prototype.cmpabs=function(t){var r=h(t),i=this.mag>0?this.layer:-this.layer,e=r.mag>0?r.layer:-r.layer;return i>e?1:i<e?-1:this.mag>r.mag?1:this.mag<r.mag?-1:0},n.prototype.compare=function(t){return this.cmp(t)},n.prototype.eq=function(t){var r=h(t);return this.sign===r.sign&&this.layer===r.layer&&this.mag===r.mag},n.prototype.equals=function(t){return this.eq(t)},n.prototype.neq=function(t){return!this.eq(t)},n.prototype.notEquals=function(t){return this.neq(t)},n.prototype.lt=function(t){return h(t),-1===this.cmp(t)},n.prototype.lte=function(t){return!this.gt(t)},n.prototype.gt=function(t){return h(t),1===this.cmp(t)},n.prototype.gte=function(t){return!this.lt(t)},n.prototype.max=function(t){var r=h(t);return this.lt(r)?r:this},n.prototype.min=function(t){var r=h(t);return this.gt(r)?r:this},n.prototype.maxabs=function(t){var r=h(t);return this.cmpabs(r)<0?r:this},n.prototype.minabs=function(t){var r=h(t);return this.cmpabs(r)>0?r:this},n.prototype.clamp=function(t,r){return this.max(t).min(r)},n.prototype.clampMin=function(t){return this.max(t)},n.prototype.clampMax=function(t){return this.min(t)},n.prototype.cmp_tolerance=function(t,r){var i=h(t);return this.eq_tolerance(i,r)?0:this.cmp(i)},n.prototype.compare_tolerance=function(t,r){return this.cmp_tolerance(t,r)},n.prototype.eq_tolerance=function(t,r){var i=h(t);if(null==r&&(r=1e-7),this.sign!==i.sign)return!1;if(Math.abs(this.layer-i.layer)>1)return!1;var e=this.mag,n=i.mag;return this.layer>i.layer&&(n=m(n)),this.layer<i.layer&&(e=m(e)),Math.abs(e-n)<=r*Math.max(Math.abs(e),Math.abs(n))},n.prototype.equals_tolerance=function(t,r){return this.eq_tolerance(t,r)},n.prototype.neq_tolerance=function(t,r){return!this.eq_tolerance(t,r)},n.prototype.notEquals_tolerance=function(t,r){return this.neq_tolerance(t,r)},n.prototype.lt_tolerance=function(t,r){var i=h(t);return!this.eq_tolerance(i,r)&&this.lt(i)},n.prototype.lte_tolerance=function(t,r){var i=h(t);return this.eq_tolerance(i,r)||this.lt(i)},n.prototype.gt_tolerance=function(t,r){var i=h(t);return!this.eq_tolerance(i,r)&&this.gt(i)},n.prototype.gte_tolerance=function(t,r){var i=h(t);return this.eq_tolerance(i,r)||this.gt(i)},n.prototype.pLog10=function(){return this.lt(n.dZero)?n.dZero:this.log10()},n.prototype.absLog10=function(){return 0===this.sign?n.dNaN:this.layer>0?u(Math.sign(this.mag),this.layer-1,Math.abs(this.mag)):u(1,0,Math.log10(this.mag))},n.prototype.log10=function(){return this.sign<=0?n.dNaN:this.layer>0?u(Math.sign(this.mag),this.layer-1,Math.abs(this.mag)):u(this.sign,0,Math.log10(this.mag))},n.prototype.log=function(t){return t=h(t),this.sign<=0||t.sign<=0||1===t.sign&&0===t.layer&&1===t.mag?n.dNaN:0===this.layer&&0===t.layer?u(this.sign,0,Math.log(this.mag)/Math.log(t.mag)):n.div(this.log10(),t.log10())},n.prototype.log2=function(){return this.sign<=0?n.dNaN:0===this.layer?u(this.sign,0,Math.log2(this.mag)):1===this.layer?u(Math.sign(this.mag),0,3.321928094887362*Math.abs(this.mag)):2===this.layer?u(Math.sign(this.mag),1,Math.abs(this.mag)+.5213902276543247):u(Math.sign(this.mag),this.layer-1,Math.abs(this.mag))},n.prototype.ln=function(){return this.sign<=0?n.dNaN:0===this.layer?u(this.sign,0,Math.log(this.mag)):1===this.layer?u(Math.sign(this.mag),0,2.302585092994046*Math.abs(this.mag)):2===this.layer?u(Math.sign(this.mag),1,Math.abs(this.mag)+.36221568869946325):u(Math.sign(this.mag),this.layer-1,Math.abs(this.mag))},n.prototype.logarithm=function(t){return this.log(t)},n.prototype.pow=function(t){var r=this,i=h(t);if(0===r.sign)return i.eq(0)?g(1,0,1):r;if(1===r.sign&&0===r.layer&&1===r.mag)return r;if(0===i.sign)return g(1,0,1);if(1===i.sign&&0===i.layer&&1===i.mag)return r;var e=r.absLog10().mul(i).pow10();return-1===this.sign&&1===Math.abs(i.toNumber()%2)?e.neg():e},n.prototype.pow10=function(){if(!Number.isFinite(this.layer)||!Number.isFinite(this.mag))return n.dNaN;var t=this;if(0===t.layer){var r=Math.pow(10,t.sign*t.mag);if(Number.isFinite(r)&&Math.abs(r)>.1)return u(1,0,r);if(0===t.sign)return n.dOne;t=g(t.sign,t.layer+1,Math.log10(t.mag))}return t.sign>0&&t.mag>0?u(t.sign,t.layer+1,t.mag):t.sign<0&&t.mag>0?u(-t.sign,t.layer+1,-t.mag):n.dOne},n.prototype.pow_base=function(t){return h(t).pow(this)},n.prototype.root=function(t){var r=h(t);return this.pow(r.recip())},n.prototype.factorial=function(){return this.mag<0?this.toNumber().add(1).gamma():0===this.layer?this.add(1).gamma():1===this.layer?n.exp(n.mul(this,n.ln(this).sub(1))):n.exp(this)},n.prototype.gamma=function(){if(this.mag<0)return this.recip();if(0===this.layer){if(this.lt(g(1,0,24)))return h(f(this.sign*this.mag));var t=this.mag-1,r=.9189385332046727;r+=(t+.5)*Math.log(t);var i=t*t,e=t,a=12*e,s=1/a,o=(r-=t)+s;if(o===r)return n.exp(r);if((o=(r=o)-(s=1/(a=360*(e*=i))))===r)return n.exp(r);r=o;var u=1/(a=1260*(e*=i));return r+=u,r-=u=1/(a=1680*(e*=i)),n.exp(r)}return 1===this.layer?n.exp(n.mul(this,n.ln(this).sub(1))):n.exp(this)},n.prototype.lngamma=function(){return this.gamma().ln()},n.prototype.exp=function(){return this.mag<0?n.dOne:0===this.layer&&this.mag<=709.7?h(Math.exp(this.sign*this.mag)):0===this.layer?u(1,1,this.sign*Math.log10(Math.E)*this.mag):1===this.layer?u(1,2,this.sign*(Math.log10(.4342944819032518)+this.mag)):u(1,this.layer+1,this.sign*this.mag)},n.prototype.sqr=function(){return this.pow(2)},n.prototype.sqrt=function(){if(0===this.layer)return h(Math.sqrt(this.sign*this.mag));if(1===this.layer)return u(1,2,Math.log10(this.mag)-.3010299956639812);var t=n.div(g(this.sign,this.layer-1,this.mag),g(1,0,2));return t.layer+=1,t.normalize(),t},n.prototype.cube=function(){return this.pow(3)},n.prototype.cbrt=function(){return this.pow(1/3)},n.prototype.tetrate=function(t=2,r=g(1,0,1)){if(t===Number.POSITIVE_INFINITY){var i=n.ln(this).neg();return i.lambertw().div(i)}if(t<0)return n.iteratedlog(r,this,-t);r=h(r);var e=t-(t=Math.trunc(t));0!==e&&(r.eq(n.dOne)?(++t,r=new n(e)):r=this.eq(10)?r.layeradd10(e):r.layeradd(e,this));for(var a=0;a<t;++a){if(r=this.pow(r),!isFinite(r.layer)||!isFinite(r.mag))return r;if(r.layer-this.layer>3)return g(r.sign,r.layer+(t-a-1),r.mag);if(a>100)return r}return r},n.prototype.iteratedexp=function(t=2,r=g(1,0,1)){return this.tetrate(t,r)},n.prototype.iteratedlog=function(t=10,r=1){if(r<0)return n.tetrate(t,-r,this);t=h(t);var i=h(this),e=r-(r=Math.trunc(r));if(i.layer-t.layer>3){var a=Math.min(r,i.layer-t.layer-3);r-=a,i.layer-=a}for(var s=0;s<r;++s){if(i=i.log(t),!isFinite(i.layer)||!isFinite(i.mag))return i;if(s>100)return i}return e>0&&e<1&&(i=t.eq(10)?i.layeradd10(-e):i.layeradd(-e,t)),i},n.prototype.slog=function(t=10){if(this.mag<0)return n.dNegOne;t=h(t);var r=0,i=h(this);if(i.layer-t.layer>3){var e=i.layer-t.layer-3;r+=e,i.layer-=e}for(var a=0;a<100;++a)if(i.lt(n.dZero))i=n.pow(t,i),r-=1;else{if(i.lte(n.dOne))return h(r+i.toNumber()-1);r+=1,i=n.log(i,t)}return h(r)},n.prototype.layeradd10=function(t){t=n.fromValue_noAlloc(t).toNumber();var r,i=h(this);if(t>=1&&(t-=r=Math.trunc(t),i.layer+=r),t<=-1&&(t-=r=Math.trunc(t),i.layer+=r,i.layer<0))for(var e=0;e<100;++e){if(i.layer++,i.mag=Math.log10(i.mag),!isFinite(i.mag))return i;if(i.layer>=0)break}if(t>0){for(var a=0;Number.isFinite(i.mag)&&i.mag<10;)i.mag=Math.pow(10,i.mag),++a;for(i.mag>1e10&&(i.mag=Math.log10(i.mag),i.layer++),(s=Math.log10(Math.log(1e10)/Math.log(i.mag),10))<t&&(i.mag=Math.log10(1e10),i.layer++,t-=s),i.mag=Math.pow(i.mag,Math.pow(10,t));a>0;)i.mag=Math.log10(i.mag),--a}else if(t<0){for(a=0;Number.isFinite(i.mag)&&i.mag<10;)i.mag=Math.pow(10,i.mag),++a;var s;for(i.mag>1e10&&(i.mag=Math.log10(i.mag),i.layer++),(s=Math.log10(1/Math.log10(i.mag)))>t&&(i.mag=1e10,i.layer--,t-=s),i.mag=Math.pow(i.mag,Math.pow(10,t));a>0;)i.mag=Math.log10(i.mag),--a}for(;i.layer<0;)i.layer++,i.mag=Math.log10(i.mag);return i.normalize(),i},n.prototype.layeradd=function(t,r){var i=this.slog(r).toNumber()+t;return i>=0?n.tetrate(r,i):Number.isFinite(i)?i>=-1?n.log(n.tetrate(r,i+1),r):void n.log(n.log(n.tetrate(r,i+2),r),r):n.dNaN},n.prototype.lambertw=function(){if(this.lt(-.3678794411710499))throw Error("lambertw is unimplemented for results less than -1, sorry!");return this.mag<0?h(p(this.toNumber())):0===this.layer?h(p(this.sign*this.mag)):1===this.layer||2===this.layer?d(this):this.layer>=3?g(this.sign,this.layer-1,this.mag):void 0};var d=function(t,r=1e-10){var i,e,a,s;if(!Number.isFinite(t.mag))return t;if(0===t)return t;if(1===t)return c;n.abs(t),i=n.ln(t);for(var o=0;o<100;++o){if(e=n.exp(-i),a=i.sub(t.mul(e)),s=i.sub(a.div(i.add(1).sub(i.add(2).mul(a).div(n.mul(2,i).add(2))))),n.abs(s.sub(i)).lt(n.abs(s).mul(r)))return s;i=s}throw Error("Iteration failed to converge: "+t)};return n.prototype.ssqrt=function(){if(1==this.sign&&this.layer>=3)return g(this.sign,this.layer-1,this.mag);var t=this.ln();return t.div(t.lambertw())},n.prototype.pentate=function(t=2,r=g(1,0,1)){r=h(r);var i=t-(t=Math.trunc(t));0!==i&&(r.eq(n.dOne)?(++t,r=new n(i)):r=this.eq(10)?r.layeradd10(i):r.layeradd(i,this));for(var e=0;e<t;++e){if(r=this.tetrate(r),!isFinite(r.layer)||!isFinite(r.mag))return r;if(e>10)return r}return r},n.prototype.sin=function(){return this.mag<0?this:0===this.layer?h(Math.sin(this.sign*this.mag)):g(0,0,0)},n.prototype.cos=function(){return this.mag<0?n.dOne:0===this.layer?h(Math.cos(this.sign*this.mag)):g(0,0,0)},n.prototype.tan=function(){return this.mag<0?this:0===this.layer?h(Math.tan(this.sign*this.mag)):g(0,0,0)},n.prototype.asin=function(){return this.mag<0?this:0===this.layer?h(Math.asin(this.sign*this.mag)):g(Number.NaN,Number.NaN,Number.NaN)},n.prototype.acos=function(){return this.mag<0?h(Math.acos(this.toNumber())):0===this.layer?h(Math.acos(this.sign*this.mag)):g(Number.NaN,Number.NaN,Number.NaN)},n.prototype.atan=function(){return this.mag<0?this:0===this.layer?h(Math.atan(this.sign*this.mag)):h(Math.atan(Infinity*this.sign))},n.prototype.sinh=function(){return this.exp().sub(this.negate().exp()).div(2)},n.prototype.cosh=function(){return this.exp().add(this.negate().exp()).div(2)},n.prototype.tanh=function(){return this.sinh().div(this.cosh())},n.prototype.asinh=function(){return n.ln(this.add(this.sqr().add(1).sqrt()))},n.prototype.acosh=function(){return n.ln(this.add(this.sqr().sub(1).sqrt()))},n.prototype.atanh=function(){return this.abs().gte(1)?g(Number.NaN,Number.NaN,Number.NaN):n.ln(this.add(1).div(h(1).sub(this))).div(2)},n.prototype.ascensionPenalty=function(t){return 0===t?this:this.root(n.pow(10,t))},n.prototype.egg=function(){return this.add(9)},n.prototype.lessThanOrEqualTo=function(t){return this.cmp(t)<1},n.prototype.lessThan=function(t){return this.cmp(t)<0},n.prototype.greaterThanOrEqualTo=function(t){return this.cmp(t)>-1},n.prototype.greaterThan=function(t){return this.cmp(t)>0},n}();return y.dZero=g(0,0,0),y.dOne=g(1,0,1),y.dNegOne=g(-1,0,1),y.dTwo=g(1,0,2),y.dTen=g(1,0,10),y.dNaN=g(Number.NaN,Number.NaN,Number.NaN),y.dInf=g(1,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),y.dNegInf=g(-1,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY),y.dNumberMax=u(1,0,Number.MAX_VALUE),y.dNumberMin=u(1,0,Number.MIN_VALUE),y}();

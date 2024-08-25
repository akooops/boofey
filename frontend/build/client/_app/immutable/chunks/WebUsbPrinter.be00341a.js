function Ae(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Je={exports:{}},Oe={html:{skipScheme:"html",lineBreakScheme:"html",whitespace:"collapse"}},Ne=/<\s*br(?:[\s/]*|\s[^>]*)>/gi,Be={unix:[/\n/g,`
`],dos:[/\r\n/g,`\r
`],mac:[/\r/g,"\r"],html:[Ne,"<br>"],xhtml:[Ne,"<br/>"]},_e={"ansi-color":/\x1B\[[^m]*m/g,html:/<[^>]*>/g,bbcode:/\[[^]]*\]/g},We={soft:1,hard:1},Ce={collapse:1,default:1,line:1,all:1},Se={all:1,multi:1,none:1},Ue=/([sm])(\d+)/,Qe=/[-/\\^$*+?.()|[\]{}]/g;function be(e){return e.replace(Qe,"\\$&")}var de=Je.exports=function(e,n,t){typeof e=="object"&&(e=(t=e).start,n=t.stop),typeof n=="object"&&(t=n,e=e||t.start,n=void 0),n||(n=e,e=0),t||(t={});var r,a,m,i,U,Z,q,R,O,b,d,j,ee,te,ce,o,B,ne,re="soft",N="default",se=4,I="all",_="",fe="";if(r=t.preset)for(r instanceof Array||(r=[r]),ne=0;ne<r.length;ne++){if(!(o=Oe[r[ne]]))throw new TypeError('preset must be one of "'+Object.keys(Oe).join('", "')+'"');o.mode&&(re=o.mode),o.whitespace&&(N=o.whitespace),o.tabWidth!==void 0&&(se=o.tabWidth),o.skip&&(a=o.skip),o.skipScheme&&(m=o.skipScheme),o.lineBreak&&(i=o.lineBreak),o.lineBreakScheme&&(U=o.lineBreakScheme),o.respectLineBreaks&&(I=o.respectLineBreaks),o.preservedLineIndent!==void 0&&(q=o.preservedLineIndent),o.wrapLineIndent!==void 0&&(R=o.wrapLineIndent),o.wrapLineIndentBase&&(O=o.wrapLineIndentBase)}if(t.mode){if(!We[t.mode])throw new TypeError('mode must be one of "'+Object.keys(We).join('", "')+'"');re=t.mode}if(t.whitespace){if(!Ce[t.whitespace])throw new TypeError('whitespace must be one of "'+Object.keys(Ce).join('", "')+'"');N=t.whitespace}if(t.tabWidth!==void 0){if(!(parseInt(t.tabWidth,10)>=0))throw new TypeError("tabWidth must be a non-negative integer");se=parseInt(t.tabWidth,10)}if(ce=new Array(se+1).join(" "),t.respectLineBreaks){if(!Se[t.respectLineBreaks]&&!Ue.test(t.respectLineBreaks))throw new TypeError('respectLineBreaks must be one of "'+Object.keys(Se).join('", "')+'", "m<num>", "s<num>"');I=t.respectLineBreaks}if(I==="multi")I="m",Z=2;else if(!Se[I]){var ge=Ue.exec(I);I=ge[1],Z=parseInt(ge[2],10)}if(t.preservedLineIndent!==void 0){if(!(parseInt(t.preservedLineIndent,10)>=0))throw new TypeError("preservedLineIndent must be a non-negative integer");q=parseInt(t.preservedLineIndent,10)}if(q>0&&(_=new Array(q+1).join(" ")),t.wrapLineIndent!==void 0){if(isNaN(parseInt(t.wrapLineIndent,10)))throw new TypeError("wrapLineIndent must be an integer");R=parseInt(t.wrapLineIndent,10)}if(t.wrapLineIndentBase&&(O=t.wrapLineIndentBase),O){if(R===void 0)throw new TypeError("wrapLineIndent must be specified when wrapLineIndentBase is specified");if(O instanceof RegExp)te=O;else{if(typeof O!="string")throw new TypeError("wrapLineIndentBase must be either a RegExp object or a string");te=new RegExp(be(O))}}else if(R>0)fe=new Array(R+1).join(" ");else if(R<0)throw new TypeError("wrapLineIndent must be non-negative when a base is not specified");if(t.skipScheme){if(!_e[t.skipScheme])throw new TypeError('skipScheme must be one of "'+Object.keys(_e).join('", "')+'"');m=t.skipScheme}if(t.skip&&(a=t.skip),a)if(a instanceof RegExp)(b=a).global||(B="g",b.ignoreCase&&(B+="i"),b.multiline&&(B+="m"),b=new RegExp(b.source,B));else{if(typeof a!="string")throw new TypeError("skip must be either a RegExp object or a string");b=new RegExp(be(a),"g")}if(!b&&m&&(b=_e[m]),t.lineBreakScheme){if(!Be[t.lineBreakScheme])throw new TypeError('lineBreakScheme must be one of "'+Object.keys(Be).join('", "')+'"');U=t.lineBreakScheme}if(t.lineBreak&&(i=t.lineBreak),U&&(o=Be[U])&&(d=o[0],j=o[1]),i){if(i instanceof Array&&(i.length===1?i=i[0]:i.length>=2&&(i[0]instanceof RegExp?(d=i[0],typeof i[1]=="string"&&(j=i[1])):i[1]instanceof RegExp?(d=i[1],typeof i[0]=="string"&&(j=i[0])):typeof i[0]=="string"&&typeof i[1]=="string"?(d=new RegExp(be(i[0]),"g"),j=i[1]):i=i[0])),typeof i=="string")j=i,d||(d=new RegExp(be(i),"g"));else if(i instanceof RegExp)d=i;else if(!(i instanceof Array))throw new TypeError("lineBreak must be a RegExp object, a string, or an array consisted of a RegExp object and a string")}d||(d=/\n/g,j=`
`),B="g",d.ignoreCase&&(B+="i"),d.multiline&&(B+="m"),ee=new RegExp("\\s*(?:"+d.source+")(?:"+d.source+"|\\s)*",B),d.global||(d=new RegExp(d.source,B));var ye=re==="hard"?/\b/:/(\S+\s+)/,E=new Array(e+1).join(" "),oe=N==="default"||N==="collapse",D=N==="collapse",P=N==="line",S=N==="all",ke=/\t/g,Ie=/  +/g,ue=/^\s+/,xe=/\s+$/,Ee=/\S/,Le=/\s/,K=n-e;return function(W){var c;if(W=W.toString().replace(ke,ce),!j){if(d.lastIndex=0,!(c=d.exec(W)))throw new TypeError("Line break string for the output not specified");j=c[0]}var T,z,ie,ae,we,v,h,Q,$,C=0;for(T=[],ee.lastIndex=0,c=ee.exec(W);c;){if(T.push(W.substring(C,c.index)),I!=="none"){for(ie=[],ae=0,d.lastIndex=0,z=d.exec(c[0]);z;)ie.push(c[0].substring(ae,z.index)),ae=z.index+z[0].length,z=d.exec(c[0]);ie.push(c[0].substring(ae)),T.push({type:"break",breaks:ie})}else we=D?" ":c[0].replace(d,""),T.push({type:"break",remaining:we});C=c.index+c[0].length,c=ee.exec(W)}if(T.push(W.substring(C)),b)for($=[],v=0;v<T.length;v++){var F=T[v];if(typeof F!="string")$.push(F);else{for(C=0,b.lastIndex=0,c=b.exec(F);c;)$.push(F.substring(C,c.index)),$.push({type:"skip",value:c[0]}),C=c.index+c[0].length,c=b.exec(F);$.push(F.substring(C))}}else $=T;var V=[];for(v=0;v<$.length;v++){var X=$[v];if(typeof X!="string")V.push(X);else{D&&(X=X.replace(Ie," "));var me=X.split(ye),le=[];for(h=0;h<me.length;h++){var pe=me[h];if(re==="hard")for(Q=0;Q<pe.length;Q+=K)le.push(pe.slice(Q,Q+K));else le.push(pe)}V=V.concat(le)}}var A,f=0,l=e+_.length,p=[E+_],Y=0,g=!0,y=!0,L=fe;function G(je){var w,J,x,k=p[f];if(S)l>n&&(Y=Y||n,x=k.length-(l-Y),p[f]=k.substring(0,x)),Y=0;else{for(w=k.length-1;w>=e&&k[w]===" ";)w--;for(;w>=e&&Le.test(k[w]);)w--;++w!==k.length&&(p[f]=k.substring(0,w)),y&&g&&P&&l>n&&(x=k.length-(l-n))<w&&(x=w)}if(y&&(y=!1,te&&(w=p[f].substring(e).search(te),L=w>=0&&w+R>0?new Array(w+R+1).join(" "):"")),x){for(;x+K<k.length;)S?(J=k.substring(x,x+K),p.push(E+L+J)):p.push(E+L),x+=K,f++;if(!je)return J=k.substring(x),L+J;S?(J=k.substring(x),p.push(E+L+J)):p.push(E+L),f++}return""}for(v=0;v<V.length;v++){var s=V[v];if(s!=="")if(typeof s=="string"){for(var H;;){if(H=void 0,l+s.length>n&&l+(H=s.replace(xe,"")).length>n&&H!==""&&l>e){if(A=G(!1),p.push(E+L),f++,l=e+L.length,A){p[f]+=A,l+=A.length,g=!0;continue}!oe&&(!P||y&&g)||(s=s.replace(ue,"")),g=!1}else g&&(oe||P&&(!y||!g)?(s=s.replace(ue,""))!==""&&(g=!1):Ee.test(s)&&(g=!1));break}S&&H&&l+H.length>n&&(Y=l+H.length),p[f]+=s,l+=s.length}else if(s.type==="break")if(I!=="none"){var u=s.breaks,M=u.length-1;if(I==="s"){for(h=0;h<M;h++)u[h+1].length<Z?u[h+1]=D?" ":u[h]+u[h+1]:(S&&(p[f]+=u[h],l+=u[h].length),G(!0),p.push(E+_),f++,l=e+_.length,y=g=!0);(!g||S||P&&y)&&((D||!g&&u[M]==="")&&(u[M]=" "),p[f]+=u[M],l+=u[M].length)}else if(I==="m"&&M<Z)(!g||S||P&&y)&&(D?s=" ":(s=u.join(""),g||s!==""||(s=" ")),p[f]+=s,l+=s.length);else if(oe){for(G(!0),h=0;h<M;h++)p.push(E+_),f++;l=e+_.length,y=g=!0}else for((S||y&&g)&&(p[f]+=u[0],l+=u[0].length),h=0;h<M;h++)G(!0),p.push(E+_+u[h+1]),f++,l=e+_.length+u[h+1].length,y=g=!0}else(!g||S||P&&y)&&(s=s.remaining,(D||!g&&s==="")&&(s=" "),p[f]+=s,l+=s.length);else s.type==="skip"&&(l>n&&(A=G(!1),p.push(E+L),f++,l=e+L.length,A&&(p[f]+=A,l+=A.length),g=!0),p[f]+=s.value)}return G(!0),p.join(j)}};de.soft=de,de.hard=function(){var e=[].slice.call(arguments),n=e.length-1;return typeof e[n]=="object"?e[n].mode="hard":e.push({mode:"hard"}),de.apply(null,e)},de.wrap=function(e){var n=[].slice.call(arguments);return n.shift(),de.apply(null,n)(e)};Ae(Je.exports);Ae(new class{grayscale(e){for(let n=0;n<e.data.length;n+=4){const t=.299*e.data[n]+.587*e.data[n+1]+.114*e.data[n+2];e.data.fill(t,n,n+3)}return e}threshold(e,n){for(let t=0;t<e.data.length;t+=4){const r=.299*e.data[t]+.587*e.data[t+1]+.114*e.data[t+2]<n?0:255;e.data.fill(r,t,t+3)}return e}bayer(e,n){const t=[[15,135,45,165],[195,75,225,105],[60,180,30,150],[240,120,210,90]];for(let r=0;r<e.data.length;r+=4){const a=.299*e.data[r]+.587*e.data[r+1]+.114*e.data[r+2],m=r/4%e.width,i=Math.floor(r/4/e.width),U=Math.floor((a+t[m%4][i%4])/2)<n?0:255;e.data.fill(U,r,r+3)}return e}floydsteinberg(e){const n=e.width,t=new Uint8ClampedArray(e.width*e.height);for(let r=0,a=0;a<e.data.length;r++,a+=4)t[r]=.299*e.data[a]+.587*e.data[a+1]+.114*e.data[a+2];for(let r=0,a=0;a<e.data.length;r++,a+=4){const m=t[r]<129?0:255,i=Math.floor((t[r]-m)/16);e.data.fill(m,a,a+3),t[r+1]+=7*i,t[r+n-1]+=3*i,t[r+n]+=5*i,t[r+n+1]+=1*i}return e}atkinson(e){const n=e.width,t=new Uint8ClampedArray(e.width*e.height);for(let r=0,a=0;a<e.data.length;r++,a+=4)t[r]=.299*e.data[a]+.587*e.data[a+1]+.114*e.data[a+2];for(let r=0,a=0;a<e.data.length;r++,a+=4){const m=t[r]<129?0:255,i=Math.floor((t[r]-m)/8);e.data.fill(m,a,a+3),t[r+1]+=i,t[r+2]+=i,t[r+n-1]+=i,t[r+n]+=i,t[r+n+1]+=i,t[r+2*n]+=i}return e}});Ae(new class{flatten(e,n){for(let t=0;t<e.data.length;t+=4){const r=e.data[t+3],a=255-r;e.data[t]=(r*e.data[t]+a*n[0])/255,e.data[t+1]=(r*e.data[t+1]+a*n[1])/255,e.data[t+2]=(r*e.data[t+2]+a*n[2])/255,e.data[t+3]=255}return e}});function Me(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ke={exports:{}},De={html:{skipScheme:"html",lineBreakScheme:"html",whitespace:"collapse"}},Pe=/<\s*br(?:[\s/]*|\s[^>]*)>/gi,Re={unix:[/\n/g,`
`],dos:[/\r\n/g,`\r
`],mac:[/\r/g,"\r"],html:[Pe,"<br>"],xhtml:[Pe,"<br/>"]},Te={"ansi-color":/\x1B\[[^m]*m/g,html:/<[^>]*>/g,bbcode:/\[[^]]*\]/g},ze={soft:1,hard:1},Fe={collapse:1,default:1,line:1,all:1},$e={all:1,multi:1,none:1},Ge=/([sm])(\d+)/,Ve=/[-/\\^$*+?.()|[\]{}]/g;function ve(e){return e.replace(Ve,"\\$&")}var he=Ke.exports=function(e,n,t){typeof e=="object"&&(e=(t=e).start,n=t.stop),typeof n=="object"&&(t=n,e=e||t.start,n=void 0),n||(n=e,e=0),t||(t={});var r,a,m,i,U,Z,q,R,O,b,d,j,ee,te,ce,o,B,ne,re="soft",N="default",se=4,I="all",_="",fe="";if(r=t.preset)for(r instanceof Array||(r=[r]),ne=0;ne<r.length;ne++){if(!(o=De[r[ne]]))throw new TypeError('preset must be one of "'+Object.keys(De).join('", "')+'"');o.mode&&(re=o.mode),o.whitespace&&(N=o.whitespace),o.tabWidth!==void 0&&(se=o.tabWidth),o.skip&&(a=o.skip),o.skipScheme&&(m=o.skipScheme),o.lineBreak&&(i=o.lineBreak),o.lineBreakScheme&&(U=o.lineBreakScheme),o.respectLineBreaks&&(I=o.respectLineBreaks),o.preservedLineIndent!==void 0&&(q=o.preservedLineIndent),o.wrapLineIndent!==void 0&&(R=o.wrapLineIndent),o.wrapLineIndentBase&&(O=o.wrapLineIndentBase)}if(t.mode){if(!ze[t.mode])throw new TypeError('mode must be one of "'+Object.keys(ze).join('", "')+'"');re=t.mode}if(t.whitespace){if(!Fe[t.whitespace])throw new TypeError('whitespace must be one of "'+Object.keys(Fe).join('", "')+'"');N=t.whitespace}if(t.tabWidth!==void 0){if(!(parseInt(t.tabWidth,10)>=0))throw new TypeError("tabWidth must be a non-negative integer");se=parseInt(t.tabWidth,10)}if(ce=new Array(se+1).join(" "),t.respectLineBreaks){if(!$e[t.respectLineBreaks]&&!Ge.test(t.respectLineBreaks))throw new TypeError('respectLineBreaks must be one of "'+Object.keys($e).join('", "')+'", "m<num>", "s<num>"');I=t.respectLineBreaks}if(I==="multi")I="m",Z=2;else if(!$e[I]){var ge=Ge.exec(I);I=ge[1],Z=parseInt(ge[2],10)}if(t.preservedLineIndent!==void 0){if(!(parseInt(t.preservedLineIndent,10)>=0))throw new TypeError("preservedLineIndent must be a non-negative integer");q=parseInt(t.preservedLineIndent,10)}if(q>0&&(_=new Array(q+1).join(" ")),t.wrapLineIndent!==void 0){if(isNaN(parseInt(t.wrapLineIndent,10)))throw new TypeError("wrapLineIndent must be an integer");R=parseInt(t.wrapLineIndent,10)}if(t.wrapLineIndentBase&&(O=t.wrapLineIndentBase),O){if(R===void 0)throw new TypeError("wrapLineIndent must be specified when wrapLineIndentBase is specified");if(O instanceof RegExp)te=O;else{if(typeof O!="string")throw new TypeError("wrapLineIndentBase must be either a RegExp object or a string");te=new RegExp(ve(O))}}else if(R>0)fe=new Array(R+1).join(" ");else if(R<0)throw new TypeError("wrapLineIndent must be non-negative when a base is not specified");if(t.skipScheme){if(!Te[t.skipScheme])throw new TypeError('skipScheme must be one of "'+Object.keys(Te).join('", "')+'"');m=t.skipScheme}if(t.skip&&(a=t.skip),a)if(a instanceof RegExp)(b=a).global||(B="g",b.ignoreCase&&(B+="i"),b.multiline&&(B+="m"),b=new RegExp(b.source,B));else{if(typeof a!="string")throw new TypeError("skip must be either a RegExp object or a string");b=new RegExp(ve(a),"g")}if(!b&&m&&(b=Te[m]),t.lineBreakScheme){if(!Re[t.lineBreakScheme])throw new TypeError('lineBreakScheme must be one of "'+Object.keys(Re).join('", "')+'"');U=t.lineBreakScheme}if(t.lineBreak&&(i=t.lineBreak),U&&(o=Re[U])&&(d=o[0],j=o[1]),i){if(i instanceof Array&&(i.length===1?i=i[0]:i.length>=2&&(i[0]instanceof RegExp?(d=i[0],typeof i[1]=="string"&&(j=i[1])):i[1]instanceof RegExp?(d=i[1],typeof i[0]=="string"&&(j=i[0])):typeof i[0]=="string"&&typeof i[1]=="string"?(d=new RegExp(ve(i[0]),"g"),j=i[1]):i=i[0])),typeof i=="string")j=i,d||(d=new RegExp(ve(i),"g"));else if(i instanceof RegExp)d=i;else if(!(i instanceof Array))throw new TypeError("lineBreak must be a RegExp object, a string, or an array consisted of a RegExp object and a string")}d||(d=/\n/g,j=`
`),B="g",d.ignoreCase&&(B+="i"),d.multiline&&(B+="m"),ee=new RegExp("\\s*(?:"+d.source+")(?:"+d.source+"|\\s)*",B),d.global||(d=new RegExp(d.source,B));var ye=re==="hard"?/\b/:/(\S+\s+)/,E=new Array(e+1).join(" "),oe=N==="default"||N==="collapse",D=N==="collapse",P=N==="line",S=N==="all",ke=/\t/g,Ie=/  +/g,ue=/^\s+/,xe=/\s+$/,Ee=/\S/,Le=/\s/,K=n-e;return function(W){var c;if(W=W.toString().replace(ke,ce),!j){if(d.lastIndex=0,!(c=d.exec(W)))throw new TypeError("Line break string for the output not specified");j=c[0]}var T,z,ie,ae,we,v,h,Q,$,C=0;for(T=[],ee.lastIndex=0,c=ee.exec(W);c;){if(T.push(W.substring(C,c.index)),I!=="none"){for(ie=[],ae=0,d.lastIndex=0,z=d.exec(c[0]);z;)ie.push(c[0].substring(ae,z.index)),ae=z.index+z[0].length,z=d.exec(c[0]);ie.push(c[0].substring(ae)),T.push({type:"break",breaks:ie})}else we=D?" ":c[0].replace(d,""),T.push({type:"break",remaining:we});C=c.index+c[0].length,c=ee.exec(W)}if(T.push(W.substring(C)),b)for($=[],v=0;v<T.length;v++){var F=T[v];if(typeof F!="string")$.push(F);else{for(C=0,b.lastIndex=0,c=b.exec(F);c;)$.push(F.substring(C,c.index)),$.push({type:"skip",value:c[0]}),C=c.index+c[0].length,c=b.exec(F);$.push(F.substring(C))}}else $=T;var V=[];for(v=0;v<$.length;v++){var X=$[v];if(typeof X!="string")V.push(X);else{D&&(X=X.replace(Ie," "));var me=X.split(ye),le=[];for(h=0;h<me.length;h++){var pe=me[h];if(re==="hard")for(Q=0;Q<pe.length;Q+=K)le.push(pe.slice(Q,Q+K));else le.push(pe)}V=V.concat(le)}}var A,f=0,l=e+_.length,p=[E+_],Y=0,g=!0,y=!0,L=fe;function G(je){var w,J,x,k=p[f];if(S)l>n&&(Y=Y||n,x=k.length-(l-Y),p[f]=k.substring(0,x)),Y=0;else{for(w=k.length-1;w>=e&&k[w]===" ";)w--;for(;w>=e&&Le.test(k[w]);)w--;++w!==k.length&&(p[f]=k.substring(0,w)),y&&g&&P&&l>n&&(x=k.length-(l-n))<w&&(x=w)}if(y&&(y=!1,te&&(w=p[f].substring(e).search(te),L=w>=0&&w+R>0?new Array(w+R+1).join(" "):"")),x){for(;x+K<k.length;)S?(J=k.substring(x,x+K),p.push(E+L+J)):p.push(E+L),x+=K,f++;if(!je)return J=k.substring(x),L+J;S?(J=k.substring(x),p.push(E+L+J)):p.push(E+L),f++}return""}for(v=0;v<V.length;v++){var s=V[v];if(s!=="")if(typeof s=="string"){for(var H;;){if(H=void 0,l+s.length>n&&l+(H=s.replace(xe,"")).length>n&&H!==""&&l>e){if(A=G(!1),p.push(E+L),f++,l=e+L.length,A){p[f]+=A,l+=A.length,g=!0;continue}!oe&&(!P||y&&g)||(s=s.replace(ue,"")),g=!1}else g&&(oe||P&&(!y||!g)?(s=s.replace(ue,""))!==""&&(g=!1):Ee.test(s)&&(g=!1));break}S&&H&&l+H.length>n&&(Y=l+H.length),p[f]+=s,l+=s.length}else if(s.type==="break")if(I!=="none"){var u=s.breaks,M=u.length-1;if(I==="s"){for(h=0;h<M;h++)u[h+1].length<Z?u[h+1]=D?" ":u[h]+u[h+1]:(S&&(p[f]+=u[h],l+=u[h].length),G(!0),p.push(E+_),f++,l=e+_.length,y=g=!0);(!g||S||P&&y)&&((D||!g&&u[M]==="")&&(u[M]=" "),p[f]+=u[M],l+=u[M].length)}else if(I==="m"&&M<Z)(!g||S||P&&y)&&(D?s=" ":(s=u.join(""),g||s!==""||(s=" ")),p[f]+=s,l+=s.length);else if(oe){for(G(!0),h=0;h<M;h++)p.push(E+_),f++;l=e+_.length,y=g=!0}else for((S||y&&g)&&(p[f]+=u[0],l+=u[0].length),h=0;h<M;h++)G(!0),p.push(E+_+u[h+1]),f++,l=e+_.length+u[h+1].length,y=g=!0}else(!g||S||P&&y)&&(s=s.remaining,(D||!g&&s==="")&&(s=" "),p[f]+=s,l+=s.length);else s.type==="skip"&&(l>n&&(A=G(!1),p.push(E+L),f++,l=e+L.length,A&&(p[f]+=A,l+=A.length),g=!0),p[f]+=s.value)}return G(!0),p.join(j)}};he.soft=he,he.hard=function(){var e=[].slice.call(arguments),n=e.length-1;return typeof e[n]=="object"?e[n].mode="hard":e.push({mode:"hard"}),he.apply(null,e)},he.wrap=function(e){var n=[].slice.call(arguments);return n.shift(),he.apply(null,n)(e)};Me(Ke.exports);Me(new class{grayscale(e){for(let n=0;n<e.data.length;n+=4){const t=.299*e.data[n]+.587*e.data[n+1]+.114*e.data[n+2];e.data.fill(t,n,n+3)}return e}threshold(e,n){for(let t=0;t<e.data.length;t+=4){const r=.299*e.data[t]+.587*e.data[t+1]+.114*e.data[t+2]<n?0:255;e.data.fill(r,t,t+3)}return e}bayer(e,n){const t=[[15,135,45,165],[195,75,225,105],[60,180,30,150],[240,120,210,90]];for(let r=0;r<e.data.length;r+=4){const a=.299*e.data[r]+.587*e.data[r+1]+.114*e.data[r+2],m=r/4%e.width,i=Math.floor(r/4/e.width),U=Math.floor((a+t[m%4][i%4])/2)<n?0:255;e.data.fill(U,r,r+3)}return e}floydsteinberg(e){const n=e.width,t=new Uint8ClampedArray(e.width*e.height);for(let r=0,a=0;a<e.data.length;r++,a+=4)t[r]=.299*e.data[a]+.587*e.data[a+1]+.114*e.data[a+2];for(let r=0,a=0;a<e.data.length;r++,a+=4){const m=t[r]<129?0:255,i=Math.floor((t[r]-m)/16);e.data.fill(m,a,a+3),t[r+1]+=7*i,t[r+n-1]+=3*i,t[r+n]+=5*i,t[r+n+1]+=1*i}return e}atkinson(e){const n=e.width,t=new Uint8ClampedArray(e.width*e.height);for(let r=0,a=0;a<e.data.length;r++,a+=4)t[r]=.299*e.data[a]+.587*e.data[a+1]+.114*e.data[a+2];for(let r=0,a=0;a<e.data.length;r++,a+=4){const m=t[r]<129?0:255,i=Math.floor((t[r]-m)/8);e.data.fill(m,a,a+3),t[r+1]+=i,t[r+2]+=i,t[r+n-1]+=i,t[r+n]+=i,t[r+n+1]+=i,t[r+2*n]+=i}return e}});Me(new class{flatten(e,n){for(let t=0;t<e.data.length;t+=4){const r=e.data[t+3],a=255-r;e.data[t]=(r*e.data[t]+a*n[0])/255,e.data[t+1]=(r*e.data[t+1]+a*n[1])/255,e.data[t+2]=(r*e.data[t+2]+a*n[2])/255,e.data[t+3]=255}return e}});class Xe{constructor(n){this._events={}}on(n,t){this._events[n]=this._events[n]||[],this._events[n].push(t)}emit(n,...t){let r=this._events[n];r&&r.forEach(a=>{a(...t)})}}const He=[{filters:[{vendorId:1046,productId:20497}],configuration:1,interface:0,endpoint:3,language:"esc-pos",codepageMapping:"zjiang"},{filters:[{vendorId:1049}],configuration:1,interface:0,endpoint:1,language:"esc-pos",codepageMapping:"bixolon"},{filters:[{vendorId:1305}],configuration:1,interface:0,language:"star-prnt",codepageMapping:"star"},{filters:[{vendorId:1208}],configuration:1,interface:0,endpoint:1,language:"esc-pos",codepageMapping:"epson"},{filters:[{vendorId:7568}],configuration:1,interface:0,endpoint:2,language:"esc-pos",codepageMapping:"citizen"},{filters:[{vendorId:4070,productId:33054}],configuration:1,interface:0,endpoint:2,language:"esc-pos",codepageMapping:"epson"}];class Ye{constructor(){this._internal={emitter:new Xe,device:null,profile:null},navigator.usb.addEventListener("disconnect",n=>{this._internal.device==n.device&&this._internal.emitter.emit("disconnected")})}async connect(){try{let n=await navigator.usb.requestDevice({filters:He.map(t=>t.filters).reduce((t,r)=>t.concat(r))});n&&await this.open(n)}catch(n){console.log("Could not connect! "+n)}}async reconnect(n){let t=await navigator.usb.getDevices(),r=t.find(a=>a.serialNumber==n.serialNumber);r||(r=t.find(a=>a.vendorId==n.vendorId&&a.productId==n.productId)),r&&await this.open(r)}async open(n){this._internal.device=n,this._internal.profile=He.find(t=>t.filters.some(r=>r.vendorId&&r.productId?r.vendorId==this._internal.device.vendorId&&r.productId==this._internal.device.productId:r.vendorId==this._internal.device.vendorId)),await this._internal.device.open(),await this._internal.device.selectConfiguration(this._internal.profile.configuration),await this._internal.device.claimInterface(this._internal.profile.interface),this._internal.emitter.emit("connected",{type:"usb",manufacturerName:this._internal.device.manufacturerName,productName:this._internal.device.productName,serialNumber:this._internal.device.serialNumber,vendorId:this._internal.device.vendorId,productId:this._internal.device.productId,language:this._internal.profile.language,codepageMapping:this._internal.profile.codepageMapping})}async disconnect(){this._internal.device&&(await this._internal.device.close(),this._internal.device=null,this._internal.profile=null,this._internal.emitter.emit("disconnected"))}async print(n){let t=this._internal.profile.endpoint;if(!t){let r=this._internal.device.configuration.interfaces.find(a=>a.interfaceNumber==this._internal.profile.interface).alternate.endpoints.find(a=>a.direction=="out");r&&(t=r.endpointNumber)}if(t)try{await this._internal.device.transferOut(t,n)}catch(r){console.log(r)}}addEventListener(n,t){this._internal.emitter.on(n,t)}}export{Ye as i};

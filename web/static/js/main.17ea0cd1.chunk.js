(this.webpackJsonplang_json_editor=this.webpackJsonplang_json_editor||[]).push([[0],{34:function(e,n,t){},5:function(e,n){var t={ADD:"ADD",CHANGE_VALUE:"CHANGE_VALUE",REMOVE:"REMOVE",OPEN:"OPEN",DATA_UPDATE:"DATA_UPDATE",SOURCE_MATCHES_UPDATE:"SOURCE_MATCHES_UPDATE"},c={add:function(e,n,c){return{action:t.ADD,parentId:e,type:n,label:c}},changeValue:function(e,n,c){return{action:t.CHANGE_VALUE,id:e,language:n,value:c}},remove:function(e){return{action:t.REMOVE,id:e}},open:function(e,n,c){return{action:t.OPEN,file:e,line:n,column:c}},dataUpdate:function(e){return{action:t.DATA_UPDATE,data:e}},sourceMatchesUpdate:function(e){return{action:t.SOURCE_MATCHES_UPDATE,data:e}}};e.exports={NodeType:{OBJECT:"OBJECT",VALUE:"VALUE"},ActionType:t,Action:c,MatchType:{EXACT:"exact",PARTIAL:"partial"}}},65:function(e,n,t){"use strict";t.r(n);var c,a=t(1),i=t.n(a),o=t(25),r=t.n(o),l=(t(34),t(2)),s=t(4),u=t(18),d=t(3),b=t(0);function f(){var e=Object(a.useMemo)((function(){return(new Date).getFullYear()}),[]);return Object(b.jsx)(j,{children:"\xa9 Pavel Zarecky, ".concat(e)})}var j=d.a.div(c||(c=Object(l.a)(["\n  padding-right: 15px;\n  text-align: end;\n"]))),p=t(6),O=t.n(p),h=t(5),g=t(12),v="NO_PROBLEM",m={MISSING:"MISSING",EMPTY:"EMPTY",DEFAULT:"DEFAULT",SAME:"SAME",PLACEHOLDER_MISMATCH:"PLACEHOLDER_MISMATCH",NO_MATCH_IN_SOURCES:"NO_MATCH_IN_SOURCES",PARTIAL_MATCH_IN_SOURCES:"PARTIAL_MATCH_IN_SOURCES"};function x(e){var n=null===e||void 0===e?void 0:e.match(/{{\w+}}/g);return n?Array.from(new Set(n.map((function(e){return e.substring(2,e.length-2)})))).sort():[]}function E(e,n,t,c){switch(e.type){case h.NodeType.VALUE:e.exactSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id,c=n.type;return t===e.id&&c===h.MatchType.EXACT})))||[],e.partialSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id;return e.id.startsWith("".concat(t,"."))||e.id.startsWith("".concat(t,"_plural"))})))||[],n.some((function(n){return void 0===e.values[n]||null===e.values[n]}))?c(e.id,m.MISSING):n.some((function(n){return!e.values[n].trim()}))&&c(e.id,m.EMPTY);var a=e.exactSourceMatches.length,i=e.partialSourceMatches.length;a||c(e.id,i?m.PARTIAL_MATCH_IN_SOURCES:m.NO_MATCH_IN_SOURCES),Object.values(e.values).sort().some((function(e,n,t){return n&&e===t[n-1]}))&&c(e.id,m.SAME),n.some((function(n){return e.values[n]===e.id}))&&c(e.id,m.DEFAULT),Object.values(e.values).map(x).some((function(e,n,t){return n&&!Object(g.isEqual)(e,t[n-1])}))&&c(e.id,m.PLACEHOLDER_MISMATCH);break;case h.NodeType.OBJECT:if(!e.children.length)return c(e.id,m.EMPTY);e.children.forEach((function(e){return E(e,n,t,c)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function S(e,n,t){var c=[];return E(e,n,t,(function(e,n){c.push({id:e,problem:n})})),c}function C(e,n,t,c){function a(e){return t?null===e||void 0===e?void 0:e.includes(n):null===e||void 0===e?void 0:e.toLowerCase().includes(n.toLowerCase())}switch(e.type){case h.NodeType.VALUE:(a(e.id)||Object.values(e.values).some(a))&&c(e.id);break;case h.NodeType.OBJECT:!e.children.length&&a(e.id)&&c(e.id),e.children.forEach((function(e){return C(e,n,t,c)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function A(e,n,t){var c=[];return C(e,n,t,(function(e){c.push(e)})),c}function y(e,n){switch(e.type){case h.NodeType.VALUE:n(e.id);break;case h.NodeType.OBJECT:e.children.length||n(e.id),e.children.forEach((function(e){return y(e,n)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function T(e){var n=[];return y(e,(function(e){n.push(e)})),n}var M,k,w,_=i.a.createContext({}),N=t(14),I=t.n(N),R=t.p+"static/media/add.d8693632.svg",U=t.p+"static/media/edit.962e7af9.svg",P=t.p+"static/media/confirm.0addefb3.svg",L=t.p+"static/media/cancel.caea72e4.svg",D=t.p+"static/media/trash.85c719f0.svg",H=t.p+"static/media/copy.2327b577.svg",F=t.p+"static/media/code.33554129.svg",V=t.p+"static/media/section.774f12f9.svg",G=t.p+"static/media/value.cddb19bc.svg",B=t.p+"static/media/vscode.ea98ae01.svg",J=t.p+"static/media/google-translate.0346cfbe.svg",Y=d.a.span(M||(M=Object(l.a)(["\n  cursor: pointer;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  min-width: 1em;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: 1;\n    font-weight: bold;\n  }\n\n  &:hover > * {\n    transform: scale(1.5, 1.5);\n  }\n"]))),z=t(29);function W(e){var n=e.operation,t=e.buttons,c=e.visible,a=void 0===c||c,i=e.copyString,o={opacity:a?1:0};return Object(b.jsxs)(Z,{style:o,children:[n?Object(b.jsx)($,{children:Object(b.jsx)("img",{src:n.image,width:"16",alt:n.name})}):null,t.map((function(e){return e?Object(b.jsx)(Y,{onClick:function(n){e.callback(),n.stopPropagation()},title:e.name,children:Object(b.jsx)("img",{src:e.image,width:"12",alt:e.name})},e.name):null})),i?Object(b.jsx)(z.CopyToClipboard,{text:i,title:'copy "'.concat(i,'"'),children:Object(b.jsx)(Y,{children:Object(b.jsx)("img",{src:H,width:"12",alt:"copy ".concat(i)})})}):null]})}function X(e){var n=e.visible,t=e.onAdd,c=e.onRemove,a=e.onEdit,i=e.onSources,o=e.copyString;return Object(b.jsx)(W,{visible:n,buttons:[t&&{name:"add",image:R,callback:t},c&&{name:"remove",image:D,callback:c},a&&{name:"edit",image:U,callback:a},i&&{name:"show in sources",image:F,callback:i}],copyString:o})}function q(e){var n=e.onConfirm,t=e.onCancel,c=e.editMode,a=c?"edit":"remove";return Object(b.jsx)(W,{operation:{name:a,image:c?U:D},buttons:[{name:"confirm ".concat(a),image:P,callback:n},{name:"cancel ".concat(a),image:L,callback:t}]})}function K(e){var n=e.onObject,t=e.onValue,c=e.onCancel;return Object(b.jsx)(W,{operation:{name:"add",image:R},buttons:[{name:"section",image:V,callback:n},{name:"value",image:G,callback:t},{name:"cancel",image:L,callback:c}]})}var Z=d.a.div(k||(k=Object(l.a)(["\n  cursor: default;\n"]))),$=d.a.span(w||(w=Object(l.a)(["\n  font-size: 10px;\n  opacity: 0.8;\n"]))),Q=function(e){Object(a.useEffect)((function(){if(e){var n=function(n){27===n.keyCode&&e()};return window.addEventListener("keydown",n),function(){window.removeEventListener("keydown",n)}}}),[e])},ee="REMOVE_MODE",ne="EDIT_MODE",te="ADD_MODE",ce=function(e){var n=e.editing,t=e.visible,c=e.onAdd,i=e.onRemove,o=e.onConfirmEdit,r=e.onCancelEdit,l=e.onBeginEdit,u=e.onSources,d=e.copyString,f=Object(a.useState)(n?ne:void 0),j=Object(s.a)(f,2),p=j[0],O=j[1];Object(a.useEffect)((function(){O(n?ne:void 0)}),[n]);var g=function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),c=1;c<n;c++)t[c-1]=arguments[c];return function(){O(void 0),null===e||void 0===e||e.apply(void 0,t)}};switch(Q(p&&g(p===ne?r:void 0)),p){case te:return Object(b.jsx)(K,{onObject:g(c,h.NodeType.OBJECT),onValue:g(c,h.NodeType.VALUE),onCancel:g()});case ee:case ne:return Object(b.jsx)(q,{editMode:p===ne,onConfirm:g(p===ne?o:i),onCancel:g(p===ne?r:void 0)});default:return Object(b.jsx)(X,{visible:t,copyString:d,onAdd:c&&function(){return O(te)},onRemove:i&&function(){return O(ee)},onEdit:o&&function(){O(ne),null===l||void 0===l||l()},onSources:u})}};ce.defaultProps={onBeginEdit:function(){}};var ae,ie,oe,re,le,se,ue,de=ce,be=t(13),fe=t(9);function je(e){var n=e.text,t=e.fromLanguage,c=e.toLanguage,a="Open on GoogleTranslate";return Object(b.jsx)("a",{href:"https://translate.google.com/?sl=".concat(encodeURIComponent(t),"&tl=").concat(encodeURIComponent(c),"&text=").concat(encodeURIComponent(n)),target:"_blank",rel:"noreferrer",children:Object(b.jsx)(Y,{title:a,children:Object(b.jsx)("img",{src:J,width:"12",alt:a})})})}function pe(e){var n,t=e.id,c=e.file,i=e.line,o=e.contextStartLine,r=e.context,l=e.type,s=Object(a.useContext)(_).onOpen,u=null===(n=r[i-o])||void 0===n?void 0:n.indexOf(t);return u=-1===u?void 0:u,Object(b.jsxs)(Ce,{type:l,children:[Object(b.jsx)(Ae,{children:Object(b.jsxs)(ye,{title:"Open in VSCode",onClick:function(){return s(c,i,u?u+1:void 0)},children:[Object(b.jsx)(Te,{children:c}),":",i]})}),r.map((function(e,n){var c=i===n+o,a=Object(b.jsx)(we,{children:e});return c&&void 0!==u&&(a=Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(we,{children:e.substring(0,u)}),Object(b.jsx)(we,{highlighted:!0,children:t}),Object(b.jsx)(we,{children:e.substring(u+t.length)})]})),Object(b.jsxs)(Me,{highlighted:c,type:l,children:[Object(b.jsx)(ke,{highlighted:c,children:n+o}),a]},n)}))]})}var Oe,he,ge,ve,me,xe,Ee,Se,Ce=d.a.div(ae||(ae=Object(l.a)(["\n  border: 0.5px solid black;\n  border-color: ",";\n  font-family: monospace, monospace;\n"])),(function(e){return e.type===h.MatchType.EXACT?"black":"darkseagreen"})),Ae=d.a.div(ie||(ie=Object(l.a)(["\n  background-color: lightgrey;\n  padding: 0 8px;\n"]))),ye=d.a.span(oe||(oe=Object(l.a)(["\n  &:hover {\n    text-decoration: underline;\n    cursor: pointer;\n    :after {\n      padding-left: 4px;\n      content: url(",");\n    }\n  }\n"])),B),Te=d.a.span(re||(re=Object(l.a)(["\n  font-weight: bold;\n"]))),Me=d.a.div(le||(le=Object(l.a)(["\n  background-color: ",";\n  margin: 0 8px;\n"])),(function(e){var n=e.highlighted,t=e.type;return n?t===h.MatchType.EXACT?"lightgreen":"darkseagreen":"transparent"})),ke=d.a.span(se||(se=Object(l.a)(["\n  color: ",";\n  margin: 0 8px;\n  user-select: none;\n"])),(function(e){return e.highlighted?"black":"lightgrey"})),we=d.a.pre(ue||(ue=Object(l.a)(["\n  display: inline;\n  margin: 0;\n  font-weight: ",";\n"])),(function(e){return e.highlighted?"bold":"normal"}));function _e(e){var n=e.language,t=e.editing,c=e.value,i=e.onChange,o=e.onEdit,r=e.issues,l=e.hintForTranslation,u=Object(a.useState)(!1),d=Object(s.a)(u,2),f=d[0],j=d[1],p=Object(a.useState)(!1),O=Object(s.a)(p,2),h=O[0],g=O[1],v=Object(a.useState)(),m=Object(s.a)(v,2),x=m[0],E=m[1];Object(a.useEffect)((function(){t||(j(!1),g(!1))}),[t]);var S=Object(a.useCallback)((function(){return o(!1)}),[o]),C=Object(a.useCallback)((function(e){i(e.target.value),j(!1)}),[i]);return Q(t&&S),Object(b.jsxs)(Je,{value:c,children:[Object(b.jsx)(Ge,{children:n}),t?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(ze,{style:x,onFocus:function(){return g(!0)},autoFocus:f,value:c||"",onChange:C,ref:function(e){e&&f&&e.select()}}),h&&l?Object(b.jsx)(je,{text:l.value,fromLanguage:l.language,toLanguage:n}):null]}):Object(b.jsx)(Ye,{value:c,problems:r.map((function(e){return e.problem})),title:r.length?r.map((function(e){return e.hint})).join("\n"):void 0,onDoubleClick:function(){j(!0),o(!0)},ref:function(e){if(e){var n=e.offsetWidth,t=e.offsetHeight;(null===x||void 0===x?void 0:x.width)===n&&(null===x||void 0===x?void 0:x.height)===t||E({width:n,height:t})}},children:(null===c||void 0===c?void 0:c.trim())?c:null===c||void 0===c?"<missing>":'"'.concat(c,'"')})]})}function Ne(e){var n,t,c,i,o=e.node,r=Object(a.useState)(!1),l=Object(s.a)(r,2),u=l[0],d=l[1],f=Object(a.useState)(!1),j=Object(s.a)(f,2),p=j[0],O=j[1],h=Object(a.useState)(!1),v=Object(s.a)(h,2),E=v[0],S=v[1],C=Object(a.useState)(o.values),A=Object(s.a)(C,2),y=A[0],T=A[1],M=Object(a.useContext)(_),k=M.languages,w=M.onChangeValue,N=M.onRemove,R=M.problematicTranslations,U=M.disabled;Q(p&&function(){return O(!1)});var P=Object(a.useCallback)((function(){T(o.values),S(!1)}),[o]);Object(a.useEffect)((function(){U&&P()}),[U,P]);var L=(null===R||void 0===R?void 0:R.filter((function(e){return e.id===o.id})).map((function(e){return e.problem})))||[],D=[];L.includes(m.NO_MATCH_IN_SOURCES)&&D.push("\u26a0 No match found in the sources"),L.includes(m.PARTIAL_MATCH_IN_SOURCES)&&D.push("\u26a0 Partial match in sourcefiles");var H=(null===(n=o.exactSourceMatches)||void 0===n?void 0:n.length)||(null===(t=o.partialSourceMatches)||void 0===t?void 0:t.length);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(He,{onMouseEnter:function(){return d(!0)},onMouseLeave:function(){return d(!1)},children:[Object(b.jsx)(Fe,{title:D.length?"".concat(o.id,"\n").concat(D.join("\n")):o.id,problems:L,children:o.name}),Object(b.jsx)(Ve,{children:k.map((function(e){var n=y[e],t=[];if(!L.includes(m.MISSING)||void 0!==n&&null!==n?L.includes(m.EMPTY)&&!(null===n||void 0===n?void 0:n.trim())&&t.push({problem:m.EMPTY,hint:"\u26a0 Potential issue: Empty value"}):t.push({problem:m.MISSING,hint:"\u26a0 issue: Missing value"}),L.includes(m.DEFAULT)&&n===o.id&&t.push({problem:m.DEFAULT,hint:'\u26a0 Potential issue: Default value used "'.concat(n,'"')}),L.includes(m.SAME)){var c=Object.keys(y).find((function(t){return t!==e&&y[t]===n}));c&&t.push({problem:m.SAME,hint:'\u26a0 Potential issue: The same as the "'.concat(c,'" version')})}if(L.includes(m.PLACEHOLDER_MISMATCH)){var a=Object.keys(y).find((function(t){return t!==e&&!Object(g.isEqual)(x(y[t]),x(n))}));a&&t.push({problem:m.PLACEHOLDER_MISMATCH,hint:'\u26a0 Potential issue: Different placeholders from the "'.concat(a,'" version')})}var i=Object.keys(y).find((function(n){return n!==e&&y[n]}));return Object(b.jsx)(_e,{language:e,editing:E,issues:t,value:n,hintForTranslation:i&&{language:i,value:y[i]},onChange:function(n){return T(Object(fe.a)(Object(fe.a)({},y),{},Object(be.a)({},e,n)))},onEdit:function(e){S(!U&&e),e||T(o.values)}},e)}))}),Object(b.jsx)(de,{visible:u||p,editing:E,onBeginEdit:!U&&function(){return S(!0)},onConfirmEdit:!U&&function(){k.forEach((function(e){var n=y[e];n!==o.values[e]&&w(o.id,e,n)})),S(!1)},onCancelEdit:!U&&P,onRemove:!U&&function(){N(o.id)},onSources:H?function(){return O((function(e){return!e}))}:void 0,copyString:o.id})]}),Object(b.jsx)(Be,{children:Object(b.jsxs)(I.a,{expanded:p,children:[null===(c=o.exactSourceMatches)||void 0===c?void 0:c.map((function(e,n){return Object(b.jsx)(pe,Object(fe.a)({},e),"exact-".concat(n))})),null===(i=o.partialSourceMatches)||void 0===i?void 0:i.map((function(e,n){return Object(b.jsx)(pe,Object(fe.a)({},e),"partial-".concat(n))}))]})})]})}var Ie,Re,Ue,Pe,Le,De,He=d.a.div(Oe||(Oe=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 2px;\n"]))),Fe=d.a.div(he||(he=Object(l.a)(["\n  cursor: default;\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px 0 0 4px;\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n"])),(function(e){var n=e.problems;return n.includes(m.MISSING)?"salmon":n.includes(m.EMPTY)||n.includes(m.DEFAULT)?"moccasin":n.includes(m.NO_MATCH_IN_SOURCES)?"lightgray":n.includes(m.PARTIAL_MATCH_IN_SOURCES)?"darkseagreen":n.length?"lightcyan":"lightgreen"})),Ve=d.a.div(ge||(ge=Object(l.a)([""]))),Ge=d.a.span(ve||(ve=Object(l.a)(["\n  cursor: default;\n  padding: 0 8px;\n  color: white;\n  background-color: black;\n"]))),Be=d.a.div(me||(me=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),Je=d.a.div(xe||(xe=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  font-family: monospace, monospace;\n"]))),Ye=d.a.div(Ee||(Ee=Object(l.a)(["\n  padding: 0 8px;\n  border: 0.5px solid black;\n  ","\n"])),(function(e){var n=e.problems;return n.includes(m.MISSING)?"background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;":n.includes(m.EMPTY)?"background-color: orange;":n.length?"background-color: lightcyan;":""})),ze=d.a.textarea(Se||(Se=Object(l.a)(["\n  font-size: 16px;\n"])));function We(e){var n=e.node,t=Object(a.useState)(!n.id),c=Object(s.a)(t,2),i=c[0],o=c[1],r=Object(a.useState)(!1),l=Object(s.a)(r,2),u=l[0],d=l[1],f=Object(a.useState)(),j=Object(s.a)(f,2),p=j[0],O=j[1],g=Object(a.useState)(""),v=Object(s.a)(g,2),x=v[0],E=v[1],S=Object(a.useContext)(_),C=S.onAdd,A=S.onRemove,y=S.problematicTranslations,T=S.filteredIds,M=S.disabled,k=S.collapseAll,w=S.onCollapseChange,N=Object(a.useCallback)((function(){O(void 0),E("")}),[]);Object(a.useEffect)((function(){i&&!M||N()}),[M,i,N]),Object(a.useEffect)((function(){void 0!==k&&o(!k)}),[k]),Q(p&&N);var R=y.filter((function(e){var t=e.id;return t===n.id||t.startsWith("".concat(n.id,"."))})).map((function(e){return e.problem})),U=R.includes(m.MISSING)?m.MISSING:R.includes(m.EMPTY)?m.EMPTY:R.includes(m.NO_MATCH_IN_SOURCES)?m.NO_MATCH_IN_SOURCES:R.includes(m.DEFAULT)?m.DEFAULT:R.includes(m.SAME)?m.SAME:void 0,D=x&&/^\w+$/.test(x)&&!n.children.some((function(e){return e.name===x})),H=D?function(){C(n.id,p,x),N()}:void 0,F=Object(a.useCallback)((function(){w(),o((function(e){return!e}))}),[w]),V=Object(a.useCallback)((function(){return d(!0)}),[]),G=Object(a.useCallback)((function(){return d(!1)}),[]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(cn,{onClick:F,onMouseEnter:V,onMouseLeave:G,children:[Object(b.jsxs)(on,{id:n.id,problem:U,expanded:i,title:n.id,children:[Object(b.jsx)(an,{children:i?"-":"+"}),n.name]}),i?!p&&!M&&Object(b.jsx)(de,{visible:u,onAdd:function(e){return O(e)},onRemove:n.id&&function(){return A(n.id)}}):Object(b.jsx)(rn,{children:"{} ".concat(n.children.length," item").concat(1===n.children.length?"":"s")})]}),p?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(sn,{type:"text",autoFocus:!0,placeholder:p===h.NodeType.OBJECT?"new section":"new value",onChange:function(e){return E(e.target.value.trim())},onKeyPress:function(e){return"Enter"===e.key&&(null===H||void 0===H?void 0:H())}}),D?Object(b.jsx)(Y,{onClick:H,children:Object(b.jsx)("img",{src:P,width:"16",alt:"confirm"})}):null,Object(b.jsx)(Y,{onClick:N,children:Object(b.jsx)("img",{src:L,width:"16",alt:"cancel"})})]}):null,Object(b.jsx)(ln,{children:Object(b.jsx)(I.a,{expanded:i,children:n.children.map((function(e){return T&&!T.some((function(n){return n===e.id||n.startsWith("".concat(e.id,"."))}))?null:e.type===h.NodeType.OBJECT?Object(b.jsx)(We,{node:e},e.id):Object(b.jsx)(Ne,{node:e},e.id)}))})})]})}var Xe,qe,Ke,Ze,$e,Qe,en,nn,tn,cn=d.a.div(Ie||(Ie=Object(l.a)(["\n  cursor: default;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n"]))),an=d.a.span(Re||(Re=Object(l.a)(["\n  min-width: 10px;\n  margin-right: 2px;\n"]))),on=d.a.span(Ue||(Ue=Object(l.a)(["\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px;\n\n  &:hover {\n    font-weight: bold;\n  }\n"])),(function(e){var n=e.id,t=e.problem,c=e.expanded;if(!n)return"white";switch(t){case m.MISSING:return c?"pink":"salmon";case m.EMPTY:case m.DEFAULT:return c?"white":"moccasin";case m.SAME:return c?"white":"lightcyan";case m.NO_MATCH_IN_SOURCES:return c?"white":"lightgrey";default:return c?"mintcream":"lightgreen"}})),rn=d.a.span(Pe||(Pe=Object(l.a)(["\n  color: grey;\n  margin: 0 8px;\n"]))),ln=d.a.div(Le||(Le=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),sn=d.a.input(De||(De=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 20px;\n  margin-bottom: 4px;\n"])));function un(e){var n=e.data,t=e.sourceMatches,c=e.filter,i=c.text,o=c.caseSensitive,r=c.problems,l=e.onSendMessage,u=e.disabled,d=e.collapseAll,f=e.onCollapseChange,j=Object(a.useState)(n),p=Object(s.a)(j,2),O=p[0],g=p[1];Object(a.useEffect)((function(){g(n)}),[n]);var m=Object(a.useState)([]),x=Object(s.a)(m,2),E=x[0],C=x[1];Object(a.useEffect)((function(){var e;(null===O||void 0===O||null===(e=O.languages)||void 0===e?void 0:e.length)&&C(S(O.content,O.languages,t))}),[t,O]);var y=Object(a.useState)(),M=Object(s.a)(y,2),k=M[0],w=M[1];Object(a.useEffect)((function(){O&&i?w(A(O.content,i,o)):w()}),[o,i,O]);var N=k;if(O&&(null===r||void 0===r?void 0:r.length)){var I=k||T(O.content),R=E.reduce((function(e,n){var t=n.id,c=n.problem;return e[t]?e[t].push(c):e[t]=[c],e}),{});N=I.filter((function(e){var n;return r.includes(v)&&!R[e]||(null===(n=R[e])||void 0===n?void 0:n.some((function(e){return r.includes(e)})))}))}return Object(b.jsx)(_.Provider,{value:{collapseAll:d,onCollapseChange:f,disabled:u,filteredIds:N,problematicTranslations:E,languages:null===O||void 0===O?void 0:O.languages,onAdd:function(e,n,t){return l(h.Action.add(e,n,t))},onChangeValue:function(e,n,t){return l(h.Action.changeValue(e,n,t))},onRemove:function(e){return l(h.Action.remove(e))},onOpen:function(e,n,t){return l(h.Action.open(e,n,t))}},children:O?Object(b.jsx)(We,{node:O.content}):null})}var dn=[v].concat(Object(u.a)(Object.values(m)));function bn(){var e=function(){var e=new URL(window.location.href),n=e.searchParams.get("serverPort")||e.port;return"".concat(e.hostname,":").concat(n)}(),n=Object(a.useState)(),t=Object(s.a)(n,2),c=t[0],i=t[1],o=Object(a.useState)(!1),r=Object(s.a)(o,2),l=r[0],d=r[1],j=Object(a.useState)(""),g=Object(s.a)(j,2),v=g[0],m=g[1],x=Object(a.useState)(!1),E=Object(s.a)(x,2),S=E[0],C=E[1],A=Object(a.useState)([]),y=Object(s.a)(A,2),T=y[0],M=y[1],k=Object(a.useState)(),w=Object(s.a)(k,2),_=w[0],N=w[1],I=Object(a.useState)(),R=Object(s.a)(I,2),U=R[0],P=R[1],L=Object(a.useCallback)((function(e){switch(e.action){case h.ActionType.DATA_UPDATE:P(e.data);break;case h.ActionType.SOURCE_MATCHES_UPDATE:N(e.data);break;default:console.error("Invalid action:",e.action)}}),[]),D=O()("ws://".concat(e),{retryOnError:!0,shouldReconnect:function(){return!0},reconnectAttempts:100,onMessage:function(e){return L(JSON.parse(e.data))}}),H=D.sendMessage,F=D.readyState,V=Object(a.useCallback)((function(){switch(F){case p.ReadyState.OPEN:return"Connected";case p.ReadyState.CONNECTING:return"Connecting";case p.ReadyState.CLOSED:return"Server not reachable";default:return"Unknown"}}),[F]),G=Object(a.useCallback)((function(e){H(JSON.stringify(e))}),[H]),B=Object(a.useCallback)((function(){return i()}),[]);return Object(a.useEffect)((function(){F===p.ReadyState.OPEN&&fetch("http://".concat(e,"/data")).then((function(e){return e.json()})).then(P)}),[F,e]),Object(b.jsxs)(fn,{children:[Object(b.jsxs)(jn,{children:[Object(b.jsx)(xn,{status:F,children:V()}),Object(b.jsx)(pn,{children:Object(b.jsxs)("span",{children:[Object(b.jsx)("button",{disabled:!1===c,onClick:function(){return i(!1)},title:"Expand All",children:"+"}),Object(b.jsx)("button",{disabled:c,onClick:function(){return i(!0)},title:"Collapse All",children:"-"})]})}),Object(b.jsx)(On,{children:Object(b.jsxs)("span",{children:["Filter:",Object(b.jsx)(gn,{onChange:function(e){return m(e.target.value.trim())}}),Object(b.jsx)("input",{type:"checkbox",name:"case sensitive",checked:l,onChange:function(e){return d(e.target.checked)}}),"case sensitive",Object(b.jsxs)(hn,{children:[Object(b.jsx)("button",{onClick:function(){return C((function(e){return!e}))},children:"Problems"}),S&&Object(b.jsx)(vn,{children:dn.map((function(e){return Object(b.jsxs)("span",{children:[Object(b.jsx)("input",{type:"checkbox",name:e,checked:T.includes(e),onChange:function(n){return M((function(t){return n.target.checked?[].concat(Object(u.a)(t),[e]):t.filter((function(n){return n!==e}))}))}}),e]},e)}))})]})]})})]}),Object(b.jsxs)(mn,{children:[!U&&"No data",Object(b.jsx)(un,{data:U,sourceMatches:_,collapseAll:c,onCollapseChange:B,filter:{text:v,caseSensitive:l,problems:T},onSendMessage:G,disabled:F!==p.ReadyState.OPEN})]}),Object(b.jsx)(f,{})]})}var fn=d.a.div(Xe||(Xe=Object(l.a)(['\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400;\n']))),jn=d.a.div(qe||(qe=Object(l.a)(["\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 1em;\n  padding-right: 1em;\n"]))),pn=d.a.div(Ke||(Ke=Object(l.a)(["\n  flex: 1;\n  display: flex;\n  justify-content: space-around;\n"]))),On=d.a.div(Ze||(Ze=Object(l.a)(["\n  flex: 3;\n  display: flex;\n  justify-content: space-around;\n"]))),hn=d.a.div($e||($e=Object(l.a)(["\n  position: relative;\n"]))),gn=d.a.input(Qe||(Qe=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 1em;\n  min-width: min(50vw, 400px);\n"]))),vn=d.a.div(en||(en=Object(l.a)(["\n  position: absolute;\n  background-color: #ffffff;\n  border: 0.5px solid black;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n"]))),mn=d.a.div(nn||(nn=Object(l.a)(["\n  flex: 1;\n  min-width: 800px;\n  max-width: 95vw;\n  margin: 0 40px;\n  padding-top: 15px;\n  flex-direction: column;\n  align-items: center;\n"]))),xn=d.a.span(tn||(tn=Object(l.a)(["\n  color: ",";\n"])),(function(e){var n=e.status;return n===p.ReadyState.OPEN?"darkgreen":n===p.ReadyState.CONNECTING?"black":"darkred"}));r.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(bn,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.17ea0cd1.chunk.js.map
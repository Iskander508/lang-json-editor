(this.webpackJsonplang_json_editor=this.webpackJsonplang_json_editor||[]).push([[0],{46:function(e,n,t){},5:function(e,n){var t={ADD:"ADD",CHANGE_VALUE:"CHANGE_VALUE",REMOVE:"REMOVE",OPEN:"OPEN",DATA_UPDATE:"DATA_UPDATE",SOURCE_MATCHES_UPDATE:"SOURCE_MATCHES_UPDATE"},i={add:function(e,n,i){return{action:t.ADD,parentId:e,type:n,label:i}},changeValue:function(e,n,i){return{action:t.CHANGE_VALUE,id:e,language:n,value:i}},remove:function(e){return{action:t.REMOVE,id:e}},open:function(e,n,i){return{action:t.OPEN,file:e,line:n,column:i}},dataUpdate:function(e){return{action:t.DATA_UPDATE,data:e}},sourceMatchesUpdate:function(e){return{action:t.SOURCE_MATCHES_UPDATE,data:e}}};e.exports={NodeType:{OBJECT:"OBJECT",VALUE:"VALUE"},ActionType:t,Action:i,MatchType:{EXACT:"exact",PARTIAL:"partial"}}},99:function(e,n,t){"use strict";t.r(n);var i,c=t(1),a=t.n(c),o=t(35),r=t.n(o),l=(t(46),t(2)),d=t(19),u=t(4),s=t(3),b=t(0);function f(){var e=Object(c.useMemo)((function(){return(new Date).getFullYear()}),[]);return Object(b.jsx)(O,{children:"\xa9 Pavel Zarecky, ".concat(e)})}var j,O=s.a.div(i||(i=Object(l.a)(["\n  padding-right: 15px;\n  text-align: end;\n"]))),p=t(7),v=t.n(p),h=t(5),g=t(13),m="NO_PROBLEM";function x(e){var n=null===e||void 0===e?void 0:e.match(/{{\w+}}/g);return n?Array.from(new Set(n.map((function(e){return e.substring(2,e.length-2)})))).sort():[]}function E(e,n,t,i){switch(e.type){case h.NodeType.VALUE:e.exactSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id,i=n.type;return t===e.id&&i===h.MatchType.EXACT})))||[],e.partialSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id;return e.id.startsWith("".concat(t,"."))||e.id.startsWith("".concat(t,"_plural"))})))||[],n.some((function(n){return void 0===e.values[n]||null===e.values[n]}))?i(e.id,j.MISSING):n.some((function(n){return!e.values[n].trim()}))&&i(e.id,j.EMPTY);var c=e.exactSourceMatches.length,a=e.partialSourceMatches.length;c||i(e.id,a?j.PARTIAL_MATCH_IN_SOURCES:j.NO_MATCH_IN_SOURCES),Object.values(e.values).sort().some((function(e,n,t){return n&&e===t[n-1]}))&&i(e.id,j.SAME),n.some((function(n){return e.values[n]===e.id}))&&i(e.id,j.DEFAULT),Object.values(e.values).map(x).some((function(e,n,t){return n&&!Object(g.isEqual)(e,t[n-1])}))&&i(e.id,j.PLACEHOLDER_MISMATCH);break;case h.NodeType.OBJECT:if(!e.children.length)return i(e.id,j.EMPTY);e.children.forEach((function(e){return E(e,n,t,i)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function C(e,n,t){var i=[];return E(e,n,t,(function(e,n){(t||n!==j.NO_MATCH_IN_SOURCES)&&i.push({id:e,problem:n})})),i}function S(e,n,t,i){function c(e){return t?null===e||void 0===e?void 0:e.includes(n):null===e||void 0===e?void 0:e.toLowerCase().includes(n.toLowerCase())}switch(e.type){case h.NodeType.VALUE:(c(e.id)||Object.values(e.values).some(c))&&i(e.id);break;case h.NodeType.OBJECT:!e.children.length&&c(e.id)&&i(e.id),e.children.forEach((function(e){return S(e,n,t,i)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function A(e,n,t){var i=[];return S(e,n,t,(function(e){i.push(e)})),i}function y(e,n){switch(e.type){case h.NodeType.VALUE:n(e.id);break;case h.NodeType.OBJECT:e.children.length||n(e.id),e.children.forEach((function(e){return y(e,n)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function T(e){var n=[];return y(e,(function(e){n.push(e)})),n}!function(e){e.MISSING="MISSING",e.EMPTY="EMPTY",e.DEFAULT="DEFAULT",e.SAME="SAME",e.PLACEHOLDER_MISMATCH="PLACEHOLDER_MISMATCH",e.NO_MATCH_IN_SOURCES="NO_MATCH_IN_SOURCES",e.PARTIAL_MATCH_IN_SOURCES="PARTIAL_MATCH_IN_SOURCES"}(j||(j={}));var M,k=a.a.createContext({}),_=t(15),w=t.n(_),N=t.p+"static/media/add.d8693632.svg",I=t.p+"static/media/edit.962e7af9.svg",R=t.p+"static/media/confirm.0addefb3.svg",L=t.p+"static/media/cancel.caea72e4.svg",U=t.p+"static/media/trash.85c719f0.svg",P=t.p+"static/media/copy.2327b577.svg",D=t.p+"static/media/code.33554129.svg",H=t.p+"static/media/section.774f12f9.svg",F=t.p+"static/media/value.cddb19bc.svg",V=t.p+"static/media/vscode.ea98ae01.svg",G=t.p+"static/media/google-translate.0346cfbe.svg",B=t.p+"static/media/deepl.36a3b23e.svg",J=t(9),Y=t(41);function W(e){var n=e.onClick,t=e.loading,i=Object(Y.a)(e,["onClick","loading"]),a=Object(c.useCallback)((function(){if(!t){for(var e=arguments.length,i=new Array(e),c=0;c<e;c++)i[c]=arguments[c];null===n||void 0===n||n.apply(void 0,i)}}),[t,n]);return Object(b.jsx)(X,Object(J.a)({onClick:a,loading:t},i))}var z,K,X=s.a.span(M||(M=Object(l.a)(["\n  cursor: pointer;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  min-width: 1em;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: ",";\n    font-weight: bold;\n  }\n\n  &:hover > * {\n    transform: scale(1.5, 1.5);\n  }\n"])),(function(e){return e.loading?"0.5":"1"})),q=t(39);function Z(e){var n=e.operation,t=e.buttons,i=e.visible,c=void 0===i||i,a=e.copyString,o={opacity:c?1:0};return Object(b.jsxs)(te,{style:o,children:[n?Object(b.jsx)(ie,{children:Object(b.jsx)("img",{src:n.image,width:"16",alt:n.name})}):null,t.map((function(e){return e?Object(b.jsx)(W,{onClick:function(n){e.callback(),n.stopPropagation()},title:e.name,children:Object(b.jsx)("img",{src:e.image,width:"12",alt:e.name})},e.name):null})),a?Object(b.jsx)(q.CopyToClipboard,{text:a,children:Object(b.jsx)(W,{title:'copy "'.concat(a,'"'),children:Object(b.jsx)("img",{src:P,width:"12",alt:"copy ".concat(a)})})}):null]})}function $(e){var n=e.visible,t=e.onAdd,i=e.onRemove,c=e.onEdit,a=e.onSources,o=e.copyString;return Object(b.jsx)(Z,{visible:n,buttons:[t&&{name:"add",image:N,callback:t},i&&{name:"remove",image:U,callback:i},c&&{name:"edit",image:I,callback:c},a&&{name:"show in sources",image:D,callback:a}],copyString:o})}function Q(e){var n=e.onConfirm,t=e.onCancel,i=e.editMode,c=i?"edit":"remove";return Object(b.jsx)(Z,{operation:{name:c,image:i?I:U},buttons:[{name:"confirm ".concat(c),image:R,callback:n},{name:"cancel ".concat(c),image:L,callback:t}]})}function ee(e){var n=e.onObject,t=e.onValue,i=e.onCancel;return Object(b.jsx)(Z,{operation:{name:"add",image:N},buttons:[{name:"section",image:H,callback:n},{name:"value",image:F,callback:t},{name:"cancel",image:L,callback:i}]})}var ne,te=s.a.div(z||(z=Object(l.a)(["\n  cursor: default;\n"]))),ie=s.a.span(K||(K=Object(l.a)(["\n  font-size: 10px;\n  opacity: 0.8;\n"]))),ce=function(e){Object(c.useEffect)((function(){if(e){var n=function(n){27===n.keyCode&&e()};return window.addEventListener("keydown",n),function(){window.removeEventListener("keydown",n)}}}),[e])};!function(e){e.remove="REMOVE_MODE",e.edit="EDIT_MODE",e.add="ADD_MODE"}(ne||(ne={}));var ae,oe,re,le,de,ue,se,be=function(e){var n=e.editing,t=e.visible,i=e.onAdd,a=e.onRemove,o=e.onConfirmEdit,r=e.onCancelEdit,l=e.onBeginEdit,d=void 0===l?function(){}:l,s=e.onSources,f=e.copyString,j=Object(c.useState)(n?ne.edit:void 0),O=Object(u.a)(j,2),p=O[0],v=O[1];function g(e){return function(){v(void 0),null===e||void 0===e||e()}}switch(Object(c.useEffect)((function(){v(n?ne.edit:void 0)}),[n]),ce(p&&g(p===ne.edit?r:void 0)),p){case ne.add:return Object(b.jsx)(ee,{onObject:g((function(){return null===i||void 0===i?void 0:i(h.NodeType.OBJECT)})),onValue:g((function(){return null===i||void 0===i?void 0:i(h.NodeType.VALUE)})),onCancel:g()});case ne.remove:case ne.edit:return Object(b.jsx)(Q,{editMode:p===ne.edit,onConfirm:g(p===ne.edit?o:a),onCancel:g(p===ne.edit?r:void 0)});default:return Object(b.jsx)($,{visible:t,copyString:f,onAdd:i&&function(){return v(ne.add)},onRemove:a&&function(){return v(ne.remove)},onEdit:o&&function(){v(ne.edit),null===d||void 0===d||d()},onSources:s})}},fe=t(14),je=t(40),Oe=t.n(je);function pe(e){var n=e.text,t=e.fromLanguage,i=e.toLanguage,c="Open on GoogleTranslate";return Object(b.jsx)("a",{href:"https://translate.google.com/?sl=".concat(encodeURIComponent(t),"&tl=").concat(encodeURIComponent(i),"&text=").concat(encodeURIComponent(n)),target:"_blank",rel:"noreferrer",children:Object(b.jsx)(W,{title:c,children:Object(b.jsx)("img",{src:G,width:"12",alt:c})})})}function ve(e){var n=e.text,t=e.fromLanguage,i=e.toLanguage,a=e.onResult,o="Translate with DeepL",r=Object(c.useState)(!1),l=Object(u.a)(r,2),d=l[0],s=l[1],f=Object(c.useContext)(k).deepLKey,j=Object(c.useCallback)((function(){f&&(s(!0),Oe()({text:n,source_lang:t.toUpperCase(),target_lang:i.toUpperCase(),auth_key:f,free_api:f.endsWith(":fx")}).then((function(e){return a(e.data.translations[0].text)})).catch((function(e){return console.error(e)})).finally((function(){return s(!1)})))}),[f,n,t,i,a]);return f?Object(b.jsx)(W,{title:o,onClick:j,loading:d,children:Object(b.jsx)("img",{src:B,width:"12",alt:o})}):null}function he(e){var n,t=e.id,i=e.file,a=e.line,o=e.contextStartLine,r=e.context,l=e.type,d=Object(c.useContext)(k).onOpen,u=null===(n=r[a-o])||void 0===n?void 0:n.indexOf(t);return u=-1===u?void 0:u,Object(b.jsxs)(Me,{type:l,children:[Object(b.jsx)(ke,{children:Object(b.jsxs)(_e,{title:"Open in VSCode",onClick:function(){return null===d||void 0===d?void 0:d(i,a,u?u+1:void 0)},children:[Object(b.jsx)(we,{children:i}),":",a]})}),r.map((function(e,n){var i=a===n+o,c=Object(b.jsx)(Re,{children:e});return i&&void 0!==u&&(c=Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Re,{children:e.substring(0,u)}),Object(b.jsx)(Re,{highlighted:!0,children:t}),Object(b.jsx)(Re,{children:e.substring(u+t.length)})]})),Object(b.jsxs)(Ne,{highlighted:i,type:l,children:[Object(b.jsx)(Ie,{highlighted:i,children:n+o}),c]},n)}))]})}var ge,me,xe,Ee,Ce,Se,Ae,ye,Te,Me=s.a.div(ae||(ae=Object(l.a)(["\n  border: 0.5px solid black;\n  border-color: ",";\n  font-family: monospace, monospace;\n"])),(function(e){return e.type===h.MatchType.EXACT?"black":"darkseagreen"})),ke=s.a.div(oe||(oe=Object(l.a)(["\n  background-color: lightgrey;\n  padding: 0 8px;\n"]))),_e=s.a.span(re||(re=Object(l.a)(["\n  &:hover {\n    text-decoration: underline;\n    cursor: pointer;\n    :after {\n      padding-left: 4px;\n      content: url(",");\n    }\n  }\n"])),V),we=s.a.span(le||(le=Object(l.a)(["\n  font-weight: bold;\n"]))),Ne=s.a.div(de||(de=Object(l.a)(["\n  background-color: ",";\n  margin: 0 8px;\n"])),(function(e){var n=e.highlighted,t=e.type;return n?t===h.MatchType.EXACT?"lightgreen":"darkseagreen":"transparent"})),Ie=s.a.span(ue||(ue=Object(l.a)(["\n  color: ",";\n  margin: 0 8px;\n  user-select: none;\n"])),(function(e){return e.highlighted?"black":"lightgrey"})),Re=s.a.pre(se||(se=Object(l.a)(["\n  display: inline;\n  margin: 0;\n  font-weight: ",";\n"])),(function(e){return e.highlighted?"bold":"normal"}));function Le(e){var n=e.language,t=e.editing,i=e.value,a=e.onChange,o=e.onEdit,r=e.issues,l=e.hintForTranslation,d=Object(c.useState)(!1),s=Object(u.a)(d,2),f=s[0],j=s[1],O=Object(c.useState)(!1),p=Object(u.a)(O,2),v=p[0],h=p[1],g=Object(c.useState)(),m=Object(u.a)(g,2),x=m[0],E=m[1];Object(c.useEffect)((function(){t||(j(!1),h(!1))}),[t]);var C=Object(c.useCallback)((function(){return o(!1)}),[o]),S=Object(c.useCallback)((function(e){a(e.target.value),j(!1)}),[a]);return ce(t?C:void 0),Object(b.jsxs)(Ke,{children:[Object(b.jsx)(We,{children:n}),t?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(qe,{style:x,onFocus:function(){return h(!0)},autoFocus:f,value:i||"",onChange:S,ref:function(e){e&&f&&e.select()}}),v&&l?Object(b.jsxs)(Ze,{children:[Object(b.jsx)(ve,{text:l.value,fromLanguage:l.language,toLanguage:n,onResult:a}),Object(b.jsx)(pe,{text:l.value,fromLanguage:l.language,toLanguage:n})]}):null]}):Object(b.jsx)(Xe,{problems:r.map((function(e){return e.problem})),title:r.length?r.map((function(e){return e.hint})).join("\n"):void 0,onDoubleClick:function(){j(!0),o(!0)},ref:function(e){if(e){var n=e.offsetWidth,t=e.offsetHeight,i=e.offsetLeft||0;(null===x||void 0===x?void 0:x.width)===n&&(null===x||void 0===x?void 0:x.height)===t||E({width:n,height:t,maxWidth:document.body.offsetWidth-i-100})}},children:(null===i||void 0===i?void 0:i.trim())?i:null===i||void 0===i?"<missing>":'"'.concat(i,'"')})]})}function Ue(e){var n,t,i,a,o=e.node,r=Object(c.useState)(!1),l=Object(u.a)(r,2),d=l[0],s=l[1],f=Object(c.useState)(!1),O=Object(u.a)(f,2),p=O[0],v=O[1],h=Object(c.useState)(!1),m=Object(u.a)(h,2),E=m[0],C=m[1],S=Object(c.useState)(o.values),A=Object(u.a)(S,2),y=A[0],T=A[1],M=Object(c.useContext)(k),_=M.languages,N=M.onChangeValue,I=M.onRemove,R=M.problematicTranslations,L=M.disabled;ce(p?function(){return v(!1)}:void 0);var U=Object(c.useCallback)((function(){T(o.values),C(!1)}),[o]);Object(c.useEffect)((function(){L&&U()}),[L,U]);var P=(null===R||void 0===R?void 0:R.filter((function(e){return e.id===o.id})).map((function(e){return e.problem})))||[],D=[];P.includes(j.NO_MATCH_IN_SOURCES)&&D.push("\u26a0 No match found in the sources"),P.includes(j.PARTIAL_MATCH_IN_SOURCES)&&D.push("\u26a0 Partial match in sourcefiles");var H=(null===(n=o.exactSourceMatches)||void 0===n?void 0:n.length)||(null===(t=o.partialSourceMatches)||void 0===t?void 0:t.length);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(Be,{onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},children:[Object(b.jsx)(Je,{title:D.length?"".concat(o.id,"\n").concat(D.join("\n")):o.id,problems:P,children:o.name}),Object(b.jsx)(Ye,{children:null===_||void 0===_?void 0:_.map((function(e){var n=y[e],t=[];if(!P.includes(j.MISSING)||void 0!==n&&null!==n?P.includes(j.EMPTY)&&!(null===n||void 0===n?void 0:n.trim())&&t.push({problem:j.EMPTY,hint:"\u26a0 Potential issue: Empty value"}):t.push({problem:j.MISSING,hint:"\u26a0 issue: Missing value"}),P.includes(j.DEFAULT)&&n===o.id&&t.push({problem:j.DEFAULT,hint:'\u26a0 Potential issue: Default value used "'.concat(n,'"')}),P.includes(j.SAME)){var i=Object.keys(y).find((function(t){return t!==e&&y[t]===n}));i&&t.push({problem:j.SAME,hint:'\u26a0 Potential issue: The same as the "'.concat(i,'" version')})}if(P.includes(j.PLACEHOLDER_MISMATCH)){var c=Object.keys(y).find((function(t){return t!==e&&!Object(g.isEqual)(x(y[t]),x(n))}));c&&t.push({problem:j.PLACEHOLDER_MISMATCH,hint:'\u26a0 Potential issue: Different placeholders from the "'.concat(c,'" version')})}var a=Object.keys(y).find((function(n){return n!==e&&y[n]&&y[n]!==o.id}));return Object(b.jsx)(Le,{language:e,editing:E,issues:t,value:n,hintForTranslation:a?{language:a,value:y[a]}:void 0,onChange:function(n){return T(Object(J.a)(Object(J.a)({},y),{},Object(fe.a)({},e,n)))},onEdit:function(e){C(!L&&e),e||T(o.values)}},e)}))}),Object(b.jsx)(be,{visible:d||p,editing:E,onBeginEdit:L?void 0:function(){return C(!0)},onConfirmEdit:L?void 0:function(){null===_||void 0===_||_.forEach((function(e){var n=y[e];n!==o.values[e]&&(null===N||void 0===N||N(o.id,e,n))})),C(!1)},onCancelEdit:L?void 0:U,onRemove:L?void 0:function(){null===I||void 0===I||I(o.id)},onSources:H?function(){return v((function(e){return!e}))}:void 0,copyString:o.id})]}),Object(b.jsx)(ze,{children:Object(b.jsxs)(w.a,{expanded:p,children:[null===(i=o.exactSourceMatches)||void 0===i?void 0:i.map((function(e,n){return Object(b.jsx)(he,Object(J.a)({},e),"exact-".concat(n))})),null===(a=o.partialSourceMatches)||void 0===a?void 0:a.map((function(e,n){return Object(b.jsx)(he,Object(J.a)({},e),"partial-".concat(n))}))]})})]})}var Pe,De,He,Fe,Ve,Ge,Be=s.a.div(ge||(ge=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 2px;\n"]))),Je=s.a.div(me||(me=Object(l.a)(["\n  cursor: default;\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px 0 0 4px;\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n"])),(function(e){var n=e.problems;return n.includes(j.MISSING)?"salmon":n.includes(j.EMPTY)||n.includes(j.DEFAULT)?"moccasin":n.includes(j.NO_MATCH_IN_SOURCES)?"lightgray":n.includes(j.PARTIAL_MATCH_IN_SOURCES)?"darkseagreen":n.length?"lightcyan":"lightgreen"})),Ye=s.a.div(xe||(xe=Object(l.a)([""]))),We=s.a.span(Ee||(Ee=Object(l.a)(["\n  cursor: default;\n  padding: 0 8px;\n  color: white;\n  background-color: black;\n"]))),ze=s.a.div(Ce||(Ce=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),Ke=s.a.div(Se||(Se=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  font-family: monospace, monospace;\n"]))),Xe=s.a.div(Ae||(Ae=Object(l.a)(["\n  padding: 0 8px;\n  border: 0.5px solid black;\n  ","\n"])),(function(e){var n=e.problems;return n.includes(j.MISSING)?"background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;":n.includes(j.EMPTY)?"background-color: orange;":n.length?"background-color: lightcyan;":""})),qe=s.a.textarea(ye||(ye=Object(l.a)(["\n  font-size: 16px;\n  min-height: 1em;\n"]))),Ze=s.a.div(Te||(Te=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"])));function $e(e){var n=e.node,t=Object(c.useState)(!n.id),i=Object(u.a)(t,2),a=i[0],o=i[1],r=Object(c.useState)(!1),l=Object(u.a)(r,2),d=l[0],s=l[1],f=Object(c.useState)(),O=Object(u.a)(f,2),p=O[0],v=O[1],g=Object(c.useState)(""),m=Object(u.a)(g,2),x=m[0],E=m[1],C=Object(c.useContext)(k),S=C.onAdd,A=C.onRemove,y=C.problematicTranslations,T=C.filteredIds,M=C.disabled,_=C.collapseAll,N=C.onCollapseChange,I=Object(c.useCallback)((function(){v(void 0),E("")}),[]);Object(c.useEffect)((function(){a&&!M||I()}),[M,a,I]),Object(c.useEffect)((function(){void 0!==_&&o(!_)}),[_]),ce(p&&I);var U=null===y||void 0===y?void 0:y.filter((function(e){var t=e.id;return t===n.id||t.startsWith("".concat(n.id,"."))})).map((function(e){return e.problem})),P=(null===U||void 0===U?void 0:U.includes(j.MISSING))?j.MISSING:(null===U||void 0===U?void 0:U.includes(j.EMPTY))?j.EMPTY:(null===U||void 0===U?void 0:U.includes(j.NO_MATCH_IN_SOURCES))?j.NO_MATCH_IN_SOURCES:(null===U||void 0===U?void 0:U.includes(j.DEFAULT))?j.DEFAULT:(null===U||void 0===U?void 0:U.includes(j.SAME))?j.SAME:void 0,D=x&&/^\w+$/.test(x)&&!n.children.some((function(e){return e.name===x})),H=D&&p?function(){null===S||void 0===S||S(n.id,p,x),I()}:void 0,F=Object(c.useCallback)((function(){null===N||void 0===N||N(),o((function(e){return!e}))}),[N]),V=Object(c.useCallback)((function(){return s(!0)}),[]),G=Object(c.useCallback)((function(){return s(!1)}),[]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(dn,{onClick:F,onMouseEnter:V,onMouseLeave:G,children:[Object(b.jsxs)(sn,{id:n.id,problem:P,expanded:a,title:n.id,children:[Object(b.jsx)(un,{children:a?"-":"+"}),n.name]}),a?!p&&!M&&Object(b.jsx)(be,{visible:d,onAdd:function(e){return v(e)},onRemove:n.id?function(){return null===A||void 0===A?void 0:A(n.id)}:void 0}):Object(b.jsx)(bn,{children:"{} ".concat(n.children.length," item").concat(1===n.children.length?"":"s")})]}),p?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(jn,{type:"text",autoFocus:!0,placeholder:p===h.NodeType.OBJECT?"new section":"new value",onChange:function(e){return E(e.target.value.trim())},onKeyPress:function(e){return"Enter"===e.key&&(null===H||void 0===H?void 0:H())}}),D?Object(b.jsx)(W,{onClick:H,children:Object(b.jsx)("img",{src:R,width:"16",alt:"confirm"})}):null,Object(b.jsx)(W,{onClick:I,children:Object(b.jsx)("img",{src:L,width:"16",alt:"cancel"})})]}):null,Object(b.jsx)(fn,{children:Object(b.jsx)(w.a,{expanded:a,children:n.children.map((function(e){return T&&!T.some((function(n){return n===e.id||n.startsWith("".concat(e.id,"."))}))?null:e.type===h.NodeType.OBJECT?Object(b.jsx)($e,{node:e},e.id):Object(b.jsx)(Ue,{node:e},e.id)}))})})]})}var Qe,en,nn,tn,cn,an,on,rn,ln,dn=s.a.div(Pe||(Pe=Object(l.a)(["\n  cursor: default;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n"]))),un=s.a.span(De||(De=Object(l.a)(["\n  min-width: 10px;\n  margin-right: 2px;\n"]))),sn=s.a.span(He||(He=Object(l.a)(["\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px;\n\n  &:hover {\n    font-weight: bold;\n  }\n"])),(function(e){var n=e.id,t=e.problem,i=e.expanded;if(!n)return"white";switch(t){case j.MISSING:return i?"pink":"salmon";case j.EMPTY:case j.DEFAULT:return i?"white":"moccasin";case j.SAME:return i?"white":"lightcyan";case j.NO_MATCH_IN_SOURCES:return i?"white":"lightgrey";default:return i?"mintcream":"lightgreen"}})),bn=s.a.span(Fe||(Fe=Object(l.a)(["\n  color: grey;\n  margin: 0 8px;\n"]))),fn=s.a.div(Ve||(Ve=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),jn=s.a.input(Ge||(Ge=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 20px;\n  margin-bottom: 4px;\n"])));function On(e){var n=e.data,t=e.sourceMatches,i=e.filter,a=i.text,o=i.caseSensitive,r=i.problems,l=e.onSendMessage,d=e.disabled,s=e.collapseAll,f=e.onCollapseChange,j=Object(c.useState)([]),O=Object(u.a)(j,2),p=O[0],v=O[1];Object(c.useEffect)((function(){var e;(null===n||void 0===n||null===(e=n.languages)||void 0===e?void 0:e.length)&&v(C(n.content,n.languages,t))}),[t,n]);var g=Object(c.useState)(),x=Object(u.a)(g,2),E=x[0],S=x[1];Object(c.useEffect)((function(){S(n&&a?A(n.content,a,o):void 0)}),[o,a,n]);var y=E;if(n&&(null===r||void 0===r?void 0:r.length)){var M=E||T(n.content),_=p.reduce((function(e,n){var t=n.id,i=n.problem;return e[t]?e[t].push(i):e[t]=[i],e}),{});y=M.filter((function(e){var n;return r.includes(m)&&!_[e]||(null===(n=_[e])||void 0===n?void 0:n.some((function(e){return r.includes(e)})))}))}return Object(b.jsx)(k.Provider,{value:{collapseAll:s,onCollapseChange:f,disabled:d,filteredIds:y,problematicTranslations:p,languages:null===n||void 0===n?void 0:n.languages,deepLKey:null===n||void 0===n?void 0:n.deepLKey,onAdd:function(e,n,t){return l(h.Action.add(e,n,t))},onChangeValue:function(e,n,t){return l(h.Action.changeValue(e,n,t))},onRemove:function(e){return l(h.Action.remove(e))},onOpen:function(e,n,t){return l(h.Action.open(e,n,t))}},children:n?Object(b.jsx)($e,{node:n.content}):null})}function pn(){var e=function(){var e=new URL(window.location.href),n=e.searchParams.get("serverPort")||e.port;return"".concat(e.hostname,":").concat(n)}(),n=Object(c.useState)(),t=Object(u.a)(n,2),i=t[0],a=t[1],o=Object(c.useState)(!1),r=Object(u.a)(o,2),l=r[0],s=r[1],O=Object(c.useState)(""),g=Object(u.a)(O,2),x=g[0],E=g[1],C=Object(c.useState)(!1),S=Object(u.a)(C,2),A=S[0],y=S[1],T=Object(c.useState)([]),M=Object(u.a)(T,2),k=M[0],_=M[1],w=Object(c.useState)(),N=Object(u.a)(w,2),I=N[0],R=N[1],L=Object(c.useState)(),U=Object(u.a)(L,2),P=U[0],D=U[1],H=Object(c.useCallback)((function(e){switch(e.action){case h.ActionType.DATA_UPDATE:D(e.data);break;case h.ActionType.SOURCE_MATCHES_UPDATE:R(e.data);break;default:console.error("Invalid action:",e.action)}}),[]),F=v()("ws://".concat(e),{retryOnError:!0,shouldReconnect:function(){return!0},reconnectAttempts:100,onMessage:function(e){return H(JSON.parse(e.data))}}),V=F.sendMessage,G=F.readyState,B=Object(c.useCallback)((function(){switch(G){case p.ReadyState.OPEN:return"Connected";case p.ReadyState.CONNECTING:return"Connecting";case p.ReadyState.CLOSED:return"Server not reachable";default:return"Unknown"}}),[G]),J=Object(c.useCallback)((function(e){V(JSON.stringify(e))}),[V]),Y=Object(c.useCallback)((function(){return a(void 0)}),[]);Object(c.useEffect)((function(){G===p.ReadyState.OPEN&&fetch("http://".concat(e,"/data")).then((function(e){return e.json()})).then(D)}),[G,e]);var W=!!I,z=Object(c.useMemo)((function(){return[m].concat(Object(d.a)(Object.values(j))).filter((function(e){return W||e!==j.NO_MATCH_IN_SOURCES&&e!==j.PARTIAL_MATCH_IN_SOURCES}))}),[W]);return Object(b.jsxs)(vn,{children:[Object(b.jsxs)(hn,{children:[Object(b.jsx)(An,{status:G,children:B()}),Object(b.jsx)(gn,{children:Object(b.jsxs)("span",{children:[Object(b.jsx)("button",{disabled:!1===i,onClick:function(){return a(!1)},title:"Expand All",children:"+"}),Object(b.jsx)("button",{disabled:i,onClick:function(){return a(!0)},title:"Collapse All",children:"-"})]})}),Object(b.jsx)(mn,{children:Object(b.jsxs)("span",{children:["Filter:",Object(b.jsx)(En,{onChange:function(e){return E(e.target.value.trim())}}),Object(b.jsx)("input",{type:"checkbox",name:"case sensitive",checked:l,onChange:function(e){return s(e.target.checked)}}),"case sensitive",Object(b.jsxs)(xn,{children:[Object(b.jsx)("button",{onClick:function(){return y((function(e){return!e}))},children:"Problems"}),A&&Object(b.jsx)(Cn,{children:z.map((function(e){return Object(b.jsxs)("span",{children:[Object(b.jsx)("input",{type:"checkbox",name:e,checked:k.includes(e),onChange:function(n){return _((function(t){return n.target.checked?[].concat(Object(d.a)(t),[e]):t.filter((function(n){return n!==e}))}))}}),e]},e)}))})]})]})})]}),Object(b.jsxs)(Sn,{children:[!P&&"No data",Object(b.jsx)(On,{data:P,sourceMatches:I,collapseAll:i,onCollapseChange:Y,filter:{text:x,caseSensitive:l,problems:k},onSendMessage:J,disabled:G!==p.ReadyState.OPEN})]}),Object(b.jsx)(f,{})]})}var vn=s.a.div(Qe||(Qe=Object(l.a)(['\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400;\n']))),hn=s.a.div(en||(en=Object(l.a)(["\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 1em;\n  padding-right: 1em;\n"]))),gn=s.a.div(nn||(nn=Object(l.a)(["\n  flex: 1;\n  display: flex;\n  justify-content: space-around;\n"]))),mn=s.a.div(tn||(tn=Object(l.a)(["\n  flex: 3;\n  display: flex;\n  justify-content: space-around;\n"]))),xn=s.a.div(cn||(cn=Object(l.a)(["\n  position: relative;\n"]))),En=s.a.input(an||(an=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 1em;\n  min-width: min(50vw, 400px);\n"]))),Cn=s.a.div(on||(on=Object(l.a)(["\n  position: absolute;\n  background-color: #ffffff;\n  border: 0.5px solid black;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n"]))),Sn=s.a.div(rn||(rn=Object(l.a)(["\n  flex: 1;\n  min-width: 800px;\n  max-width: 95vw;\n  margin: 0 40px;\n  padding-top: 15px;\n  flex-direction: column;\n  align-items: center;\n"]))),An=s.a.span(ln||(ln=Object(l.a)(["\n  color: ",";\n"])),(function(e){var n=e.status;return n===p.ReadyState.OPEN?"darkgreen":n===p.ReadyState.CONNECTING?"black":"darkred"}));r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(pn,{})}),document.getElementById("root"))}},[[99,1,2]]]);
//# sourceMappingURL=main.2e5c7cae.chunk.js.map
(this.webpackJsonplang_json_editor=this.webpackJsonplang_json_editor||[]).push([[0],{13:function(e,n){var t={ADD:"ADD",CHANGE_VALUE:"CHANGE_VALUE",REMOVE:"REMOVE",OPEN:"OPEN",DATA_UPDATE:"DATA_UPDATE",SOURCE_MATCHES_UPDATE:"SOURCE_MATCHES_UPDATE"},i={add:function(e,n,i){return{action:t.ADD,parentId:e,type:n,label:i}},changeValue:function(e,n,i){return{action:t.CHANGE_VALUE,id:e,language:n,value:i}},remove:function(e){return{action:t.REMOVE,id:e}},open:function(e,n,i){return{action:t.OPEN,file:e,line:n,column:i}},dataUpdate:function(e){return{action:t.DATA_UPDATE,data:e}},sourceMatchesUpdate:function(e){return{action:t.SOURCE_MATCHES_UPDATE,data:e}}};e.exports={NodeType:{OBJECT:"OBJECT",VALUE:"VALUE"},ActionType:t,Action:i,MatchType:{EXACT:"exact",PARTIAL:"partial"}}},366:function(e,n,t){},655:function(e,n){},657:function(e,n){},667:function(e,n){},669:function(e,n){},696:function(e,n){},697:function(e,n){},702:function(e,n){},704:function(e,n){},711:function(e,n){},730:function(e,n){},801:function(e,n,t){"use strict";t.r(n);var i,a=t(1),c=t.n(a),o=t(355),r=t.n(o),l=(t(366),t(6)),u=t(211),d=t(11),s=t(7),b=t(0);function f(){var e=Object(a.useMemo)((function(){return(new Date).getFullYear()}),[]);return Object(b.jsx)(O,{children:"\xa9 Pavel Zarecky, ".concat(e)})}var j,O=s.a.div(i||(i=Object(l.a)(["\n  padding-right: 15px;\n  text-align: end;\n"]))),p=t(57),v=t.n(p),h=t(13),g=t(159),m="NO_PROBLEM";function x(e){var n=null===e||void 0===e?void 0:e.match(/{{\w+}}/g);return n?Array.from(new Set(n.map((function(e){return e.substring(2,e.length-2)})))).sort():[]}function E(e,n,t,i){switch(e.type){case h.NodeType.VALUE:e.exactSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id,i=n.type;return t===e.id&&i===h.MatchType.EXACT})))||[],e.partialSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id;return e.id.startsWith("".concat(t,"."))||e.id.startsWith("".concat(t,"_plural"))})))||[],n.some((function(n){return void 0===e.values[n]||null===e.values[n]}))?i(e.id,j.MISSING):n.some((function(n){return!e.values[n].trim()}))&&i(e.id,j.EMPTY);var a=e.exactSourceMatches.length,c=e.partialSourceMatches.length;a||i(e.id,c?j.PARTIAL_MATCH_IN_SOURCES:j.NO_MATCH_IN_SOURCES),Object.values(e.values).sort().some((function(e,n,t){return n&&e===t[n-1]}))&&i(e.id,j.SAME),n.some((function(n){return e.values[n]===e.id}))&&i(e.id,j.DEFAULT),Object.values(e.values).map(x).some((function(e,n,t){return n&&!Object(g.isEqual)(e,t[n-1])}))&&i(e.id,j.PLACEHOLDER_MISMATCH);break;case h.NodeType.OBJECT:if(!e.children.length)return i(e.id,j.EMPTY);e.children.forEach((function(e){return E(e,n,t,i)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function C(e,n,t){var i=[];return E(e,n,t,(function(e,n){(t||n!==j.NO_MATCH_IN_SOURCES)&&i.push({id:e,problem:n})})),i}function S(e,n,t,i){function a(e){return t?null===e||void 0===e?void 0:e.includes(n):null===e||void 0===e?void 0:e.toLowerCase().includes(n.toLowerCase())}switch(e.type){case h.NodeType.VALUE:(a(e.id)||Object.values(e.values).some(a))&&i(e.id);break;case h.NodeType.OBJECT:!e.children.length&&a(e.id)&&i(e.id),e.children.forEach((function(e){return S(e,n,t,i)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function y(e,n,t){var i=[];return S(e,n,t,(function(e){i.push(e)})),i}function A(e,n){switch(e.type){case h.NodeType.VALUE:n(e.id);break;case h.NodeType.OBJECT:e.children.length||n(e.id),e.children.forEach((function(e){return A(e,n)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function T(e){var n=[];return A(e,(function(e){n.push(e)})),n}!function(e){e.MISSING="MISSING",e.EMPTY="EMPTY",e.DEFAULT="DEFAULT",e.SAME="SAME",e.PLACEHOLDER_MISMATCH="PLACEHOLDER_MISMATCH",e.NO_MATCH_IN_SOURCES="NO_MATCH_IN_SOURCES",e.PARTIAL_MATCH_IN_SOURCES="PARTIAL_MATCH_IN_SOURCES"}(j||(j={}));var M,k=c.a.createContext({}),_=t(161),w=t.n(_),N=t.p+"static/media/add.d8693632.svg",I=t.p+"static/media/edit.962e7af9.svg",L=t.p+"static/media/confirm.0addefb3.svg",R=t.p+"static/media/cancel.caea72e4.svg",U=t.p+"static/media/trash.85c719f0.svg",P=t.p+"static/media/copy.2327b577.svg",D=t.p+"static/media/code.33554129.svg",H=t.p+"static/media/section.774f12f9.svg",F=t.p+"static/media/value.cddb19bc.svg",V=t.p+"static/media/vscode.ea98ae01.svg",G=t.p+"static/media/google-translate.0346cfbe.svg",B=t.p+"static/media/deepl.36a3b23e.svg",J=t(85),Y=t(361);function W(e){var n=e.onClick,t=e.loading,i=Object(Y.a)(e,["onClick","loading"]),c=Object(a.useCallback)((function(){if(!t){for(var e=arguments.length,i=new Array(e),a=0;a<e;a++)i[a]=arguments[a];null===n||void 0===n||n.apply(void 0,i)}}),[t,n]);return Object(b.jsx)(q,Object(J.a)({onClick:c,loading:t},i))}var z,Q,q=s.a.span(M||(M=Object(l.a)(["\n  cursor: pointer;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  min-width: 1em;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: ",";\n    font-weight: bold;\n  }\n\n  &:hover > * {\n    transform: scale(1.5, 1.5);\n  }\n"])),(function(e){return e.loading?"0.5":"1"})),K=t(359);function X(e){var n=e.operation,t=e.buttons,i=e.visible,a=void 0===i||i,c=e.copyString,o={opacity:a?1:0};return Object(b.jsxs)(te,{style:o,children:[n?Object(b.jsx)(ie,{children:Object(b.jsx)("img",{src:n.image,width:"16",alt:n.name})}):null,t.map((function(e){return e?Object(b.jsx)(W,{onClick:function(n){e.callback(),n.stopPropagation()},title:e.name,children:Object(b.jsx)("img",{src:e.image,width:"12",alt:e.name})},e.name):null})),c?Object(b.jsx)(K.CopyToClipboard,{text:c,children:Object(b.jsx)(W,{title:'copy "'.concat(c,'"'),children:Object(b.jsx)("img",{src:P,width:"12",alt:"copy ".concat(c)})})}):null]})}function Z(e){var n=e.visible,t=e.onAdd,i=e.onRemove,a=e.onEdit,c=e.onSources,o=e.copyString;return Object(b.jsx)(X,{visible:n,buttons:[t&&{name:"add",image:N,callback:t},i&&{name:"remove",image:U,callback:i},a&&{name:"edit",image:I,callback:a},c&&{name:"show in sources",image:D,callback:c}],copyString:o})}function $(e){var n=e.onConfirm,t=e.onCancel,i=e.editMode,a=i?"edit":"remove";return Object(b.jsx)(X,{operation:{name:a,image:i?I:U},buttons:[{name:"confirm ".concat(a),image:L,callback:n},{name:"cancel ".concat(a),image:R,callback:t}]})}function ee(e){var n=e.onObject,t=e.onValue,i=e.onCancel;return Object(b.jsx)(X,{operation:{name:"add",image:N},buttons:[{name:"section",image:H,callback:n},{name:"value",image:F,callback:t},{name:"cancel",image:R,callback:i}]})}var ne,te=s.a.div(z||(z=Object(l.a)(["\n  cursor: default;\n"]))),ie=s.a.span(Q||(Q=Object(l.a)(["\n  font-size: 10px;\n  opacity: 0.8;\n"]))),ae=function(e){Object(a.useEffect)((function(){if(e){var n=function(n){27===n.keyCode&&e()};return window.addEventListener("keydown",n),function(){window.removeEventListener("keydown",n)}}}),[e])};!function(e){e.remove="REMOVE_MODE",e.edit="EDIT_MODE",e.add="ADD_MODE"}(ne||(ne={}));var ce,oe,re,le,ue,de,se,be=function(e){var n=e.editing,t=e.visible,i=e.onAdd,c=e.onRemove,o=e.onConfirmEdit,r=e.onCancelEdit,l=e.onBeginEdit,u=void 0===l?function(){}:l,s=e.onSources,f=e.copyString,j=Object(a.useState)(n?ne.edit:void 0),O=Object(d.a)(j,2),p=O[0],v=O[1];function g(e){return function(){v(void 0),null===e||void 0===e||e()}}switch(Object(a.useEffect)((function(){v(n?ne.edit:void 0)}),[n]),ae(p&&g(p===ne.edit?r:void 0)),p){case ne.add:return Object(b.jsx)(ee,{onObject:g((function(){return null===i||void 0===i?void 0:i(h.NodeType.OBJECT)})),onValue:g((function(){return null===i||void 0===i?void 0:i(h.NodeType.VALUE)})),onCancel:g()});case ne.remove:case ne.edit:return Object(b.jsx)($,{editMode:p===ne.edit,onConfirm:g(p===ne.edit?o:c),onCancel:g(p===ne.edit?r:void 0)});default:return Object(b.jsx)(Z,{visible:t,copyString:f,onAdd:i&&function(){return v(ne.add)},onRemove:c&&function(){return v(ne.remove)},onEdit:o&&function(){v(ne.edit),null===u||void 0===u||u()},onSources:s})}},fe=t(160),je=t(360),Oe=t.n(je);function pe(e){var n=e.text,t=e.fromLanguage,i=e.toLanguage,a="Open on GoogleTranslate";return Object(b.jsx)("a",{href:"https://translate.google.com/?sl=".concat(encodeURIComponent(t),"&tl=").concat(encodeURIComponent(i),"&text=").concat(encodeURIComponent(n)),target:"_blank",rel:"noreferrer",children:Object(b.jsx)(W,{title:a,children:Object(b.jsx)("img",{src:G,width:"12",alt:a})})})}function ve(e){var n=e.text,t=e.fromLanguage,i=e.toLanguage,c=e.onResult,o="Translate with DeepL",r=Object(a.useState)(!1),l=Object(d.a)(r,2),u=l[0],s=l[1],f=Object(a.useContext)(k).deepLKey,j=Object(a.useCallback)((function(){f&&(s(!0),Oe()({text:n,source_lang:t.toUpperCase(),target_lang:i.toUpperCase(),auth_key:f,free_api:f.endsWith(":fx")}).then((function(e){return c(e.data.translations[0].text)})).catch((function(e){return console.error(e)})).finally((function(){return s(!1)})))}),[f,n,t,i,c]);return f?Object(b.jsx)(W,{title:o,onClick:j,loading:u,children:Object(b.jsx)("img",{src:B,width:"12",alt:o})}):null}function he(e){var n,t=e.id,i=e.file,c=e.line,o=e.contextStartLine,r=e.context,l=e.type,u=Object(a.useContext)(k).onOpen,d=null===(n=r[c-o])||void 0===n?void 0:n.indexOf(t);return d=-1===d?void 0:d,Object(b.jsxs)(Me,{type:l,children:[Object(b.jsx)(ke,{children:Object(b.jsxs)(_e,{title:"Open in VSCode",onClick:function(){return null===u||void 0===u?void 0:u(i,c,d?d+1:void 0)},children:[Object(b.jsx)(we,{children:i}),":",c]})}),r.map((function(e,n){var i=c===n+o,a=Object(b.jsx)(Le,{children:e});return i&&void 0!==d&&(a=Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Le,{children:e.substring(0,d)}),Object(b.jsx)(Le,{highlighted:!0,children:t}),Object(b.jsx)(Le,{children:e.substring(d+t.length)})]})),Object(b.jsxs)(Ne,{highlighted:i,type:l,children:[Object(b.jsx)(Ie,{highlighted:i,children:n+o}),a]},n)}))]})}var ge,me,xe,Ee,Ce,Se,ye,Ae,Te,Me=s.a.div(ce||(ce=Object(l.a)(["\n  border: 0.5px solid black;\n  border-color: ",";\n  font-family: monospace, monospace;\n"])),(function(e){return e.type===h.MatchType.EXACT?"black":"darkseagreen"})),ke=s.a.div(oe||(oe=Object(l.a)(["\n  background-color: lightgrey;\n  padding: 0 8px;\n"]))),_e=s.a.span(re||(re=Object(l.a)(["\n  &:hover {\n    text-decoration: underline;\n    cursor: pointer;\n    :after {\n      padding-left: 4px;\n      content: url(",");\n    }\n  }\n"])),V),we=s.a.span(le||(le=Object(l.a)(["\n  font-weight: bold;\n"]))),Ne=s.a.div(ue||(ue=Object(l.a)(["\n  background-color: ",";\n  margin: 0 8px;\n"])),(function(e){var n=e.highlighted,t=e.type;return n?t===h.MatchType.EXACT?"lightgreen":"darkseagreen":"transparent"})),Ie=s.a.span(de||(de=Object(l.a)(["\n  color: ",";\n  margin: 0 8px;\n  user-select: none;\n"])),(function(e){return e.highlighted?"black":"lightgrey"})),Le=s.a.pre(se||(se=Object(l.a)(["\n  display: inline;\n  margin: 0;\n  font-weight: ",";\n"])),(function(e){return e.highlighted?"bold":"normal"}));function Re(e){var n=e.language,t=e.editing,i=e.value,c=e.onChange,o=e.onEdit,r=e.issues,l=e.hintForTranslation,u=Object(a.useState)(!1),s=Object(d.a)(u,2),f=s[0],j=s[1],O=Object(a.useState)(!1),p=Object(d.a)(O,2),v=p[0],h=p[1],g=Object(a.useState)(),m=Object(d.a)(g,2),x=m[0],E=m[1];Object(a.useEffect)((function(){t||(j(!1),h(!1))}),[t]);var C=Object(a.useCallback)((function(){return o(!1)}),[o]),S=Object(a.useCallback)((function(e){c(e.target.value),j(!1)}),[c]);return ae(t?C:void 0),Object(b.jsxs)(Qe,{children:[Object(b.jsx)(We,{children:n}),t?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(Ke,{style:x,onFocus:function(){return h(!0)},autoFocus:f,value:i||"",onChange:S,ref:function(e){e&&f&&e.select()}}),v&&l?Object(b.jsxs)(Xe,{children:[Object(b.jsx)(ve,{text:l.value,fromLanguage:l.language,toLanguage:n,onResult:c}),Object(b.jsx)(pe,{text:l.value,fromLanguage:l.language,toLanguage:n})]}):null]}):Object(b.jsx)(qe,{problems:r.map((function(e){return e.problem})),title:r.length?r.map((function(e){return e.hint})).join("\n"):void 0,onDoubleClick:function(){j(!0),o(!0)},ref:function(e){if(e){var n=e.offsetWidth,t=e.offsetHeight,i=e.offsetLeft||0;(null===x||void 0===x?void 0:x.width)===n&&(null===x||void 0===x?void 0:x.height)===t||E({width:n,height:t,maxWidth:document.body.offsetWidth-i-100})}},children:(null===i||void 0===i?void 0:i.trim())?i:null===i||void 0===i?"<missing>":'"'.concat(i,'"')})]})}function Ue(e){var n,t,i,c,o=e.node,r=Object(a.useState)(!1),l=Object(d.a)(r,2),u=l[0],s=l[1],f=Object(a.useState)(!1),O=Object(d.a)(f,2),p=O[0],v=O[1],h=Object(a.useState)(!1),m=Object(d.a)(h,2),E=m[0],C=m[1],S=Object(a.useState)(o.values),y=Object(d.a)(S,2),A=y[0],T=y[1],M=Object(a.useContext)(k),_=M.languages,N=M.onChangeValue,I=M.onRemove,L=M.problematicTranslations,R=M.disabled;ae(p?function(){return v(!1)}:void 0);var U=Object(a.useCallback)((function(){T(o.values),C(!1)}),[o]);Object(a.useEffect)((function(){R&&U()}),[R,U]);var P=(null===L||void 0===L?void 0:L.filter((function(e){return e.id===o.id})).map((function(e){return e.problem})))||[],D=[];P.includes(j.NO_MATCH_IN_SOURCES)&&D.push("\u26a0 No match found in the sources"),P.includes(j.PARTIAL_MATCH_IN_SOURCES)&&D.push("\u26a0 Partial match in sourcefiles");var H=(null===(n=o.exactSourceMatches)||void 0===n?void 0:n.length)||(null===(t=o.partialSourceMatches)||void 0===t?void 0:t.length);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)(Be,{onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},children:[Object(b.jsx)(Je,{title:D.length?"".concat(o.id,"\n").concat(D.join("\n")):o.id,problems:P,children:o.name}),Object(b.jsx)(Ye,{children:null===_||void 0===_?void 0:_.map((function(e){var n=A[e],t=[];if(!P.includes(j.MISSING)||void 0!==n&&null!==n?P.includes(j.EMPTY)&&!(null===n||void 0===n?void 0:n.trim())&&t.push({problem:j.EMPTY,hint:"\u26a0 Potential issue: Empty value"}):t.push({problem:j.MISSING,hint:"\u26a0 issue: Missing value"}),P.includes(j.DEFAULT)&&n===o.id&&t.push({problem:j.DEFAULT,hint:'\u26a0 Potential issue: Default value used "'.concat(n,'"')}),P.includes(j.SAME)){var i=Object.keys(A).find((function(t){return t!==e&&A[t]===n}));i&&t.push({problem:j.SAME,hint:'\u26a0 Potential issue: The same as the "'.concat(i,'" version')})}if(P.includes(j.PLACEHOLDER_MISMATCH)){var a=Object.keys(A).find((function(t){return t!==e&&!Object(g.isEqual)(x(A[t]),x(n))}));a&&t.push({problem:j.PLACEHOLDER_MISMATCH,hint:'\u26a0 Potential issue: Different placeholders from the "'.concat(a,'" version')})}var c=Object.keys(A).find((function(n){return n!==e&&A[n]&&A[n]!==o.id}));return Object(b.jsx)(Re,{language:e,editing:E,issues:t,value:n,hintForTranslation:c?{language:c,value:A[c]}:void 0,onChange:function(n){return T(Object(J.a)(Object(J.a)({},A),{},Object(fe.a)({},e,n)))},onEdit:function(e){C(!R&&e),e||T(o.values)}},e)}))}),Object(b.jsx)(be,{visible:u||p,editing:E,onBeginEdit:R?void 0:function(){return C(!0)},onConfirmEdit:R?void 0:function(){null===_||void 0===_||_.forEach((function(e){var n=A[e];n!==o.values[e]&&(null===N||void 0===N||N(o.id,e,n))})),C(!1)},onCancelEdit:R?void 0:U,onRemove:R?void 0:function(){null===I||void 0===I||I(o.id)},onSources:H?function(){return v((function(e){return!e}))}:void 0,copyString:o.id})]}),Object(b.jsx)(ze,{children:Object(b.jsxs)(w.a,{expanded:p,children:[null===(i=o.exactSourceMatches)||void 0===i?void 0:i.map((function(e,n){return Object(b.jsx)(he,Object(J.a)({},e),"exact-".concat(n))})),null===(c=o.partialSourceMatches)||void 0===c?void 0:c.map((function(e,n){return Object(b.jsx)(he,Object(J.a)({},e),"partial-".concat(n))}))]})})]})}var Pe,De,He,Fe,Ve,Ge,Be=s.a.div(ge||(ge=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 2px;\n"]))),Je=s.a.div(me||(me=Object(l.a)(["\n  cursor: default;\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px 0 0 4px;\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n"])),(function(e){var n=e.problems;return n.includes(j.MISSING)?"salmon":n.includes(j.EMPTY)||n.includes(j.DEFAULT)?"moccasin":n.includes(j.NO_MATCH_IN_SOURCES)?"lightgray":n.includes(j.PARTIAL_MATCH_IN_SOURCES)?"darkseagreen":n.length?"lightcyan":"lightgreen"})),Ye=s.a.div(xe||(xe=Object(l.a)([""]))),We=s.a.span(Ee||(Ee=Object(l.a)(["\n  cursor: default;\n  padding: 0 8px;\n  color: white;\n  background-color: black;\n"]))),ze=s.a.div(Ce||(Ce=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),Qe=s.a.div(Se||(Se=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  font-family: monospace, monospace;\n"]))),qe=s.a.div(ye||(ye=Object(l.a)(["\n  padding: 0 8px;\n  border: 0.5px solid black;\n  ","\n"])),(function(e){var n=e.problems;return n.includes(j.MISSING)?"background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;":n.includes(j.EMPTY)?"background-color: orange;":n.length?"background-color: lightcyan;":""})),Ke=s.a.textarea(Ae||(Ae=Object(l.a)(["\n  font-size: 16px;\n  min-height: 1em;\n"]))),Xe=s.a.div(Te||(Te=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"])));function Ze(e){var n=e.node,t=Object(a.useState)(!n.id),i=Object(d.a)(t,2),c=i[0],o=i[1],r=Object(a.useState)(!1),l=Object(d.a)(r,2),u=l[0],s=l[1],f=Object(a.useState)(),O=Object(d.a)(f,2),p=O[0],v=O[1],g=Object(a.useState)(""),m=Object(d.a)(g,2),x=m[0],E=m[1],C=Object(a.useContext)(k),S=C.onAdd,y=C.onRemove,A=C.problematicTranslations,T=C.filteredIds,M=C.disabled,_=C.collapseAll,N=C.onCollapseChange,I=Object(a.useCallback)((function(){v(void 0),E("")}),[]);Object(a.useEffect)((function(){c&&!M||I()}),[M,c,I]),Object(a.useEffect)((function(){void 0!==_&&o(!_)}),[_]),ae(p&&I);var U=null===A||void 0===A?void 0:A.filter((function(e){var t=e.id;return t===n.id||t.startsWith("".concat(n.id,"."))})).map((function(e){return e.problem})),P=(null===U||void 0===U?void 0:U.includes(j.MISSING))?j.MISSING:(null===U||void 0===U?void 0:U.includes(j.EMPTY))?j.EMPTY:(null===U||void 0===U?void 0:U.includes(j.NO_MATCH_IN_SOURCES))?j.NO_MATCH_IN_SOURCES:(null===U||void 0===U?void 0:U.includes(j.DEFAULT))?j.DEFAULT:(null===U||void 0===U?void 0:U.includes(j.SAME))?j.SAME:void 0,D=x&&/^\w+$/.test(x)&&!n.children.some((function(e){return e.name===x})),H=D&&p?function(){null===S||void 0===S||S(n.id,p,x),I()}:void 0,F=Object(a.useCallback)((function(){null===N||void 0===N||N(),o((function(e){return!e}))}),[N]),V=Object(a.useCallback)((function(){return s(!0)}),[]),G=Object(a.useCallback)((function(){return s(!1)}),[]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)($e,{onClick:F,onMouseEnter:V,onMouseLeave:G,children:[Object(b.jsxs)(nn,{id:n.id,problem:P,expanded:c,title:n.id,children:[Object(b.jsx)(en,{children:c?"-":"+"}),n.name]}),c?!p&&!M&&Object(b.jsx)(be,{visible:u,onAdd:function(e){return v(e)},onRemove:n.id?function(){return null===y||void 0===y?void 0:y(n.id)}:void 0}):Object(b.jsx)(tn,{children:"{} ".concat(n.children.length," item").concat(1===n.children.length?"":"s")})]}),p?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(cn,{type:"text",autoFocus:!0,placeholder:p===h.NodeType.OBJECT?"new section":"new value",onChange:function(e){return E(e.target.value.trim())},onKeyPress:function(e){return"Enter"===e.key&&(null===H||void 0===H?void 0:H())}}),D?Object(b.jsx)(W,{onClick:H,children:Object(b.jsx)("img",{src:L,width:"16",alt:"confirm"})}):null,Object(b.jsx)(W,{onClick:I,children:Object(b.jsx)("img",{src:R,width:"16",alt:"cancel"})})]}):null,Object(b.jsx)(an,{children:Object(b.jsx)(w.a,{expanded:c,children:n.children.map((function(e){return T&&!T.some((function(n){return n===e.id||n.startsWith("".concat(e.id,"."))}))?null:e.type===h.NodeType.OBJECT?Object(b.jsx)(Ze,{node:e},e.id):Object(b.jsx)(Ue,{node:e},e.id)}))})})]})}var $e=s.a.div(Pe||(Pe=Object(l.a)(["\n  cursor: default;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n"]))),en=s.a.span(De||(De=Object(l.a)(["\n  min-width: 10px;\n  margin-right: 2px;\n"]))),nn=s.a.span(He||(He=Object(l.a)(["\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px;\n\n  &:hover {\n    font-weight: bold;\n  }\n"])),(function(e){var n=e.id,t=e.problem,i=e.expanded;if(!n)return"white";switch(t){case j.MISSING:return i?"pink":"salmon";case j.EMPTY:case j.DEFAULT:return i?"white":"moccasin";case j.SAME:return i?"white":"lightcyan";case j.NO_MATCH_IN_SOURCES:return i?"white":"lightgrey";default:return i?"mintcream":"lightgreen"}})),tn=s.a.span(Fe||(Fe=Object(l.a)(["\n  color: grey;\n  margin: 0 8px;\n"]))),an=s.a.div(Ve||(Ve=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),cn=s.a.input(Ge||(Ge=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 20px;\n  margin-bottom: 4px;\n"])));function on(e){var n=e.data,t=e.sourceMatches,i=e.filter,c=i.text,o=i.caseSensitive,r=i.problems,l=e.onSendMessage,u=e.disabled,s=e.collapseAll,f=e.onCollapseChange,j=Object(a.useState)([]),O=Object(d.a)(j,2),p=O[0],v=O[1];Object(a.useEffect)((function(){var e;(null===n||void 0===n||null===(e=n.languages)||void 0===e?void 0:e.length)&&v(C(n.content,n.languages,t))}),[t,n]);var g=Object(a.useState)(),x=Object(d.a)(g,2),E=x[0],S=x[1];Object(a.useEffect)((function(){S(n&&c?y(n.content,c,o):void 0)}),[o,c,n]);var A=E;if(n&&(null===r||void 0===r?void 0:r.length)){var M=E||T(n.content),_=p.reduce((function(e,n){var t=n.id,i=n.problem;return e[t]?e[t].push(i):e[t]=[i],e}),{});A=M.filter((function(e){var n;return r.includes(m)&&!_[e]||(null===(n=_[e])||void 0===n?void 0:n.some((function(e){return r.includes(e)})))}))}return Object(b.jsx)(k.Provider,{value:{collapseAll:s,onCollapseChange:f,disabled:u,filteredIds:A,problematicTranslations:p,languages:null===n||void 0===n?void 0:n.languages,deepLKey:null===n||void 0===n?void 0:n.deepLKey,onAdd:function(e,n,t){return l(h.Action.add(e,n,t))},onChangeValue:function(e,n,t){return l(h.Action.changeValue(e,n,t))},onRemove:function(e){return l(h.Action.remove(e))},onOpen:function(e,n,t){return l(h.Action.open(e,n,t))}},children:n?Object(b.jsx)(Ze,{node:n.content}):null})}var rn,ln,un,dn,sn,bn,fn,jn,On,pn=t(72),vn=t.n(pn),hn=t(162);function gn(){var e=Object(hn.useParseQuery)(new vn.a.Query("Language"),{enableLocalDatastore:!0,enableLiveQuery:!1}),n=Object(hn.useParseQuery)(new vn.a.Query("Translation").equalTo("objectId","owp5Fexxtk"),{enableLocalDatastore:!0,enableLiveQuery:!0});console.log(e,n);var t=function(){var e=new URL(window.location.href),n=e.searchParams.get("serverPort")||e.port;return"".concat(e.hostname,":").concat(n)}(),i=Object(a.useState)(),c=Object(d.a)(i,2),o=c[0],r=c[1],l=Object(a.useState)(!1),s=Object(d.a)(l,2),O=s[0],g=s[1],x=Object(a.useState)(""),E=Object(d.a)(x,2),C=E[0],S=E[1],y=Object(a.useState)(!1),A=Object(d.a)(y,2),T=A[0],M=A[1],k=Object(a.useState)([]),_=Object(d.a)(k,2),w=_[0],N=_[1],I=Object(a.useState)(),L=Object(d.a)(I,2),R=L[0],U=L[1],P=Object(a.useState)(),D=Object(d.a)(P,2),H=D[0],F=D[1],V=Object(a.useCallback)((function(e){switch(e.action){case h.ActionType.DATA_UPDATE:F(e.data);break;case h.ActionType.SOURCE_MATCHES_UPDATE:U(e.data);break;default:console.error("Invalid action:",e.action)}}),[]),G=v()("ws://".concat(t),{retryOnError:!0,shouldReconnect:function(){return!0},reconnectAttempts:100,onMessage:function(e){return V(JSON.parse(e.data))}}),B=G.sendMessage,J=G.readyState,Y=Object(a.useCallback)((function(){switch(J){case p.ReadyState.OPEN:return"Connected";case p.ReadyState.CONNECTING:return"Connecting";case p.ReadyState.CLOSED:return"Server not reachable";default:return"Unknown"}}),[J]),W=Object(a.useCallback)((function(e){B(JSON.stringify(e))}),[B]),z=Object(a.useCallback)((function(){return r(void 0)}),[]);Object(a.useEffect)((function(){J===p.ReadyState.OPEN&&fetch("http://".concat(t,"/data")).then((function(e){return e.json()})).then(F)}),[J,t]);var Q=!!R,q=Object(a.useMemo)((function(){return[m].concat(Object(u.a)(Object.values(j))).filter((function(e){return Q||e!==j.NO_MATCH_IN_SOURCES&&e!==j.PARTIAL_MATCH_IN_SOURCES}))}),[Q]);return Object(b.jsxs)(mn,{children:[Object(b.jsxs)(xn,{children:[Object(b.jsx)(Mn,{status:J,children:Y()}),Object(b.jsx)(En,{children:Object(b.jsxs)("span",{children:[Object(b.jsx)("button",{disabled:!1===o,onClick:function(){return r(!1)},title:"Expand All",children:"+"}),Object(b.jsx)("button",{disabled:o,onClick:function(){return r(!0)},title:"Collapse All",children:"-"})]})}),Object(b.jsx)(Cn,{children:Object(b.jsxs)("span",{children:["Filter:",Object(b.jsx)(yn,{onChange:function(e){return S(e.target.value.trim())}}),Object(b.jsx)("input",{type:"checkbox",name:"case sensitive",checked:O,onChange:function(e){return g(e.target.checked)}}),"case sensitive",Object(b.jsxs)(Sn,{children:[Object(b.jsx)("button",{onClick:function(){return M((function(e){return!e}))},children:"Problems"}),T&&Object(b.jsx)(An,{children:q.map((function(e){return Object(b.jsxs)("span",{children:[Object(b.jsx)("input",{type:"checkbox",name:e,checked:w.includes(e),onChange:function(n){return N((function(t){return n.target.checked?[].concat(Object(u.a)(t),[e]):t.filter((function(n){return n!==e}))}))}}),e]},e)}))})]})]})})]}),Object(b.jsxs)(Tn,{children:[!H&&"No data",Object(b.jsx)(on,{data:H,sourceMatches:R,collapseAll:o,onCollapseChange:z,filter:{text:C,caseSensitive:O,problems:w},onSendMessage:W,disabled:J!==p.ReadyState.OPEN})]}),Object(b.jsx)(f,{})]})}Object(hn.initializeParse)("https://translation.b4a.io/","ZqSPDyNGkCzQYoQfxgGEUgpO4tp9Rc7z4DhJQNWI","6aZHlL6cm2kX99WmKTATP7rZUCGvPmNNpFF76EqM");var mn=s.a.div(rn||(rn=Object(l.a)(['\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400;\n']))),xn=s.a.div(ln||(ln=Object(l.a)(["\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 1em;\n  padding-right: 1em;\n"]))),En=s.a.div(un||(un=Object(l.a)(["\n  flex: 1;\n  display: flex;\n  justify-content: space-around;\n"]))),Cn=s.a.div(dn||(dn=Object(l.a)(["\n  flex: 3;\n  display: flex;\n  justify-content: space-around;\n"]))),Sn=s.a.div(sn||(sn=Object(l.a)(["\n  position: relative;\n"]))),yn=s.a.input(bn||(bn=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 1em;\n  min-width: min(50vw, 400px);\n"]))),An=s.a.div(fn||(fn=Object(l.a)(["\n  position: absolute;\n  background-color: #ffffff;\n  border: 0.5px solid black;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n"]))),Tn=s.a.div(jn||(jn=Object(l.a)(["\n  flex: 1;\n  min-width: 800px;\n  max-width: 95vw;\n  margin: 0 40px;\n  padding-top: 15px;\n  flex-direction: column;\n  align-items: center;\n"]))),Mn=s.a.span(On||(On=Object(l.a)(["\n  color: ",";\n"])),(function(e){var n=e.status;return n===p.ReadyState.OPEN?"darkgreen":n===p.ReadyState.CONNECTING?"black":"darkred"}));r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(gn,{})}),document.getElementById("root"))}},[[801,1,2]]]);
//# sourceMappingURL=main.bd350d06.chunk.js.map
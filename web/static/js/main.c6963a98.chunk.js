(this.webpackJsonplang_json_editor=this.webpackJsonplang_json_editor||[]).push([[0],{31:function(e,n,t){},5:function(e,n){var t={ADD:"ADD",CHANGE_VALUE:"CHANGE_VALUE",REMOVE:"REMOVE",OPEN:"OPEN",DATA_UPDATE:"DATA_UPDATE",SOURCE_MATCHES_UPDATE:"SOURCE_MATCHES_UPDATE"},a={add:function(e,n,a){return{action:t.ADD,parentId:e,type:n,label:a}},changeValue:function(e,n,a){return{action:t.CHANGE_VALUE,id:e,language:n,value:a}},remove:function(e){return{action:t.REMOVE,id:e}},open:function(e,n,a){return{action:t.OPEN,file:e,line:n,column:a}},dataUpdate:function(e){return{action:t.DATA_UPDATE,data:e}},sourceMatchesUpdate:function(e){return{action:t.SOURCE_MATCHES_UPDATE,data:e}}};e.exports={NodeType:{OBJECT:"OBJECT",VALUE:"VALUE"},ActionType:t,Action:a,MatchType:{EXACT:"exact",PARTIAL:"partial"}}},62:function(e,n,t){"use strict";t.r(n);var a,c=t(1),i=t.n(c),o=t(22),r=t.n(o),l=(t(31),t(2)),s=t(4),u=t(3),d=t(0);function b(){var e=Object(c.useMemo)((function(){return(new Date).getFullYear()}),[]);return Object(d.jsx)(f,{children:"\xa9 Pavel Zarecky, ".concat(e)})}var f=u.a.div(a||(a=Object(l.a)(["\n  padding-right: 15px;\n  text-align: end;\n"]))),j=t(6),p=t.n(j),h=t(5),O=t(10),g="MISSING",v="EMPTY",m="DEFAULT",x="SAME",y="PLACEHOLDER_MISMATCH",E="NO_MATCH_IN_SOURCES",C="PARTIAL_MATCH_IN_SOURCES";function S(e){var n=null===e||void 0===e?void 0:e.match(/{{\w+}}/g);return n?Array.from(new Set(n.map((function(e){return e.substring(2,e.length-2)})))).sort():[]}function k(e,n,t,a){switch(e.type){case h.NodeType.VALUE:e.exactSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id,a=n.type;return t===e.id&&a===h.MatchType.EXACT})))||[],e.partialSourceMatches=(null===t||void 0===t?void 0:t.filter((function(n){var t=n.id;return e.id.startsWith("".concat(t,"."))||e.id.startsWith("".concat(t,"_plural"))})))||[],n.some((function(n){return void 0===e.values[n]||null===e.values[n]}))?a(e.id,g):n.some((function(n){return!e.values[n].trim()}))&&a(e.id,v);var c=e.exactSourceMatches.length,i=e.partialSourceMatches.length;c||a(e.id,i?C:E),Object.values(e.values).sort().some((function(e,n,t){return n&&e===t[n-1]}))&&a(e.id,x),n.some((function(n){return e.values[n]===e.id}))&&a(e.id,m),Object.values(e.values).map(S).some((function(e,n,t){return n&&!Object(O.isEqual)(e,t[n-1])}))&&a(e.id,y);break;case h.NodeType.OBJECT:if(!e.children.length)return a(e.id,v);e.children.forEach((function(e){return k(e,n,t,a)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function A(e,n,t){var a=[];return k(e,n,t,(function(e,n){a.push({id:e,problem:n})})),a}function w(e,n,t,a){function c(e){return t?null===e||void 0===e?void 0:e.includes(n):null===e||void 0===e?void 0:e.toLowerCase().includes(n.toLowerCase())}switch(e.type){case h.NodeType.VALUE:(c(e.id)||Object.values(e.values).some(c))&&a(e.id);break;case h.NodeType.OBJECT:!e.children.length&&c(e.id)&&a(e.id),e.children.forEach((function(e){return w(e,n,t,a)}));break;default:throw new Error("Invalid type: ".concat(e.type))}}function T(e,n,t){var a=[];return w(e,n,t,(function(e){a.push(e)})),a}var M,N,R,D=i.a.createContext({}),U=t(12),P=t.n(U),_=t.p+"static/media/add.d8693632.svg",L=t.p+"static/media/edit.962e7af9.svg",I=t.p+"static/media/confirm.0addefb3.svg",V=t.p+"static/media/cancel.caea72e4.svg",F=t.p+"static/media/trash.85c719f0.svg",H=t.p+"static/media/copy.2327b577.svg",B=t.p+"static/media/code.33554129.svg",J=t.p+"static/media/section.774f12f9.svg",G=t.p+"static/media/value.cddb19bc.svg",z=t.p+"static/media/vscode.ea98ae01.svg",W=t.p+"static/media/google-translate.0346cfbe.svg",X=u.a.span(M||(M=Object(l.a)(["\n  cursor: pointer;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  min-width: 1em;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: 1;\n    font-weight: bold;\n  }\n\n  &:hover > * {\n    transform: scale(1.5, 1.5);\n  }\n"]))),q=t(26);function Y(e){var n=e.operation,t=e.buttons,a=e.visible,c=void 0===a||a,i=e.copyString,o={opacity:c?1:0};return Object(d.jsxs)(Q,{style:o,children:[n?Object(d.jsx)(ee,{children:Object(d.jsx)("img",{src:n.image,width:"16",alt:n.name})}):null,t.map((function(e){return e?Object(d.jsx)(X,{onClick:function(n){e.callback(),n.stopPropagation()},title:e.name,children:Object(d.jsx)("img",{src:e.image,width:"12",alt:e.name})},e.name):null})),i?Object(d.jsx)(q.CopyToClipboard,{text:i,title:'copy "'.concat(i,'"'),children:Object(d.jsx)(X,{children:Object(d.jsx)("img",{src:H,width:"12",alt:"copy ".concat(i)})})}):null]})}function K(e){var n=e.visible,t=e.onAdd,a=e.onRemove,c=e.onEdit,i=e.onSources,o=e.copyString;return Object(d.jsx)(Y,{visible:n,buttons:[t&&{name:"add",image:_,callback:t},a&&{name:"remove",image:F,callback:a},c&&{name:"edit",image:L,callback:c},i&&{name:"show in sources",image:B,callback:i}],copyString:o})}function Z(e){var n=e.onConfirm,t=e.onCancel,a=e.editMode,c=a?"edit":"remove";return Object(d.jsx)(Y,{operation:{name:c,image:a?L:F},buttons:[{name:"confirm ".concat(c),image:I,callback:n},{name:"cancel ".concat(c),image:V,callback:t}]})}function $(e){var n=e.onObject,t=e.onValue,a=e.onCancel;return Object(d.jsx)(Y,{operation:{name:"add",image:_},buttons:[{name:"section",image:J,callback:n},{name:"value",image:G,callback:t},{name:"cancel",image:V,callback:a}]})}var Q=u.a.div(N||(N=Object(l.a)(["\n  cursor: default;\n"]))),ee=u.a.span(R||(R=Object(l.a)(["\n  font-size: 10px;\n  opacity: 0.8;\n"]))),ne=function(e){Object(c.useEffect)((function(){if(e){var n=function(n){27===n.keyCode&&e()};return window.addEventListener("keydown",n),function(){window.removeEventListener("keydown",n)}}}),[e])},te="REMOVE_MODE",ae="EDIT_MODE",ce="ADD_MODE",ie=function(e){var n=e.editing,t=e.visible,a=e.onAdd,i=e.onRemove,o=e.onConfirmEdit,r=e.onCancelEdit,l=e.onBeginEdit,u=e.onSources,b=e.copyString,f=Object(c.useState)(n?ae:void 0),j=Object(s.a)(f,2),p=j[0],O=j[1];Object(c.useEffect)((function(){O(n?ae:void 0)}),[n]);var g=function(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),a=1;a<n;a++)t[a-1]=arguments[a];return function(){O(void 0),null===e||void 0===e||e.apply(void 0,t)}};switch(ne(p&&g(p===ae?r:void 0)),p){case ce:return Object(d.jsx)($,{onObject:g(a,h.NodeType.OBJECT),onValue:g(a,h.NodeType.VALUE),onCancel:g()});case te:case ae:return Object(d.jsx)(Z,{editMode:p===ae,onConfirm:g(p===ae?o:i),onCancel:g(p===ae?r:void 0)});default:return Object(d.jsx)(K,{visible:t,copyString:b,onAdd:a&&function(){return O(ce)},onRemove:i&&function(){return O(te)},onEdit:o&&function(){O(ae),null===l||void 0===l||l()},onSources:u})}};ie.defaultProps={onBeginEdit:function(){}};var oe,re,le,se,ue,de,be,fe=ie,je=t(11),pe=t(8);function he(e){var n=e.text,t=e.fromLanguage,a=e.toLanguage,c="Open on GoogleTranslate";return Object(d.jsx)("a",{href:"https://translate.google.com/?sl=".concat(encodeURIComponent(t),"&tl=").concat(encodeURIComponent(a),"&text=").concat(encodeURIComponent(n)),target:"_blank",rel:"noreferrer",children:Object(d.jsx)(X,{title:c,children:Object(d.jsx)("img",{src:W,width:"12",alt:c})})})}function Oe(e){var n,t=e.id,a=e.file,i=e.line,o=e.contextStartLine,r=e.context,l=e.type,s=Object(c.useContext)(D).onOpen,u=null===(n=r[i-o])||void 0===n?void 0:n.indexOf(t);return u=-1===u?void 0:u,Object(d.jsxs)(ke,{type:l,children:[Object(d.jsx)(Ae,{children:Object(d.jsxs)(we,{title:"Open in VSCode",onClick:function(){return s(a,i,u?u+1:void 0)},children:[Object(d.jsx)(Te,{children:a}),":",i]})}),r.map((function(e,n){var a=i===n+o,c=Object(d.jsx)(Re,{children:e});return a&&void 0!==u&&(c=Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(Re,{children:e.substring(0,u)}),Object(d.jsx)(Re,{highlighted:!0,children:t}),Object(d.jsx)(Re,{children:e.substring(u+t.length)})]})),Object(d.jsxs)(Me,{highlighted:a,type:l,children:[Object(d.jsx)(Ne,{highlighted:a,children:n+o}),c]},n)}))]})}var ge,ve,me,xe,ye,Ee,Ce,Se,ke=u.a.div(oe||(oe=Object(l.a)(["\n  border: 0.5px solid black;\n  border-color: ",";\n  font-family: monospace, monospace;\n"])),(function(e){return e.type===h.MatchType.EXACT?"black":"darkseagreen"})),Ae=u.a.div(re||(re=Object(l.a)(["\n  background-color: lightgrey;\n  padding: 0 8px;\n"]))),we=u.a.span(le||(le=Object(l.a)(["\n  &:hover {\n    text-decoration: underline;\n    cursor: pointer;\n    :after {\n      padding-left: 4px;\n      content: url(",");\n    }\n  }\n"])),z),Te=u.a.span(se||(se=Object(l.a)(["\n  font-weight: bold;\n"]))),Me=u.a.div(ue||(ue=Object(l.a)(["\n  background-color: ",";\n  margin: 0 8px;\n"])),(function(e){var n=e.highlighted,t=e.type;return n?t===h.MatchType.EXACT?"lightgreen":"darkseagreen":"transparent"})),Ne=u.a.span(de||(de=Object(l.a)(["\n  color: ",";\n  margin: 0 8px;\n  user-select: none;\n"])),(function(e){return e.highlighted?"black":"lightgrey"})),Re=u.a.pre(be||(be=Object(l.a)(["\n  display: inline;\n  margin: 0;\n  font-weight: ",";\n"])),(function(e){return e.highlighted?"bold":"normal"}));function De(e){var n=e.language,t=e.editing,a=e.value,i=e.onChange,o=e.onEdit,r=e.issues,l=e.hintForTranslation,u=Object(c.useState)(!1),b=Object(s.a)(u,2),f=b[0],j=b[1],p=Object(c.useState)(!1),h=Object(s.a)(p,2),O=h[0],g=h[1],v=Object(c.useState)(),m=Object(s.a)(v,2),x=m[0],y=m[1];Object(c.useEffect)((function(){t||(j(!1),g(!1))}),[t]);var E=Object(c.useCallback)((function(){return o(!1)}),[o]),C=Object(c.useCallback)((function(e){i(e.target.value),j(!1)}),[i]);return ne(t&&E),Object(d.jsxs)(We,{value:a,children:[Object(d.jsx)(Ge,{children:n}),t?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(qe,{style:x,onFocus:function(){return g(!0)},autoFocus:f,value:a||"",onChange:C,ref:function(e){e&&f&&e.select()}}),O&&l?Object(d.jsx)(he,{text:l.value,fromLanguage:l.language,toLanguage:n}):null]}):Object(d.jsx)(Xe,{value:a,problems:r.map((function(e){return e.problem})),title:r.length?r.map((function(e){return e.hint})).join("\n"):void 0,onDoubleClick:function(){j(!0),o(!0)},ref:function(e){if(e){var n=e.offsetWidth,t=e.offsetHeight;(null===x||void 0===x?void 0:x.width)===n&&(null===x||void 0===x?void 0:x.height)===t||y({width:n,height:t})}},children:(null===a||void 0===a?void 0:a.trim())?a:null===a||void 0===a?"<missing>":'"'.concat(a,'"')})]})}function Ue(e){var n,t,a,i,o=e.node,r=Object(c.useState)(!1),l=Object(s.a)(r,2),u=l[0],b=l[1],f=Object(c.useState)(!1),j=Object(s.a)(f,2),p=j[0],h=j[1],k=Object(c.useState)(!1),A=Object(s.a)(k,2),w=A[0],T=A[1],M=Object(c.useState)(o.values),N=Object(s.a)(M,2),R=N[0],U=N[1],_=Object(c.useContext)(D),L=_.languages,I=_.onChangeValue,V=_.onRemove,F=_.problematicTranslations,H=_.disabled;ne(p&&function(){return h(!1)});var B=Object(c.useCallback)((function(){U(o.values),T(!1)}),[o]);Object(c.useEffect)((function(){H&&B()}),[H,B]);var J=(null===F||void 0===F?void 0:F.filter((function(e){return e.id===o.id})).map((function(e){return e.problem})))||[],G=[];J.includes(E)&&G.push("\u26a0 No match found in the sources"),J.includes(C)&&G.push("\u26a0 Partial match in sourcefiles");var z=(null===(n=o.exactSourceMatches)||void 0===n?void 0:n.length)||(null===(t=o.partialSourceMatches)||void 0===t?void 0:t.length);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(He,{onMouseEnter:function(){return b(!0)},onMouseLeave:function(){return b(!1)},children:[Object(d.jsx)(Be,{title:G.length?"".concat(o.id,"\n").concat(G.join("\n")):o.id,problems:J,children:o.name}),Object(d.jsx)(Je,{children:L.map((function(e){var n=R[e],t=[];if(!J.includes(g)||void 0!==n&&null!==n?J.includes(v)&&!(null===n||void 0===n?void 0:n.trim())&&t.push({problem:v,hint:"\u26a0 Potential issue: Empty value"}):t.push({problem:g,hint:"\u26a0 issue: Missing value"}),J.includes(m)&&n===o.id&&t.push({problem:m,hint:'\u26a0 Potential issue: Default value used "'.concat(n,'"')}),J.includes(x)){var a=Object.keys(R).find((function(t){return t!==e&&R[t]===n}));a&&t.push({problem:x,hint:'\u26a0 Potential issue: The same as the "'.concat(a,'" version')})}if(J.includes(y)){var c=Object.keys(R).find((function(t){return t!==e&&!Object(O.isEqual)(S(R[t]),S(n))}));c&&t.push({problem:y,hint:'\u26a0 Potential issue: Different placeholders from the "'.concat(c,'" version')})}var i=Object.keys(R).find((function(n){return n!==e&&R[n]}));return Object(d.jsx)(De,{language:e,editing:w,issues:t,value:n,hintForTranslation:i&&{language:i,value:R[i]},onChange:function(n){return U(Object(pe.a)(Object(pe.a)({},R),{},Object(je.a)({},e,n)))},onEdit:function(e){T(!H&&e),e||U(o.values)}},e)}))}),Object(d.jsx)(fe,{visible:u||p,editing:w,onBeginEdit:!H&&function(){return T(!0)},onConfirmEdit:!H&&function(){L.forEach((function(e){var n=R[e];n!==o.values[e]&&I(o.id,e,n)})),T(!1)},onCancelEdit:!H&&B,onRemove:!H&&function(){V(o.id)},onSources:z?function(){return h((function(e){return!e}))}:void 0,copyString:o.id})]}),Object(d.jsx)(ze,{children:Object(d.jsxs)(P.a,{expanded:p,children:[null===(a=o.exactSourceMatches)||void 0===a?void 0:a.map((function(e,n){return Object(d.jsx)(Oe,Object(pe.a)({},e),"exact-".concat(n))})),null===(i=o.partialSourceMatches)||void 0===i?void 0:i.map((function(e,n){return Object(d.jsx)(Oe,Object(pe.a)({},e),"partial-".concat(n))}))]})})]})}var Pe,_e,Le,Ie,Ve,Fe,He=u.a.div(ge||(ge=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 2px;\n"]))),Be=u.a.div(ve||(ve=Object(l.a)(["\n  cursor: default;\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px 0 0 4px;\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n"])),(function(e){var n=e.problems;return n.includes(g)?"salmon":n.includes(v)||n.includes(m)?"moccasin":n.includes(E)?"lightgray":n.includes(C)?"darkseagreen":n.length?"lightcyan":"lightgreen"})),Je=u.a.div(me||(me=Object(l.a)([""]))),Ge=u.a.span(xe||(xe=Object(l.a)(["\n  cursor: default;\n  padding: 0 8px;\n  color: white;\n  background-color: black;\n"]))),ze=u.a.div(ye||(ye=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),We=u.a.div(Ee||(Ee=Object(l.a)(["\n  display: flex;\n  flex-direction: row;\n  font-family: monospace, monospace;\n"]))),Xe=u.a.div(Ce||(Ce=Object(l.a)(["\n  padding: 0 8px;\n  border: 0.5px solid black;\n  ","\n"])),(function(e){var n=e.problems;return n.includes(g)?"background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;":n.includes(v)?"background-color: orange;":n.length?"background-color: lightcyan;":""})),qe=u.a.textarea(Se||(Se=Object(l.a)(["\n  font-size: 16px;\n"])));function Ye(e){var n=e.node,t=Object(c.useState)(!n.id),a=Object(s.a)(t,2),i=a[0],o=a[1],r=Object(c.useState)(!1),l=Object(s.a)(r,2),u=l[0],b=l[1],f=Object(c.useState)(),j=Object(s.a)(f,2),p=j[0],O=j[1],y=Object(c.useState)(""),C=Object(s.a)(y,2),S=C[0],k=C[1],A=Object(c.useContext)(D),w=A.onAdd,T=A.onRemove,M=A.problematicTranslations,N=A.filteredIds,R=A.disabled,U=A.collapseAll,_=A.onCollapseChange,L=Object(c.useCallback)((function(){O(void 0),k("")}),[]);Object(c.useEffect)((function(){i&&!R||L()}),[R,i,L]),Object(c.useEffect)((function(){void 0!==U&&o(!U)}),[U]),ne(p&&L);var F=M.filter((function(e){var t=e.id;return t===n.id||t.startsWith("".concat(n.id,"."))})).map((function(e){return e.problem})),H=F.includes(g)?g:F.includes(v)?v:F.includes(E)?E:F.includes(m)?m:F.includes(x)?x:void 0,B=S&&/^\w+$/.test(S)&&!n.children.some((function(e){return e.name===S})),J=B?function(){w(n.id,p,S),L()}:void 0,G=Object(c.useCallback)((function(){_(),o((function(e){return!e}))}),[_]),z=Object(c.useCallback)((function(){return b(!0)}),[]),W=Object(c.useCallback)((function(){return b(!1)}),[]);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(an,{onClick:G,onMouseEnter:z,onMouseLeave:W,children:[Object(d.jsxs)(on,{id:n.id,problem:H,expanded:i,title:n.id,children:[Object(d.jsx)(cn,{children:i?"-":"+"}),n.name]}),i?!p&&!R&&Object(d.jsx)(fe,{visible:u,onAdd:function(e){return O(e)},onRemove:n.id&&function(){return T(n.id)}}):Object(d.jsx)(rn,{children:"{} ".concat(n.children.length," item").concat(1===n.children.length?"":"s")})]}),p?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(sn,{type:"text",autoFocus:!0,placeholder:p===h.NodeType.OBJECT?"new section":"new value",onChange:function(e){return k(e.target.value.trim())},onKeyPress:function(e){return"Enter"===e.key&&(null===J||void 0===J?void 0:J())}}),B?Object(d.jsx)(X,{onClick:J,children:Object(d.jsx)("img",{src:I,width:"16",alt:"confirm"})}):null,Object(d.jsx)(X,{onClick:L,children:Object(d.jsx)("img",{src:V,width:"16",alt:"cancel"})})]}):null,Object(d.jsx)(ln,{children:Object(d.jsx)(P.a,{expanded:i,children:n.children.map((function(e){return N&&!N.some((function(n){return n===e.id||n.startsWith("".concat(e.id,"."))}))?null:e.type===h.NodeType.OBJECT?Object(d.jsx)(Ye,{node:e},e.id):Object(d.jsx)(Ue,{node:e},e.id)}))})})]})}var Ke,Ze,$e,Qe,en,nn,tn,an=u.a.div(Pe||(Pe=Object(l.a)(["\n  cursor: default;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n"]))),cn=u.a.span(_e||(_e=Object(l.a)(["\n  min-width: 10px;\n  margin-right: 2px;\n"]))),on=u.a.span(Le||(Le=Object(l.a)(["\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px;\n\n  &:hover {\n    font-weight: bold;\n  }\n"])),(function(e){var n=e.id,t=e.problem,a=e.expanded;if(!n)return"white";switch(t){case g:return a?"pink":"salmon";case v:case m:return a?"white":"moccasin";case x:return a?"white":"lightcyan";case E:return a?"white":"lightgrey";default:return a?"mintcream":"lightgreen"}})),rn=u.a.span(Ie||(Ie=Object(l.a)(["\n  color: grey;\n  margin: 0 8px;\n"]))),ln=u.a.div(Ve||(Ve=Object(l.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"]))),sn=u.a.input(Fe||(Fe=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 20px;\n  margin-bottom: 4px;\n"])));function un(e){var n=e.data,t=e.sourceMatches,a=e.filter,i=a.text,o=a.caseSensitive,r=e.onSendMessage,l=e.disabled,u=e.collapseAll,b=e.onCollapseChange,f=Object(c.useState)(n),j=Object(s.a)(f,2),p=j[0],O=j[1];Object(c.useEffect)((function(){O(n)}),[n]);var g=Object(c.useState)([]),v=Object(s.a)(g,2),m=v[0],x=v[1];Object(c.useEffect)((function(){var e;(null===p||void 0===p||null===(e=p.languages)||void 0===e?void 0:e.length)&&x(A(p.content,p.languages,t))}),[t,p]);var y=Object(c.useState)(),E=Object(s.a)(y,2),C=E[0],S=E[1];return Object(c.useEffect)((function(){p&&i?S(T(p.content,i,o)):S()}),[o,i,p]),Object(d.jsx)(D.Provider,{value:{collapseAll:u,onCollapseChange:b,disabled:l,filteredIds:C,problematicTranslations:m,languages:null===p||void 0===p?void 0:p.languages,onAdd:function(e,n,t){return r(h.Action.add(e,n,t))},onChangeValue:function(e,n,t){return r(h.Action.changeValue(e,n,t))},onRemove:function(e){return r(h.Action.remove(e))},onOpen:function(e,n,t){return r(h.Action.open(e,n,t))}},children:p?Object(d.jsx)(Ye,{node:p.content}):null})}function dn(){var e=function(){var e=new URL(window.location.href),n=e.searchParams.get("serverPort")||e.port;return"".concat(e.hostname,":").concat(n)}(),n=Object(c.useState)(),t=Object(s.a)(n,2),a=t[0],i=t[1],o=Object(c.useState)(!1),r=Object(s.a)(o,2),l=r[0],u=r[1],f=Object(c.useState)(""),O=Object(s.a)(f,2),g=O[0],v=O[1],m=Object(c.useState)(),x=Object(s.a)(m,2),y=x[0],E=x[1],C=Object(c.useState)(),S=Object(s.a)(C,2),k=S[0],A=S[1],w=Object(c.useCallback)((function(e){switch(e.action){case h.ActionType.DATA_UPDATE:A(e.data);break;case h.ActionType.SOURCE_MATCHES_UPDATE:E(e.data);break;default:console.error("Invalid action:",e.action)}}),[]),T=p()("ws://".concat(e),{retryOnError:!0,shouldReconnect:function(){return!0},reconnectAttempts:100,onMessage:function(e){return w(JSON.parse(e.data))}}),M=T.sendMessage,N=T.readyState,R=Object(c.useCallback)((function(){switch(N){case j.ReadyState.OPEN:return"Connected";case j.ReadyState.CONNECTING:return"Connecting";case j.ReadyState.CLOSED:return"Server not reachable";default:return"Unknown"}}),[N]),D=Object(c.useCallback)((function(e){M(JSON.stringify(e))}),[M]),U=Object(c.useCallback)((function(){return i()}),[]);return Object(c.useEffect)((function(){N===j.ReadyState.OPEN&&fetch("http://".concat(e,"/data")).then((function(e){return e.json()})).then(A)}),[N,e]),Object(d.jsxs)(bn,{children:[Object(d.jsxs)(fn,{children:[Object(d.jsx)(gn,{status:N,children:R()}),Object(d.jsx)(jn,{children:Object(d.jsxs)("span",{children:[Object(d.jsx)("button",{disabled:!1===a,onClick:function(){return i(!1)},title:"Expand All",children:"+"}),Object(d.jsx)("button",{disabled:a,onClick:function(){return i(!0)},title:"Collapse All",children:"-"})]})}),Object(d.jsx)(pn,{children:Object(d.jsxs)("span",{children:["Filter:",Object(d.jsx)(hn,{onChange:function(e){return v(e.target.value.trim())}}),Object(d.jsx)("input",{type:"checkbox",name:"case sensitive",checked:l,onChange:function(e){return u(e.target.checked)}}),"case sensitive"]})})]}),Object(d.jsxs)(On,{children:[!k&&"No data",Object(d.jsx)(un,{data:k,sourceMatches:y,collapseAll:a,onCollapseChange:U,filter:{text:g,caseSensitive:l},onSendMessage:D,disabled:N!==j.ReadyState.OPEN})]}),Object(d.jsx)(b,{})]})}var bn=u.a.div(Ke||(Ke=Object(l.a)(['\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400;\n']))),fn=u.a.div(Ze||(Ze=Object(l.a)(["\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding-left: 1em;\n  padding-right: 1em;\n"]))),jn=u.a.div($e||($e=Object(l.a)(["\n  flex: 1;\n  display: flex;\n  justify-content: space-around;\n"]))),pn=u.a.div(Qe||(Qe=Object(l.a)(["\n  flex: 3;\n  display: flex;\n  justify-content: space-around;\n"]))),hn=u.a.input(en||(en=Object(l.a)(["\n  font-family: monospace, monospace;\n  font-size: 16px;\n  padding: 0 8px;\n  margin-left: 1em;\n  min-width: min(50vw, 400px);\n"]))),On=u.a.div(nn||(nn=Object(l.a)(["\n  flex: 1;\n  min-width: 800px;\n  max-width: 95vw;\n  margin: 0 40px;\n  padding-top: 15px;\n  flex-direction: column;\n  align-items: center;\n"]))),gn=u.a.span(tn||(tn=Object(l.a)(["\n  color: ",";\n"])),(function(e){var n=e.status;return n===j.ReadyState.OPEN?"darkgreen":n===j.ReadyState.CONNECTING?"black":"darkred"}));r.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(dn,{})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.c6963a98.chunk.js.map
(this.webpackJsonplang_json_editor=this.webpackJsonplang_json_editor||[]).push([[0],{30:function(n,e,t){},5:function(n,e){var t={ADD:"ADD",CHANGE_VALUE:"CHANGE_VALUE",REMOVE:"REMOVE",DATA_UPDATE:"DATA_UPDATE"},a={add:function(n,e,a){return{action:t.ADD,parentId:n,type:e,label:a}},changeValue:function(n,e,a){return{action:t.CHANGE_VALUE,id:n,language:e,value:a}},remove:function(n){return{action:t.REMOVE,id:n}},dataUpdate:function(n){return{action:t.DATA_UPDATE,data:n}}};n.exports={NodeType:{OBJECT:"OBJECT",VALUE:"VALUE"},ActionType:t,Action:a}},59:function(n,e,t){"use strict";t.r(e);var a,c=t(0),o=t.n(c),i=t(20),r=t.n(i),s=(t(30),t(2)),d=t(4),l=t(3),u=t(1);function b(){var n=Object(c.useMemo)((function(){return(new Date).getFullYear()}),[]);return Object(u.jsx)(m,{children:"\xa9 Pavel Zarecky, ".concat(n)})}var j,f,g,O,m=l.a.div(a||(a=Object(s.a)(["\n  padding-right: 15px;\n  text-align: end;\n"]))),v=t(6),p=t.n(v),x=t(5),h=o.a.createContext({}),y=t(25),E=t.n(y),C=t.p+"static/media/add.d8693632.svg",k=t.p+"static/media/edit.962e7af9.svg",w=t.p+"static/media/confirm.0addefb3.svg",A=t.p+"static/media/cancel.caea72e4.svg",S=t.p+"static/media/trash.85c719f0.svg",T=t.p+"static/media/copy.2327b577.svg",D=l.a.button(j||(j=Object(s.a)(["\n  cursor: pointer;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  min-width: 1em;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: 1;\n    font-weight: bold;\n    transform: scale(1.5, 1.5);\n  }\n"]))),N=t(24);function R(n){var e=n.operation,t=n.buttons,a=n.visible,c=void 0===a||a,o=n.copyString,i={opacity:c?1:0};return Object(u.jsxs)(_,{style:i,children:[e?Object(u.jsx)(L,{children:Object(u.jsx)("img",{src:e.image,width:"16",alt:e.name})}):null,t.map((function(n){return n?Object(u.jsxs)(D,{onClick:function(e){n.callback(),e.stopPropagation()},title:n.name,children:[n.image?Object(u.jsx)("img",{src:n.image,width:"12",alt:n.name}):null,n.text?n.text:null]},n.name):null})),o?Object(u.jsx)(N.CopyToClipboard,{text:o,title:'copy "'.concat(o,'"'),children:Object(u.jsx)(P,{src:T,width:"12",alt:"copy ".concat(o)})}):null]})}function M(n){var e=n.visible,t=n.onAdd,a=n.onRemove,c=n.onEdit,o=n.copyString;return Object(u.jsx)(R,{visible:e,buttons:[t&&{name:"add",image:C,callback:t},a&&{name:"remove",image:S,callback:a},c&&{name:"edit",image:k,callback:c}],copyString:o})}function V(n){var e=n.onConfirm,t=n.onCancel,a=n.editMode,c=a?"edit":"remove";return Object(u.jsx)(R,{operation:{name:c,image:a?k:S},buttons:[{name:"confirm ".concat(c),image:w,callback:e},{name:"cancel ".concat(c),image:A,callback:t}]})}function U(n){var e=n.onObject,t=n.onValue,a=n.onCancel;return Object(u.jsx)(R,{operation:{name:"add",image:C},buttons:[{name:"object",text:"{}",callback:e},{name:"string",text:'""',callback:t},{name:"cancel",image:A,callback:a}]})}var _=l.a.div(f||(f=Object(s.a)(["\n  cursor: default;\n"]))),L=l.a.span(g||(g=Object(s.a)(["\n  font-size: 10px;\n  opacity: 0.8;\n"]))),P=l.a.img(O||(O=Object(s.a)(["\n  cursor: pointer;\n  padding: 0;\n  border: none;\n  background: none;\n  opacity: 0.5;\n  margin: 0 3px;\n\n  &:hover {\n    opacity: 1;\n    transform: scale(1.5, 1.5);\n  }\n"]))),B=function(n){Object(c.useEffect)((function(){if(n){var e=function(e){27===e.keyCode&&n()};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}}),[n])},J="REMOVE_MODE",I="EDIT_MODE",F="ADD_MODE",G=function(n){var e=n.editing,t=n.visible,a=n.onAdd,o=n.onRemove,i=n.onConfirmEdit,r=n.onCancelEdit,s=n.onBeginEdit,l=n.copyString,b=Object(c.useState)(e?I:void 0),j=Object(d.a)(b,2),f=j[0],g=j[1];Object(c.useEffect)((function(){g(e?I:void 0)}),[e]);var O=function(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),a=1;a<e;a++)t[a-1]=arguments[a];return function(){g(void 0),null===n||void 0===n||n.apply(void 0,t)}};switch(B(f&&O(f===I?r:void 0)),f){case F:return Object(u.jsx)(U,{onObject:O(a,x.NodeType.OBJECT),onValue:O(a,x.NodeType.VALUE),onCancel:O()});case J:case I:return Object(u.jsx)(V,{editMode:f===I,onConfirm:O(f===I?i:o),onCancel:O(f===I?r:void 0)});default:return Object(u.jsx)(M,{visible:t,copyString:l,onAdd:a&&function(){return g(F)},onRemove:o&&function(){return g(J)},onEdit:i&&function(){g(I),null===s||void 0===s||s()}})}};G.defaultProps={onBeginEdit:function(){}};var H,z,W,Y,Z,q,K=G,Q=t(9),X=t(13);function $(n){var e=n.language,t=n.editing,a=n.value,o=n.onChange,i=n.onEdit,r=(n.hint,Object(c.useState)(!1)),s=Object(d.a)(r,2),l=s[0],b=s[1];Object(c.useEffect)((function(){t||b(!1)}),[t]);var j=Object(c.useCallback)((function(){return i(!1)}),[i]);return B(t&&j),Object(u.jsxs)(un,{value:a,children:[Object(u.jsx)(ln,{children:e}),t?Object(u.jsx)(u.Fragment,{children:Object(u.jsx)("textarea",{autoFocus:l,value:a||"",onChange:function(n){return o(n.target.value)}})}):Object(u.jsx)(bn,{value:a,onDoubleClick:function(){b(!0),i(!0)},children:null!==a&&void 0!==a?a:"<missing>"})]})}function nn(n){var e=n.node,t=Object(c.useState)(!1),a=Object(d.a)(t,2),o=a[0],i=a[1],r=Object(c.useState)(!1),s=Object(d.a)(r,2),l=s[0],b=s[1],j=Object(c.useState)(e.values),f=Object(d.a)(j,2),g=f[0],O=f[1],m=Object(c.useContext)(h),v=m.languages,p=m.onChangeValue,x=m.onRemove,y=m.missingTranslations.some((function(n){return n===e.id}));return Object(u.jsxs)(rn,{title:e.id,onMouseEnter:function(){return i(!0)},onMouseLeave:function(){return i(!1)},children:[Object(u.jsx)(sn,{missingTranslation:y,children:e.name}),Object(u.jsx)(dn,{children:v.map((function(n){var t=Object.keys(g).find((function(e){return e!==n&&g[e]}));return Object(u.jsx)($,{language:n,editing:l,hint:t&&{language:t,value:g[t]},value:g[n],onChange:function(e){return O(Object(X.a)(Object(X.a)({},g),{},Object(Q.a)({},n,e)))},onEdit:function(n){b(n),n||O(e.values)}},n)}))}),Object(u.jsx)(K,{editing:l,onBeginEdit:function(){return b(!0)},onConfirmEdit:function(){v.forEach((function(n){var t=g[n];t!==e.values[n]&&p(e.id,n,t)})),b(!1)},onCancelEdit:function(){O(e.values),b(!1)},onRemove:function(){x(e.id)},copyString:e.id,visible:o})]})}var en,tn,an,cn,on,rn=l.a.div(H||(H=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 2px;\n"]))),sn=l.a.div(z||(z=Object(s.a)(["\n  cursor: default;\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px 0 0 4px;\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n"])),(function(n){return n.missingTranslation?"salmon":"lightgreen"})),dn=l.a.div(W||(W=Object(s.a)([""]))),ln=l.a.span(Y||(Y=Object(s.a)(["\n  cursor: default;\n  padding: 0 8px;\n  color: white;\n  background-color: black;\n"]))),un=l.a.div(Z||(Z=Object(s.a)(["\n  display: flex;\n  flex-direction: row;\n  font-family: monospace, monospace;\n"]))),bn=l.a.div(q||(q=Object(s.a)(["\n  padding: 0 8px;\n  border: 0.5px solid black;\n  ","\n"])),(function(n){var e=n.value;return void 0===e||null===e?"background-color: red; color: white; font-style: italic;":e&&e.trim()?"":"background-color: orange;"}));function jn(n){var e=n.node,t=Object(c.useState)(!1),a=Object(d.a)(t,2),o=a[0],i=a[1],r=Object(c.useState)(!1),s=Object(d.a)(r,2),l=s[0],b=s[1],j=Object(c.useState)(),f=Object(d.a)(j,2),g=f[0],O=f[1],m=Object(c.useState)(""),v=Object(d.a)(m,2),p=v[0],y=v[1],C=Object(c.useContext)(h),k=C.onAdd,S=C.onRemove,T=C.missingTranslations.some((function(n){return n.startsWith(e.id)})),N=Object(c.useCallback)((function(){O(void 0),y("")}),[]);B(g&&N);var R=p&&!e.children.some((function(n){return n.name===p}));return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(mn,{title:e.id,onClick:function(){return i((function(n){return!n}))},onMouseEnter:function(){return b(!0)},onMouseLeave:function(){return b(!1)},children:[Object(u.jsxs)(pn,{missingTranslation:T,expanded:o,children:[Object(u.jsx)(vn,{children:o?"-":"+"}),e.name]}),o?Object(u.jsx)(K,{visible:l,onAdd:function(n){return O(n)},onRemove:e.id&&function(){return S(e.id)}}):Object(u.jsx)(xn,{children:"{} ".concat(e.children.length," item").concat(1===e.children.length?"":"s")})]}),g?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",{type:"text",placeholder:g===x.NodeType.OBJECT?"new section":"new value",onChange:function(n){return y(n.target.value.trim())}}),R?Object(u.jsx)(D,{onClick:function(){k(e.id,g,p),N()},children:Object(u.jsx)("img",{src:w,width:"16",alt:"confirm"})}):null,Object(u.jsx)(D,{onClick:N,children:Object(u.jsx)("img",{src:A,width:"16",alt:"cancel"})})]}):null,Object(u.jsx)(hn,{children:Object(u.jsx)(E.a,{expanded:o,children:e.children.map((function(n){return n.type===x.NodeType.OBJECT?Object(u.jsx)(jn,{node:n},n.id):Object(u.jsx)(nn,{node:n},n.id)}))})})]})}var fn,gn,On,mn=l.a.div(en||(en=Object(s.a)(["\n  cursor: default;\n  position: relative;\n  display: flex;\n  flex-direction: row;\n"]))),vn=l.a.span(tn||(tn=Object(s.a)(["\n  min-width: 10px;\n  margin-right: 2px;\n"]))),pn=l.a.span(an||(an=Object(s.a)(["\n  background-color: ",";\n  font-family: monospace, monospace;\n  padding: 0 8px;\n  border: 0.5px solid black;\n  border-radius: 4px;\n\n  &:hover {\n    font-weight: bold;\n  }\n"])),(function(n){var e=n.missingTranslation,t=n.expanded;return e?t?"pink":"salmon":t?"mintcream":"lightgreen"})),xn=l.a.span(cn||(cn=Object(s.a)(["\n  color: grey;\n  margin: 0 8px;\n"]))),hn=l.a.div(on||(on=Object(s.a)(["\n  padding-left: 20px;\n  margin-bottom: 4px;\n"])));function yn(n,e,t){switch(n.type){case x.NodeType.VALUE:e.some((function(e){return void 0===n.values[e]||null===n.values[e]}))&&t(n.id);break;case x.NodeType.OBJECT:n.children.forEach((function(n){return yn(n,e,t)}));break;default:throw new Error("Invalid type: ".concat(n.type))}}function En(n){var e=n.data,t=n.onSendMessage,a=Object(c.useState)(e),o=Object(d.a)(a,2),i=o[0],r=o[1];Object(c.useEffect)((function(){r(e)}),[e]);var s=Object(c.useState)([]),l=Object(d.a)(s,2),b=l[0],j=l[1];return Object(c.useEffect)((function(){var n;if(null===i||void 0===i||null===(n=i.languages)||void 0===n?void 0:n.length){var e=[];yn(i.content,i.languages,(function(n){e.push(n)})),j(e)}}),[i]),Object(u.jsx)(h.Provider,{value:{missingTranslations:b,languages:null===i||void 0===i?void 0:i.languages,onAdd:function(n,e,a){return t(x.Action.add(n,e,a))},onChangeValue:function(n,e,a){return t(x.Action.changeValue(n,e,a))},onRemove:function(n){return t(x.Action.remove(n))}},children:i?Object(u.jsx)(jn,{node:i.content}):null})}function Cn(){var n=new URL(window.location.href),e=n.searchParams.get("serverPort")||n.port,t=Object(c.useState)(),a=Object(d.a)(t,2),o=a[0],i=a[1],r=Object(c.useCallback)((function(n){switch(n.action){case x.ActionType.DATA_UPDATE:i(n.data);break;default:console.error("Invalid action:",n.action)}}),[]),s=p()("ws://".concat(n.hostname,":").concat(e),{retryOnError:!0,shouldReconnect:function(){return!0},reconnectAttempts:100,onMessage:function(n){return r(JSON.parse(n.data))}}),l=s.sendMessage,j=s.readyState,f=Object(c.useCallback)((function(){switch(j){case v.ReadyState.OPEN:return"Connected";case v.ReadyState.CONNECTING:return"Connecting";case v.ReadyState.CLOSED:return"Server not reachable";default:return"Unknown"}}),[j]),g=Object(c.useCallback)((function(n){l(JSON.stringify(n))}),[l]);return Object(c.useEffect)((function(){j===v.ReadyState.OPEN&&fetch("http://".concat(n.hostname,":").concat(e,"/data")).then((function(n){return n.json()})).then(i)}),[j,e,n.hostname]),Object(u.jsxs)(kn,{children:[Object(u.jsx)(An,{status:j,children:f()}),Object(u.jsxs)(wn,{children:[!o&&"No data",Object(u.jsx)(En,{data:o,onSendMessage:g})]}),Object(u.jsx)(b,{})]})}var kn=l.a.div(fn||(fn=Object(s.a)(['\n  background-color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",\n    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-weight: 400;\n']))),wn=l.a.div(gn||(gn=Object(s.a)(["\n  flex: 1;\n  min-width: 800px;\n  max-width: 95vw;\n  margin: 0 40px;\n  padding-top: 15px;\n  flex-direction: column;\n  align-items: center;\n"]))),An=l.a.div(On||(On=Object(s.a)(["\n  color: ",";\n"])),(function(n){var e=n.status;return e===v.ReadyState.OPEN?"darkgreen":e===v.ReadyState.CONNECTING?"black":"darkred"}));r.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(Cn,{})}),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.5eccd486.chunk.js.map
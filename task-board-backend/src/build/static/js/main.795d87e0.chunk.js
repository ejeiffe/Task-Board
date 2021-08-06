(this["webpackJsonptask-board"]=this["webpackJsonptask-board"]||[]).push([[0],{24:function(n,e,t){"use strict";(function(n){var r,a,c=t(3),o=(t(0),t(28)),i=t(2),u=t(29),s=t(1),d=Object(i.a)(r||(r=Object(c.a)(["\n  body {\n    background: #619595;\n  }\n"]))),b=i.b.div(a||(a=Object(c.a)(["\n  font-family: Roboto, sans-serif;\n  color: #556973;\n"])));e.a=Object(o.hot)(n)((function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(d,{}),Object(s.jsx)(b,{children:Object(s.jsx)(u.a,{})})]})}))}).call(this,t(40)(n))},29:function(n,e,t){"use strict";var r,a,c,o,i,u,s,d,b,l,p,f,j,O,h,x,v,m,g,y,k,w,E,T,C,D,B,S,N,L,R,z,A,P,_,M,I,J,U,K,F,H,W,G,q,Q,V,X=t(5),Y=t(3),Z=t(0),$=t(2),nn=t(12),en=t(9),tn=function(n){return n.taskBoard.isLoading},rn=function(n){return n.taskBoard.currentData},an=function(n){return n.taskBoard.currentBoard},cn=function(n){return n.taskBoard.allBoards},on=t(8),un=$.b.div(r||(r=Object(Y.a)(["\n  min-height: 40px;\n  max-height: 66px;\n  border: none;\n  border-radius: 8px;\n  margin-top: 8px;\n  background-color: #ebfff6;\n  padding: 8px;\n  cursor: pointer;\n  font-size: inherit;\n"]))),sn=$.b.input(a||(a=Object(Y.a)(["\n  font-size: inherit;\n  border-radius: 5px;\n  padding: 8px;\n  border: 1px solid #5d737e;\n"]))),dn=$.b.button(c||(c=Object(Y.a)(["\n  background-color: #c0fdfb;\n  border: 1px solid #5d737e;\n  border-radius: 5px;\n  font-size: inherit;\n  cursor: pointer;\n  &:hover {\n    background-color: #92dad4;\n  }\n"]))),bn=$.b.button(o||(o=Object(Y.a)(["\n  border: none;\n  background-color: inherit;\n  marign-left: 12px;\n  font-size: 20px;\n  color: #5d737e;\n  cursor: pointer;\n"]))),ln=$.b.div(i||(i=Object(Y.a)(["\n  display: flex;\n  font-size: inherit;\n  margin-top: 5px;\n  background-color: #ebfff6;\n"]))),pn=t(7),fn=t.n(pn),jn=t(11),On=t(6),hn=function(n){return function(){alert(n)}},xn=function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify({updatedTask:e}),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/tasks/").concat(e.id),{headers:{"Content-Type":"application/json"},method:"PUT",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()},vn=function(n,e,t){return function(){var r=Object(jn.a)(fn.a.mark((function r(a){var c,o,i;return fn.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,c=JSON.stringify({parent:t}),r.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/tasks/").concat(e),{headers:{"Content-Type":"application/json"},method:"DELETE",body:c});case 4:return o=r.sent,r.next=7,o.json();case 7:i=r.sent,a(Object(On.n)(i)),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(0),a(hn(r.t0));case 14:case"end":return r.stop()}}),r,null,[[0,11]])})));return function(n){return r.apply(this,arguments)}}()},mn=t(1),gn=$.b.div(u||(u=Object(Y.a)(["\n  display: ",";\n  width: fit-content;\n"])),(function(n){return"contextMenu"===n.display?"flex":"none"})),yn=Object($.b)(sn)(s||(s=Object(Y.a)(["\n  width: 186px;\n"]))),kn=Object($.b)(un)(d||(d=Object(Y.a)(["\n  display: ",";\n  padding-left: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-top: 0;\n"])),(function(n){return"contextMenu"===n.display?"block":"none"})),wn=$.b.ul(b||(b=Object(Y.a)(["\n  list-style: none;\n  border: 1px solid #5d737e;\n  border-radius: 5px;\n  background-color: #fcfffd;\n  padding 8px;\n  margin-top: 0;\n  cursor: pointer;\n  z-index: 1;\n"]))),En=$.b.li(l||(l=Object(Y.a)(["\n  padding: 5px;\n  width: fit-content;\n  &:hover {\n    background-color: #ebfff6;\n  }\n"]))),Tn=Object(en.b)((function(n){return{boardName:an(n)}}),(function(n){return{changeTaskTitle:function(e,t){return n(xn(e,t))},deleteTask:function(e,t,r){return n(vn(e,t,r))}}}))((function(n){var e=n.task,t=n.parent,r=n.boardName,a=n.display,c=n.setDisplay,o=n.setModalDisplay,i=n.changeTaskTitle,u=n.deleteTask,s=Object(Z.useState)(e.title),d=Object(on.a)(s,2),b=d[0],l=d[1],p=Object(Z.useRef)();Object(Z.useEffect)((function(){var n=function(n){p.current&&p.current.contains(n.target)||"task"===a||(c("task"),l(e.title))};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}}));var f=function(){var n=Object(X.a)(Object(X.a)({},e),{},{title:b});i(r,n),c("task")};return Object(mn.jsxs)(gn,{display:a,ref:p,children:[Object(mn.jsxs)(kn,{display:a,children:[Object(mn.jsx)(yn,{type:"text",placeholder:e.title,value:b,onChange:function(n){return l(n.target.value)},onKeyDown:function(n){return function(n){"Enter"===n.key&&f()}(n)}}),Object(mn.jsxs)(ln,{children:[Object(mn.jsx)(dn,{onClick:function(){return f()},children:"Save"}),Object(mn.jsx)(bn,{onClick:function(){return c("task")},children:"\xd7"})]})]}),Object(mn.jsxs)(wn,{children:[Object(mn.jsx)(En,{onClick:function(){c("task"),o("show")},children:"Details..."}),Object(mn.jsx)(En,{onClick:function(){u(r,e.id,t)},children:"Delete\xa0Task"})]})]})})),Cn=$.b.div(p||(p=Object(Y.a)(["\n  display: ",";\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.4);\n"])),(function(n){return"show"===n.display?"block":"none"})),Dn=$.b.div(f||(f=Object(Y.a)(["\n  min-width: 280px;\n  max-width: 700px;\n  margin: 5% auto;\n  display: flex;\n  background-color: #ebfff6;\n  border-radius: 10px;\n  padding: 10px;\n  overflow: hidden;\n  justify-content: space-between;\n"]))),Bn=$.b.div(j||(j=Object(Y.a)(["\n  padding: 8px;\n  display: block;\n  min-height: 100px;\n  flex-grow: 1;\n"]))),Sn=$.b.div(O||(O=Object(Y.a)(["\n  font-size: 24px;\n"]))),Nn=$.b.h2(h||(h=Object(Y.a)(["\n  font-size: inherit;\n  margin-top: 10px;\n  margin-bottom: 0;\n  padding: 8px;\n  display: ",";\n"])),(function(n){return"title"===n.display?"block":"none"})),Ln=Object($.b)(sn)(x||(x=Object(Y.a)(["\n  font-weight: 700;\n  padding: 8px;\n  margin-top: 10px;\n  display: ",";\n"])),(function(n){return"input"===n.display?"block":"none"})),Rn=$.b.div(v||(v=Object(Y.a)(["\n  max-width: 500 px;\n  padding: 8px;\n"]))),zn=$.b.div(m||(m=Object(Y.a)(["\n  display: flex;\n  margin-top: 10px;\n  margin-bottom: 10px;\n"]))),An=$.b.h3(g||(g=Object(Y.a)(["\n  margin: inherit;\n"]))),Pn=$.b.button(y||(y=Object(Y.a)(["\n  border: none;\n  border-radius: 5px;\n  margin-left: 10px;\n  font-size: inherit;\n  background-color: inherit;\n  cursor: pointer;\n  &:hover {\n    background-color: #daffef;\n  }\n"]))),_n=$.b.p(k||(k=Object(Y.a)(["\n  display: ",";\n"])),(function(n){return"description"===n.display?"block":"none"})),Mn=$.b.div(w||(w=Object(Y.a)(["\n  display: ",";\n"])),(function(n){return"input"===n.display?"block":"none"})),In=$.b.textarea(E||(E=Object(Y.a)(["\n  font-size: inherit;\n  font-family: inherit;\n  width: 100%;\n"]))),Jn=$.b.div(T||(T=Object(Y.a)(["\n  display: block;\n  padding: 8px;\n  width: 100px;\n"]))),Un=$.b.button(C||(C=Object(Y.a)(["\n  background-color: inherit;\n  width: inherit;\n  font-size: 40px;\n  color: #5d737e;\n  border: none;\n  text-align: right;\n  display: block;\n  cursor: pointer;\n"]))),Kn=$.b.button(D||(D=Object(Y.a)(["\n  background-color: inherit;\n  border: none;\n  border-radius: 5px;\n  font-size: inherit;\n  display: block;\n  padding: 8px;\n  cursor: pointer;\n  &:hover {\n    background-color: #daffef;\n  }\n"]))),Fn=Object(en.b)((function(n){return{boardName:an(n)}}),(function(n){return{updateTask:function(e,t){return n(xn(e,t))},deleteTask:function(e,t,r){return n(vn(e,t,r))}}}))((function(n){var e=n.task,t=n.parent,r=n.boardName,a=n.display,c=n.setDisplay,o=n.updateTask,i=n.deleteTask,u=Object(Z.useState)(e.title),s=Object(on.a)(u,2),d=s[0],b=s[1],l=Object(Z.useState)(e.description),p=Object(on.a)(l,2),f=p[0],j=p[1],O=Object(Z.useState)("title"),h=Object(on.a)(O,2),x=h[0],v=h[1],m=Object(Z.useState)("description"),g=Object(on.a)(m,2),y=g[0],k=g[1],w=Object(Z.useRef)(),E=Object(Z.useRef)(),T=Object(Z.useRef)();Object(Z.useEffect)((function(){var n=function(n){w.current&&w.current.contains(n.target)||"hide"===a||(C(),D(),c("hide"))};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}})),Object(Z.useEffect)((function(){var n=function(n){E.current&&E.current.contains(n.target)||"hide"===a||C()};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}})),Object(Z.useEffect)((function(){var n=function(n){T.current&&T.current.contains(n.target)||"hide"===a||D()};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}}));var C=function(){var n=Object(X.a)(Object(X.a)({},e),{},{title:d});o(r,n),v("title")},D=function(){var n=Object(X.a)(Object(X.a)({},e),{},{description:f});o(r,n),k("description")};return Object(mn.jsx)(Cn,{display:a,children:Object(mn.jsxs)(Dn,{ref:w,children:[Object(mn.jsxs)(Bn,{children:[Object(mn.jsxs)(Sn,{children:[Object(mn.jsx)(Nn,{display:x,onClick:function(){return v("input")},children:e.title}),Object(mn.jsx)(Ln,{ref:E,type:"text",value:d,display:x,onChange:function(n){return b(n.target.value)},onKeyDown:function(n){return function(n){"Enter"===n.key&&C()}(n)}})]}),Object(mn.jsxs)(Rn,{children:[Object(mn.jsxs)(zn,{children:[Object(mn.jsx)(An,{children:"Description"}),Object(mn.jsx)(Pn,{onClick:function(){return k("input")},children:"Edit"})]}),Object(mn.jsx)(_n,{display:y,onClick:function(){return k("input")},children:""===e.description?"Add a description for this task":e.description}),Object(mn.jsxs)(Mn,{display:y,ref:T,children:[Object(mn.jsx)(In,{rows:"10",cols:"40",placeholder:e.description,value:f,onChange:function(n){return j(n.target.value)}}),Object(mn.jsxs)(ln,{children:[Object(mn.jsx)(dn,{onClick:function(){return D()},children:"Save"}),Object(mn.jsx)(bn,{onClick:function(){return k("description")},children:"\xd7"})]})]})]})]}),Object(mn.jsxs)(Jn,{children:[Object(mn.jsx)(Un,{onClick:function(){return c("hide")},children:"\xd7"}),Object(mn.jsx)(Kn,{onClick:function(){return i(r,e.id,t)},children:"Delete Task"})]})]})})})),Hn=$.b.div(B||(B=Object(Y.a)(["\n  border: 1px solid #5d737e;\n  background-color: #fcfffd;\n  border-radius: 10px;\n  padding: 8px;\n  margin-bottom: 8px;\n  display: ",";\n  &:hover {\n    background-color: #c0fdfb;\n  }\n"])),(function(n){return"task"===n.display?"block":"none"})),Wn=function(n){var e=n.task,t=n.index,r=n.parent,a=Object(Z.useState)("task"),c=Object(on.a)(a,2),o=c[0],i=c[1],u=Object(Z.useState)("hide"),s=Object(on.a)(u,2),d=s[0],b=s[1];return Object(mn.jsxs)(mn.Fragment,{children:[Object(mn.jsx)(nn.b,{draggableId:e.id,index:t,children:function(n,t){return Object(mn.jsx)(Hn,Object(X.a)(Object(X.a)(Object(X.a)({ref:n.innerRef},n.draggableProps),n.dragHandleProps),{},{display:o,isDragging:t.isDragging,onContextMenu:function(n){n.preventDefault(),i("contextMenu")},onClick:function(){return b("show")},children:e.title}))}}),Object(mn.jsx)(Tn,{task:e,parent:r,display:o,setDisplay:i,setModalDisplay:b}),Object(mn.jsx)(Fn,{task:e,parent:r,display:d,setDisplay:b})]})},Gn=$.b.button(S||(S=Object(Y.a)(["\n  width: 220px;\n  height: 40px;\n  border: none;\n  border-radius: 10px;\n  margin-top: 8px;\n  color: #556973;\n  background-color: #ebfff6;\n  padding: 8px;\n  cursor: pointer;\n  font-size: inherit;\n  display: ",";\n  &:hover {\n    background-color: #daffef;\n  }\n"])),(function(n){return"button"===n.display?"block":"none"})),qn=Object($.b)(un)(N||(N=Object(Y.a)(["\n  display: ",";\n  flex-direction: column;\n"])),(function(n){return"form"===n.display?"inline-flex":"none"})),Qn=Object(en.b)(null,(function(n){return{saveNewBoard:function(e){return n(function(n){return function(){var e=Object(jn.a)(fn.a.mark((function e(t){var r,a,c;return fn.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=JSON.stringify({text:n}),e.next=4,fetch("http://localhost:8000/api/boards",{headers:{"Content-Type":"application/json"},method:"POST",body:r});case 4:return a=e.sent,e.next=7,a.json();case 7:c=e.sent,t(Object(On.h)(c)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),t(hn(e.t0));case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(n){return e.apply(this,arguments)}}()}(e))},saveNewColumn:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify({text:e}),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/columns"),{headers:{"Content-Type":"application/json"},method:"POST",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))},saveNewTask:function(e,t,r){return n(function(n,e,t){return function(){var r=Object(jn.a)(fn.a.mark((function r(a){var c,o,i;return fn.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,c=JSON.stringify({text:e,parent:t}),r.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/tasks"),{headers:{"Content-Type":"application/json"},method:"POST",body:c});case 4:return o=r.sent,r.next=7,o.json();case 7:i=r.sent,a(Object(On.n)(i)),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(0),a(hn(r.t0));case 14:case"end":return r.stop()}}),r,null,[[0,11]])})));return function(n){return r.apply(this,arguments)}}()}(e,t,r))}}}))((function(n){var e=n.boardName,t=n.formType,r=n.parent,a=void 0===r?null:r,c=n.saveNewBoard,o=n.saveNewColumn,i=n.saveNewTask,u=Object(Z.useState)("button"),s=Object(on.a)(u,2),d=s[0],b=s[1],l=Object(Z.useState)(""),p=Object(on.a)(l,2),f=p[0],j=p[1],O=Object(Z.useRef)();Object(Z.useEffect)((function(){var n=function(n){O.current.contains(n.target)||"button"===d||(h(),b("button"))};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}}));var h=function(){f&&("board"===t?c(f):"column"===t?o(e,f):i(e,f,a),j(""))};return Object(mn.jsxs)(mn.Fragment,{children:[Object(mn.jsxs)(Gn,{display:d,onClick:function(){return b("form")},children:["+ Add a new ",t]}),Object(mn.jsxs)(qn,{display:d,ref:O,children:[Object(mn.jsx)(sn,{type:"text",placeholder:"Enter new ".concat(t),value:f,onChange:function(n){return j(n.target.value)},onKeyDown:function(n){return function(n){"Enter"===n.key&&h()}(n)}}),Object(mn.jsxs)(ln,{children:[Object(mn.jsx)(dn,{onClick:function(){return h()},children:"Save"}),Object(mn.jsx)(bn,{onClick:function(){return b("button")},children:"\xd7"})]})]})]})})),Vn=$.b.div(L||(L=Object(Y.a)(["\n  margin: 8px;\n  border: none;\n  background-color: #ebfff6;\n  border-radius: 10px;\n  width: 220px;\n  display: flex;\n  flex-direction: column;\n"]))),Xn=$.b.div(R||(R=Object(Y.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 40px;\n  padding: 5px;\n"]))),Yn=$.b.h3(z||(z=Object(Y.a)(["\n  padding: 10px;\n  display: ",";\n"])),(function(n){return"title"===n.display?"block":"none"})),Zn=Object($.b)(sn)(A||(A=Object(Y.a)(["\n  padding: 10px;\n  width: 80%;\n  font-size: 18px;\n  font-weight: 600;\n  display: ",";\n"])),(function(n){return"input"===n.display?"block":"none"})),$n=$.b.button(P||(P=Object(Y.a)(["\n  color: darkgrey;\n  background-color: #ebfff6;\n  font-size: 22px;\n  border: none;\n  cursor: pointer;\n"]))),ne=$.b.div(_||(_=Object(Y.a)(["\n  padding: 8px;\n  min-height: 100px;\n  flex-grow: 1;\n"]))),ee=Object(Z.memo)((function(n){var e=n.tasks,t=n.parent;return e.map((function(n,e){return Object(mn.jsx)(Wn,{task:n,index:e,parent:t},n.id)}))})),te=Object(en.b)(null,(function(n){return{changeColumnTitle:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify({updatedColumn:e}),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/columns/").concat(e.id),{headers:{"Content-Type":"application/json"},method:"PUT",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))},deleteColumn:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("http://localhost:8000/api/boards/".concat(n,"/columns/").concat(e),{method:"DELETE"});case 3:return a=t.sent,t.next=6,a.json();case 6:c=t.sent,r(Object(On.n)(c)),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),r(hn(t.t0));case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))}}}))((function(n){var e=n.boardName,t=n.column,r=n.index,a=n.tasks,c=n.changeColumnTitle,o=n.deleteColumn,i=Object(Z.useState)(t.title),u=Object(on.a)(i,2),s=u[0],d=u[1],b=Object(Z.useState)("title"),l=Object(on.a)(b,2),p=l[0],f=l[1],j=Object(Z.useRef)(),O=function(){var n=Object(X.a)(Object(X.a)({},t),{},{title:s});c(e,n),f("title")};return Object(Z.useEffect)((function(){var n=function(n){j.current.contains(n.target)||"title"===p||O()};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}})),Object(mn.jsx)(nn.b,{draggableId:t.id,index:r,children:function(n){return Object(mn.jsxs)(Vn,Object(X.a)(Object(X.a)({ref:n.innerRef},n.draggableProps),{},{children:[Object(mn.jsxs)(Xn,{children:[Object(mn.jsx)(Yn,Object(X.a)(Object(X.a)({},n.dragHandleProps),{},{display:p,onClick:function(){return f("input")},children:s})),Object(mn.jsx)(Zn,{type:"text",ref:j,value:s,display:p,onChange:function(n){return d(n.target.value)},onKeyDown:function(n){return function(n){"Enter"===n.key&&O()}(n)}}),Object(mn.jsx)($n,{onClick:function(){window.confirm("Delete this column and all associated tasks?")&&o(e,t.id)},children:"\xd7"})]}),Object(mn.jsx)(nn.c,{droppableId:t.id,type:"task",children:function(n){return Object(mn.jsxs)(ne,Object(X.a)(Object(X.a)({ref:n.innerRef},n.droppableProps),{},{children:[Object(mn.jsx)(ee,{tasks:a,parent:t.id}),n.placeholder]}))}}),Object(mn.jsx)(Qn,{boardName:e,formType:"task",parent:t.id})]}))}})})),re=$.b.div(M||(M=Object(Y.a)(["\n  height: 95px;\n  display: flex;\n  padding: 8px;\n  justify-content: space-between;\n  align-items: end;\n"]))),ae=$.b.div(I||(I=Object(Y.a)(["\nmargin-top: auto;\n  font-size: 32px;\n  padding 10px;\n  align-items: end;\n"]))),ce=$.b.h1(J||(J=Object(Y.a)(["\n  font-size: inherit;\n  margin: 0;\n  color: #fcfffd;\n  background-color: #64b6ac;\n  border-radius: 10px;\n  padding: 10px;\n  display: ",";\n"])),(function(n){return"title"===n.display?"block":"none"})),oe=Object($.b)(sn)(U||(U=Object(Y.a)(["\n  padding: 10px;\n  font-weight: 700;\n  display: ",";\n"])),(function(n){return"input"===n.display?"block":"none"})),ie=$.b.div(K||(K=Object(Y.a)(["\n  margin-top: auto;\n  padding: 10px;\n  font-size: 18px;\n  display: flex;\n  align-items: end;\n  position: relative;\n"]))),ue=$.b.button(F||(F=Object(Y.a)(["\n  background-color: #64b6ac;\n  color: #fcfffd;\n  font-size: inherit;\n  border: none;\n  border-radius: 10px;\n  padding: 8px;\n  cursor: pointer;\n"]))),se=$.b.ul(H||(H=Object(Y.a)(["\n  font-size: 16px;\n  list-style: none;\n  background-color: #ebfff6;\n  border: 1px solid #5d737e;\n  border-radius: 10px;\n  padding: 10px;\n  cursor: pointer;\n  position: absolute;\n  top: 40px;\n  z-index: 1;\n  display: ",";\n"])),(function(n){return"menu"===n.display?"block":"none"})),de=$.b.li(W||(W=Object(Y.a)(["\n  padding: 8px;\n  width: fit-content;\n  &:hover {\n    background-color: #daffef;\n  }\n"]))),be=$.b.span(G||(G=Object(Y.a)(["\n  padding: 8px;\n  color: #fcfffd;\n"]))),le=Object(en.b)((function(n){return{allBoards:cn(n)}}),(function(n){return{changeBoardTitle:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify({text:e}),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n),{headers:{"Content-Type":"application/json"},method:"PUT",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))},switchBoard:function(e){return n(Object(On.m)(e))},deleteBoard:function(e){return n(function(n){return function(){var e=Object(jn.a)(fn.a.mark((function e(t){var r,a;return fn.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("http://localhost:8000/api/boards/".concat(n),{method:"DELETE"});case 3:return r=e.sent,e.next=6,r.json();case 6:a=e.sent,t(Object(On.i)(a)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),t(hn(e.t0));case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}()}(e))}}}))((function(n){var e=n.boardName,t=n.boardTitle,r=n.allBoards,a=n.changeBoardTitle,c=n.switchBoard,o=n.deleteBoard,i=Object(Z.useState)("title"),u=Object(on.a)(i,2),s=u[0],d=u[1],b=Object(Z.useState)("hidden"),l=Object(on.a)(b,2),p=l[0],f=l[1],j=Object(Z.useState)(t),O=Object(on.a)(j,2),h=O[0],x=O[1],v=Object(Z.useRef)(),m=function(){a(e,h),d("title")};Object(Z.useEffect)((function(){var n=function(n){v.current.contains(n.target)||"title"===s||m()};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}}));var g=Object(Z.useRef)();return Object(Z.useEffect)((function(){var n=function(n){g.current.contains(n.target)||"button"===p||f("hidden")};return document.addEventListener("mousedown",n),function(){return document.removeEventListener("mousedown",n)}})),Object(mn.jsxs)(re,{children:[Object(mn.jsxs)(ae,{children:[Object(mn.jsx)(ce,{display:s,onClick:function(){return d("input")},children:h}),Object(mn.jsx)(oe,{type:"text",ref:v,value:h,display:s,onChange:function(n){return x(n.target.value)},onKeyDown:function(n){return function(n){"Enter"===n.key&&m()}(n)}})]}),Object(mn.jsxs)(ie,{children:[Object(mn.jsx)(ue,{onClick:function(){return f("menu")},children:"Change Board"}),Object(mn.jsxs)(se,{display:p,ref:g,children:[r.map((function(n){return n.name!==e?Object(mn.jsx)(de,{onClick:function(){f("button"),c(n.name)},children:n.title}):null})),Object(mn.jsx)("li",{children:Object(mn.jsx)(Qn,{boardName:null,formType:"board"})})]}),Object(mn.jsx)(be,{children:"|"}),Object(mn.jsx)(ue,{onClick:function(){window.confirm("Delete this board and all associated tasks?")&&o(e)},children:"Delete Board"})]})]})})),pe=$.b.div(q||(q=Object(Y.a)(["\n  display: block;\n  background-color: #619595;\n"]))),fe=$.b.div(Q||(Q=Object(Y.a)(["\n  display: flex;\n"]))),je=$.b.div(V||(V=Object(Y.a)(["\n  display: flex;\n  align-items: start;\n  margin-right: 8px;\n"]))),Oe=Object(Z.memo)((function(n){var e=n.boardName,t=n.column,r=n.index,a=n.taskMap,c=t.taskIds.map((function(n){return a[n]}));return Object(mn.jsx)(te,{boardName:e,column:t,index:r,tasks:c},t.id)}));e.a=Object(en.b)((function(n){return{data:rn(n),boardName:an(n),isLoading:tn(n)}}),(function(n){return{loadBoardData:function(e){n(function(n){return function(){var e=Object(jn.a)(fn.a.mark((function e(t){var r,a;return fn.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,t(Object(On.k)()),e.next=6,fetch("http://localhost:8000/api/boards/".concat(n));case 6:return r=e.sent,e.next=9,r.json();case 9:a=e.sent,t(Object(On.l)(a)),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),t(Object(On.j)()),t(hn(e.t0));case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(n){return e.apply(this,arguments)}}()}(e))},handleColumnMove:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify(e),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/move-column"),{headers:{"Content-Type":"application/json"},method:"POST",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))},handleTaskMove:function(e,t){return n(function(n,e){return function(){var t=Object(jn.a)(fn.a.mark((function t(r){var a,c,o;return fn.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a=JSON.stringify(e),t.next=4,fetch("http://localhost:8000/api/boards/".concat(n,"/move-task"),{headers:{"Content-Type":"application/json"},method:"POST",body:a});case 4:return c=t.sent,t.next=7,c.json();case 7:o=t.sent,r(Object(On.n)(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),r(hn(t.t0));case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(n){return t.apply(this,arguments)}}()}(e,t))}}}))((function(n){var e=n.boardName,t=n.data,r=n.isLoading,a=n.loadBoardData,c=n.handleTaskMove,o=n.handleColumnMove;Object(Z.useEffect)((function(){a(e)}),[a,e]);var i=Object(mn.jsxs)(pe,{children:[Object(mn.jsx)(le,{boardName:e,boardTitle:t.title}),Object(mn.jsx)(nn.a,{onDragEnd:function(n){n.destination&&(n.destination.droppableId===n.source.droppableId&&n.destination.index===n.source.index||("task"===n.type&&c(t.name,n),"column"===n.type&&o(t.name,n)))},children:Object(mn.jsxs)(fe,{children:[Object(mn.jsx)(nn.c,{droppableId:"board",direction:"horizontal",type:"column",children:function(n){return Object(mn.jsxs)(je,Object(X.a)(Object(X.a)({ref:n.innerRef},n.droppableProps),{},{data:t,children:[t.columnOrder.map((function(n,e){var r=t.columns[n];return Object(mn.jsx)(Oe,{boardName:t.name,column:r,index:e,taskMap:t.tasks},r.id)})),n.placeholder]}))}}),Object(mn.jsx)(Qn,{boardName:t.name,formType:"column"})]})})]});return r?Object(mn.jsx)("h3",{children:"Loading board data..."}):e?i:Object(mn.jsx)(Qn,{boardName:null,formType:"board"})}))},45:function(n,e,t){"use strict";t.r(e);t(0);var r=t(13),a=t.n(r),c=t(9),o=t(10),i=t(17),u=t(20),s=t.n(u),d=t(16),b=t(5),l=t(6),p={isLoading:!1,currentData:{},currentBoard:"",allBoards:[]},f=t(21),j=t(22),O={taskBoard:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case l.d:var t=Object(b.a)(Object(b.a)({},n),{},{isLoading:!0});return t;case l.e:var r=e.payload,a=Object(b.a)(Object(b.a)({},n),{},{isLoading:!1,currentData:r,currentBoard:r.name});return a;case l.c:var c=Object(b.a)(Object(b.a)({},n),{},{isLoading:!1});return c;case l.g:var o=e.payload;if(o.title!==n.currentData.title){var i=Array.from(n.allBoards);i.forEach((function(n){n.name===o.name&&(n.title=o.title)}));var u=Object(b.a)(Object(b.a)({},n),{},{currentData:o,allBoards:i});return u}var s=Object(b.a)(Object(b.a)({},n),{},{currentData:o});return s;case l.a:var d=e.payload,f={name:d.name,title:d.title},j=Object(b.a)(Object(b.a)({},n),{},{currentData:d,currentBoard:d.name,allBoards:n.allBoards.concat(f)});return j;case l.f:var O=e.payload,h=Object(b.a)(Object(b.a)({},n),{},{currentBoard:O});return h;case l.b:var x=e.payload,v=Array.from(n.allBoards).filter((function(n){return n.name!==x.name}));if(v.length>0){var m=Object(b.a)(Object(b.a)({},n),{},{currentBoard:v[0].name,allBoards:v});return m}return p;default:return n}}},h={key:"root",storage:s.a,stateReconciler:d.a},x=Object(o.combineReducers)(O),v=Object(i.a)(h,x),m=t(23),g=t(24),y=t(1),k=Object(o.createStore)(v,Object(j.composeWithDevTools)(Object(o.applyMiddleware)(f.a))),w=Object(i.b)(k);a.a.render(Object(y.jsx)(c.a,{store:k,children:Object(y.jsx)(m.PersistGate,{loading:Object(y.jsx)("div",{children:"Loading..."}),persistor:w,children:Object(y.jsx)(g.a,{})})}),document.getElementById("root"))},6:function(n,e,t){"use strict";t.d(e,"d",(function(){return r})),t.d(e,"k",(function(){return a})),t.d(e,"e",(function(){return c})),t.d(e,"l",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"j",(function(){return u})),t.d(e,"g",(function(){return s})),t.d(e,"n",(function(){return d})),t.d(e,"a",(function(){return b})),t.d(e,"h",(function(){return l})),t.d(e,"f",(function(){return p})),t.d(e,"m",(function(){return f})),t.d(e,"b",(function(){return j})),t.d(e,"i",(function(){return O}));var r="LOAD_BOARD_IN_PROGRESS",a=function(){return{type:r}},c="LOAD_BOARD_SUCCESS",o=function(n){return{type:c,payload:n}},i="LOAD_BOARD_FAILURE",u=function(){return{type:i}},s="UPDATE_CURRENT_BOARD",d=function(n){return{type:s,payload:n}},b="ADD_NEW_BOARD",l=function(n){return{type:b,payload:n}},p="SWITCH_CURRENT_BOARD",f=function(n){return{type:p,payload:n}},j="DELETE_BOARD",O=function(n){return{type:j,payload:n}}}},[[45,1,2]]]);
//# sourceMappingURL=main.795d87e0.chunk.js.map
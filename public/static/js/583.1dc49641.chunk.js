"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[583],{987:function(e,n,r){r(791);var s=r(184);n.Z=function(e){return(0,s.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},583:function(e,n,r){r.r(n),r.d(n,{default:function(){return j}});var s=r(165),t=r(861),a=r(885),c=r(791),i=r(273),l=r(242),u=r(508),o=r(987),d=r(523),h=r(184);var m=function(e){return(0,h.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:(0,h.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})};var f=function(e){return(0,h.jsx)("li",{className:"user-item",children:(0,h.jsx)(o.Z,{className:"user-item__content",children:(0,h.jsxs)(d.rU,{to:"/".concat(e.id,"/places"),children:[(0,h.jsx)("div",{className:"user-item__image",children:(0,h.jsx)(m,{image:"".concat("https://front-back-w3u3.onrender.com","/").concat(e.image),alt:e.name})}),(0,h.jsxs)("div",{className:"user-item__info",children:[(0,h.jsxs)("h2",{children:[e.name," "]}),(0,h.jsxs)("h3",{children:[e.placeCount," ",1===e.placeCount?"place":"places"]})]})]})})})};var x=function(e){return 0===e.items.length?(0,h.jsx)("div",{className:"center",children:(0,h.jsx)(o.Z,{children:(0,h.jsx)("h2",{children:"No user registered yet."})})}):(0,h.jsx)("ul",{className:"users-list",children:e.items.map((function(e){return(0,h.jsx)(f,{id:e._id,name:e.name,image:e.image,placeCount:e.places.length},e._id)}))})};var j=function(){var e=(0,u.x)(),n=e.isLoading,r=e.error,o=e.sendRequest,d=e.clearError,m=(0,c.useState)(),f=(0,a.Z)(m,2),j=f[0],p=f[1];return(0,c.useEffect)((function(){var e=function(){var e=(0,t.Z)((0,s.Z)().mark((function e(){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o("https://front-back-w3u3.onrender.com/api/users");case 3:n=e.sent,p(n.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[o]),(0,h.jsxs)(c.Fragment,{children:[(0,h.jsx)(i.Z,{error:r,onClear:d}),n&&(0,h.jsx)("div",{className:"center",children:(0,h.jsx)(l.Z,{})}),!n&&j&&(0,h.jsx)(x,{items:j})]})}}}]);
//# sourceMappingURL=583.1dc49641.chunk.js.map
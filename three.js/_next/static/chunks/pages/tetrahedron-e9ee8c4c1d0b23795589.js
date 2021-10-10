(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[650],{7858:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var r=n(9008),a=n(1228),s=n(1044),i=n(6215),c=n(1664),l=n(7294),o=n(3802),u=n(5893),d=[{id:0,name:"Ambient"},{id:1,name:"Hemisphere"},{id:2,name:"Directional"},{id:3,name:"Point Light"},{id:4,name:"Spot Light"}];function m(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}var h=[{name:"Torus",href:"/torus",current:!1},{name:"Kerucut",href:"/kerucut",current:!1},{name:"Ikosahedron",href:"/ikosahedron",current:!1},{name:"Tetrahedron",href:"/tetrahedron",current:!0},{name:"Dodecahedron",href:"/dodecahedron",current:!1},{name:"Torus Knot",href:"/torus-knot",current:!1}];function x(){var e=(0,l.useState)(d[0]),t=e[0],n=e[1],x=(0,l.useRef)(null),f=(0,l.useRef)(null);return(0,l.useEffect)((function(){for(var e in f.current=new THREE.Scene,x.current=[new THREE.AmbientLight(16777215),new THREE.HemisphereLight(16777215,526368,1),new THREE.DirectionalLight(16777215,1.2),new THREE.PointLight(16777215,5,100),new THREE.SpotLight(16777215)],x.current)x.current[e].visible=!1,f.current.add(x.current[e]);x.current[3].position.set(50,50,50),x.current[0].visible=!0;var t=new THREE.TetrahedronGeometry,n=new THREE.MeshStandardMaterial({color:16777215,wireframe:!1}),r=new THREE.PerspectiveCamera(75,1,.1,1e3);r.position.set(0,0,25);var a=new THREE.WebGLRenderer(document.getElementById("canvas").getContext("webgl"),null,"highp",!0);a.setSize(500,500);var s=new THREE.Mesh(t,n);f.current.add(s),r.position.z=5,function e(){requestAnimationFrame(e),s.rotation.x+=.01,s.rotation.y+=.01,a.render(f.current,r)}()}),[]),(0,u.jsxs)("div",{className:"bg-gray-800 flex flex-col items-center justify-center min-h-screen py-2",children:[(0,u.jsxs)(r.default,{children:[(0,u.jsx)("title",{children:"Tetrasahedron - Tugas Three.js - Zydhan - Grafika Komputer A"}),(0,u.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,u.jsx)("script",{src:"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"}),(0,u.jsx)("meta",{property:"og:title",content:"Tetrahedron - Tugas Three.js - Zydhan - Grafika Komputer A"}),(0,u.jsx)("meta",{property:"og:type",content:"website"}),(0,u.jsx)("meta",{property:"og:url",content:"https://cg2021a.github.io/tugas-1-zydhanlinnar11/three.js/tetrahedron"})]}),(0,u.jsxs)("main",{className:"flex flex-col items-center justify-center w-full flex-1 px-20 text-center",children:[(0,u.jsx)("h1",{className:"text-6xl font-bold text-white",children:"Tugas Three.js"}),(0,u.jsx)("p",{className:"mt-3 text-xl text-gray-400 font-semibold",children:"Geometri, Material, dan Pencahayaan"}),(0,u.jsx)(a.p,{as:"nav",className:"mt-5",children:function(e){e.open;return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("div",{className:"max-w-7xl mx-auto px-2 sm:px-6 lg:px-8",children:(0,u.jsx)("div",{className:"relative flex items-center justify-between h-16",children:(0,u.jsx)("div",{className:"flex-1 flex items-center justify-center sm:items-stretch sm:justify-start",children:(0,u.jsx)("div",{children:(0,u.jsx)("div",{className:"flex space-x-4",children:h.map((function(e){return(0,u.jsx)(c.default,{href:e.href,children:(0,u.jsx)("a",{className:m(e.current?"bg-gray-900 text-white":"text-gray-300 hover:bg-gray-700 hover:text-white","px-3 py-2 rounded-md text-sm font-medium","px-3 py-2 rounded-md text-sm font-medium"),"aria-current":e.current?"page":void 0,children:e.name})},e.name)}))})})})})})})}}),(0,u.jsxs)(s.R,{value:t,onChange:function(e){n(e),x.current&&x.current.forEach((function(e){e.visible=!1})),x.current[e.id].visible=!0},children:[(0,u.jsx)(s.R.Label,{className:"block text-sm font-medium text-gray-300",children:"Pencahayaan"}),(0,u.jsxs)("div",{className:"mt-3 relative",children:[(0,u.jsxs)(s.R.Button,{className:"relative w-full bg-transparent border ring-white ring-opacity-30 outline-none text-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm",children:[(0,u.jsx)("span",{className:"flex items-center",children:(0,u.jsx)("span",{className:"block truncate",children:t.name})}),(0,u.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,u.jsx)(o.Ta4,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),(0,u.jsx)(i.u,{as:l.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,u.jsx)(s.R.Options,{className:"absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-white ring-opacity-30 overflow-auto focus:outline-none sm:text-sm",children:d.map((function(e){return(0,u.jsx)(s.R.Option,{className:function(e){return m(e.active?"text-white bg-gray-600":"text-gray-300","cursor-default select-none relative py-2 pl-3 pr-9")},value:e,children:function(t){var n=t.selected;t.active;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"flex items-center",children:(0,u.jsx)("span",{className:m(n?"font-semibold":"font-normal","block truncate"),children:e.name})}),n?(0,u.jsx)("span",{className:m("text-white","absolute inset-y-0 right-0 flex items-center pr-4"),children:(0,u.jsx)(o.nQG,{className:"h-5 w-5","aria-hidden":"true"})}):null]})}},e.id)}))})})]})]}),(0,u.jsx)("canvas",{id:"canvas"})]}),(0,u.jsx)("footer",{className:"flex items-center justify-center w-full h-10",children:(0,u.jsx)("small",{className:"text-base text-gray-400 text-opacity-80 font-semibold",children:"Zydhan Linnar Putra - 05111940000118"})})]})}},3063:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tetrahedron",function(){return n(7858)}])}},function(e){e.O(0,[454,898,774,888,179],(function(){return t=3063,e(e.s=t);var t}));var t=e.O();_N_E=t}]);
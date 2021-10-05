function pushToVerticesAndIndices(vertices = [], indices = [], colors = [], additionalVerticesandIndices = { v: [], i: [], c: [] }) {
  indices.push(...additionalVerticesandIndices.i.map(index => (index + vertices.length / 3)))
  vertices.push(...additionalVerticesandIndices.v)
  colors.push(...additionalVerticesandIndices.c)
}

function getFrontSideRedAntena() {
  const v = [
    // Front face
  -1.0, -0.5,  0.8,
   1.0, -0.5,  0.8,
   1.0,  0.5,  0.8,
  -1.0,  0.5,  0.8,

  // Back face
  -1.0, -0.5,  0.6,
   1.0, -0.5,  0.6,
   1.0,  0.5,  0.6,
  -1.0,  0.5,  0.6,

  // Top face
  -1.0,  0.5, 0.6,
  -1.0,  0.5,  0.8,
   1.0,  0.5,  0.8,
   1.0,  0.5, 0.6,

  // Bottom face
  -1.0, -0.5, 0.6,
   1.0, -0.5, 0.6,
   1.0, -0.5,  0.8,
  -1.0, -0.5,  0.8,

  // Right face
   1.0, -0.5, 0.6,
   1.0,  0.5, 0.6,
   1.0,  0.5,  0.8,
   1.0, -0.5,  0.8,

  // Left face
  -1.0, -0.5, 0.6,
  -1.0, -0.5,  0.8,
  -1.0,  0.5,  0.8,
  -1.0,  0.5, 0.6,
  ]
  const i = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];
  const scaleXY = 1.2
  const backVertices = []
  for(let k=0; k<v.length; k++)
    if(k % 3 != 2) backVertices.push(v[k] * scaleXY)
    else backVertices.push(v[k] - 0.2)
  i.push(...i.map(index => (index + v.length / 3)))
  v.push(...backVertices)
  const c = []
  for(let k=0; k<i.length / 3; k++) c.push(...[160 / 255, 83/255, 43/255])
  for(let k=0; k<i.length / 3; k++) c.push(...[179 / 255, 83/255, 43/255])
  // console.log(indices)
  return {v, i, c}
}

function getBackSideRedAntena() {
  const frontSide = getFrontSideRedAntena()
  const mirrorPosZ = 0.0
  for(let i=2; i<frontSide.v.length; i += 3)
    frontSide.v[i] = mirrorPosZ - Math.abs(frontSide.v[i] - mirrorPosZ)
  return frontSide
}

function getWhiteBatangAntena() {
  const radius = 0.3
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const vNew = [
      radius * Math.sin(degreeCurrRad),2.5,centerZ + radius * Math.cos(degreeCurrRad),
      radius * Math.sin(degreeCurrRad),-1.5,centerZ + radius * Math.cos(degreeCurrRad),
      radius * Math.sin(degreeNextRad),-1.5,centerZ + radius * Math.cos(degreeNextRad),
      radius * Math.sin(degreeNextRad), 2.5,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<360; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  // console.log(v)
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getAlasAntena() {
  const radius = 1.1
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const vNew = [
      1,-1.5,centerZ + 0,
      1,-1.7,centerZ + 0,
      radius * Math.sin(degreeNextRad),-1.7,centerZ + radius * Math.cos(degreeNextRad),
      radius * Math.sin(degreeNextRad), -1.5,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<360; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  const c = []
  for(let k=0; k<i.length/2; k++) c.push(...[160 / 255, 83/255, 43/255])
  // for(let k=0; k<i.length / 3; k++) c.push(...[179 / 255, 83/255, 43/255])
  // console.log(indices)
  return {v, i, c}
}

function getSiripDepanAtasAntena() {
  const radius = 0.08
  const centerZ = 0.45
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = -0.4
    const vNew = [
      2,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.2,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.2,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      2,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = -0.4
    const vNew = [
      -2,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      -1.2,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      -1.2,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      -2,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<720-1; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getSiripTengahAntena() {
  const radius = 0.075
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = 1
    const vNew = [
      -1.1,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.1,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.1,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      -1.1,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = 1.9
    const vNew = [
      -1.1,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.1,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      1.1,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      -1.1,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<720-1; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  // console.log(v)
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getBulatBesarAntena() {
  const radius = 1.8
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = 1.73
    const vNew = [
      radius * Math.sin(degreeCurrRad), offsetY + radius * Math.cos(degreeCurrRad),-0.4,
      radius * Math.sin(degreeCurrRad), offsetY + radius * Math.cos(degreeCurrRad), -0.5,
      radius * Math.sin(degreeNextRad), offsetY + radius * Math.cos(degreeNextRad), -0.5,
      radius * Math.sin(degreeNextRad), offsetY + radius * Math.cos(degreeNextRad),-0.4
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<360; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  // console.log(v)
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getBawahBulatBesarAntena() {
  const radius = 0.4
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = [
    1.2, -0.5, -0.4,
    1.5, -0.5, -0.4,
    1.5, -0.4, -0.5,
    1.2, -0.4, -0.5,
    1.0, -0.8, -0.8,
    1.5, -0.8, -0.8,
    1.5, -0.9, -0.9,
    1.0, -0.9, -0.9,
    -1.2, -0.5, -0.4,
    -1.5, -0.5, -0.4,
    -1.5, -0.4, -0.5,
    -1.2, -0.4, -0.5,
    -1.0, -0.8, -0.8,
    -1.5, -0.8, -0.8,
    -1.5, -0.9, -0.9,
    -1.0, -0.9, -0.9,
  ]
  for(let i=0; i<22; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = -0.4
    const vNew = [
      1.5 + radius * Math.sin(degreeCurrRad), -0.5 - radius * Math.sin(degreeCurrRad / 2),-0.4 - radius * Math.sin(degreeCurrRad / 2),
      1.5 + radius * Math.sin(degreeCurrRad), -0.5 - radius * Math.sin(degreeCurrRad / 2), -0.5 - radius * Math.sin(degreeCurrRad / 2),
      1.5 + radius * Math.sin(degreeNextRad), -0.4 - radius * Math.sin(degreeNextRad / 2), -0.5 - radius * Math.sin(degreeCurrRad / 2),
      1.5 + radius * Math.sin(degreeNextRad), -0.4 - radius * Math.sin(degreeNextRad / 2),-0.4 - radius * Math.sin(degreeCurrRad / 2),
      -(1.5 + radius * Math.sin(degreeCurrRad)), -0.5 - radius * Math.sin(degreeCurrRad / 2),-0.4 - radius * Math.sin(degreeCurrRad / 2),
      -(1.5 + radius * Math.sin(degreeCurrRad)), -0.5 - radius * Math.sin(degreeCurrRad / 2), -0.5 - radius * Math.sin(degreeCurrRad / 2),
      -(1.5 + radius * Math.sin(degreeNextRad)), -0.4 - radius * Math.sin(degreeNextRad / 2), -0.5 - radius * Math.sin(degreeCurrRad / 2),
      -(1.5 + radius * Math.sin(degreeNextRad)), -0.4 - radius * Math.sin(degreeNextRad / 2),-0.4 - radius * Math.sin(degreeCurrRad / 2)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = [3,2,1,3,1,0]
  for(let k=1;k<180; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  // console.log(v)
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getSegitigaAntena() {
  const radius = 0.4
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = [
    1.2, 0.4, 0.4,
    1.6, 0.4, 0.4,
    1.6, 0.4, 0.5,
    1.2, 0.4, 0.5,
    1.6, 0.4, 0.4,
    0, 3.6, 0.4,
    0, 3.6, 0.5,
    1.6, 0.4, 0.5,
    -1.2, 0.4, 0.4,
    -1.6, 0.4, 0.4,
    -1.6, 0.4, 0.5,
    -1.2, 0.4, 0.5,
    -1.6, 0.4, 0.4,
    -0, 3.6, 0.4,
    -0, 3.6, 0.5,
    -1.6, 0.4, 0.5,
  ]
  const iCalon = [3,2,1,3,1,0];
  const i = [3,2,1,3,1,0]
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

function getXBawah() {
  const radius = 0.4
  const centerZ = 0.0
  const keliling = Math.PI * 2 * radius
  const v = [
    1.2, -0.8, -0.8,
    0.8, -0.8, -1,
    0, -0.8, -0,
    0.3, -0.8, -0,
    -1.2, -0.8, -0.8,
    -0.8, -0.8, -1,
    -0, -0.8, -0,
    -0.3, -0.8, -0,
    1.2, -0.8, 0.8,
    0.8, -0.8, 1,
    0, -0.8, 0,
    0.3, -0.8, 0,
    -1.2, -0.8, 0.8,
    -0.8, -0.8, 1,
    -0, -0.8, 0,
    -0.3, -0.8, 0,
  ]
  const iCalon = [3,2,1,3,1,0];
  const i = [3,2,1,3,1,0]
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[160 / 255, 83/255, 43/255])
  return {v, i, c}
}

function getSiripDepanBawahhhAntena() {
  const radius = 0.08
  const centerZ = 0.9
  const keliling = Math.PI * 2 * radius
  const v = []
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = -0.8
    const vNew = [
      1.6,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      0.7,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      0.7,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      1.6,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  for(let i=0; i<360; i++) {
    const degreeCurrRad = i * 0.5 / Math.PI
    const degreeNextRad = (i + 1) * 0.5 / Math.PI
    const offsetY = -0.8
    const vNew = [
      -1.6,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      -0.7,radius * Math.sin(degreeCurrRad) + offsetY,centerZ + radius * Math.cos(degreeCurrRad),
      -0.7,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad),
      -1.6,radius * Math.sin(degreeNextRad) + offsetY,centerZ + radius * Math.cos(degreeNextRad)
    ]
    v.push(...vNew)
  }
  const iCalon = [3,2,1,3,1,0];
  const i = []
  for(let k=0;k<720-1; k++) {
    i.push(...iCalon.map(calon => (calon + (k*4))))
  }
  const c = []
  for(let k=0; k<i.length; k++) c.push(...[1, 1, 1])
  return {v, i, c}
}

/**
 * @type {HTMLCanvasElement} canvas
 */
var canvas = document.getElementById("myCanvas");

/**
 * @type {WebGLRenderingContext} gl
 */

/* Step1: Prepare the canvas and get WebGL context */

var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

/*======== Defining and storing the geometry ===========*/

var vertices = []
var indices = [];

var colors = [];


pushToVerticesAndIndices(vertices, indices, colors, getFrontSideRedAntena())
pushToVerticesAndIndices(vertices, indices, colors, getBackSideRedAntena())
pushToVerticesAndIndices(vertices, indices, colors, getWhiteBatangAntena())
pushToVerticesAndIndices(vertices, indices, colors, getAlasAntena())
pushToVerticesAndIndices(vertices, indices, colors, getSiripDepanAtasAntena())
pushToVerticesAndIndices(vertices, indices, colors, getSiripTengahAntena())
pushToVerticesAndIndices(vertices, indices, colors, getBulatBesarAntena())
pushToVerticesAndIndices(vertices, indices, colors, getBawahBulatBesarAntena())
pushToVerticesAndIndices(vertices, indices, colors, getSegitigaAntena())
pushToVerticesAndIndices(vertices, indices, colors, getXBawah())
pushToVerticesAndIndices(vertices, indices, colors, getSiripDepanBawahhhAntena())
// console.log(vertices.length)
// pushToVerticesAndIndices(vertices, indices, getLeftSideRedAntena())
// pushToVerticesAndIndices(vertices, indices, getRightSideRedAntena())

// var maks = 0;
// vertices.forEach(point => maks = Math.max(maks, Math.abs(point)))
// vertices = vertices.map(point => (point / (maks * 2)))
// console.log(vertices)
// console.log(indices)
// console.log(colors)
// indices.forEach(indices => colors.push(...[189 / 255, 83/255, 43/255]))

// Create and store data into vertex buffer
var vertex_buffer = gl.createBuffer ();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create and store data into color buffer
var color_buffer = gl.createBuffer ();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// Create and store data into index buffer
var index_buffer = gl.createBuffer ();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

/*=================== Shaders =========================*/

var vertCode = 'attribute vec3 position;'+
  'uniform mat4 Pmatrix;'+
  'uniform mat4 Vmatrix;'+
  'uniform mat4 Mmatrix;'+
  'attribute vec3 color;'+//the color of the point
  'varying vec3 vColor;'+

  'void main(void) { '+//pre-built function
      'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
      'vColor = color;'+
  '}';

var fragCode = 'precision mediump float;'+
  'varying vec3 vColor;'+
  'void main(void) {'+
      'gl_FragColor = vec4(vColor, 1.);'+
  '}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);

/* ====== Associating attributes to vertex shader =====*/
var Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
var Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
var Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var position = gl.getAttribLocation(shaderProgram, "position");
gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ;

// Position
gl.enableVertexAttribArray(position);
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var color = gl.getAttribLocation(shaderProgram, "color");
gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

// Color
gl.enableVertexAttribArray(color);
gl.useProgram(shaderProgram);

/*==================== MATRIX =====================*/

function get_projection(angle, a, zMin, zMax) {
  var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
  return [
      0.5/ang, 0 , 0, 0,
      0, 0.5*a/ang, 0, 0,
      0, 0, -(zMax+zMin)/(zMax-zMin), -1,
      0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 
  ];
}

var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);

var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

// translating z
view_matrix[14] = view_matrix[14]-6;//zoom

/*==================== Rotation ====================*/

function rotateZ(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[0], mv4 = m[4], mv8 = m[8];

  m[0] = c*m[0]-s*m[1];
  m[4] = c*m[4]-s*m[5];
  m[8] = c*m[8]-s*m[9];

  m[1]=c*m[1]+s*mv0;
  m[5]=c*m[5]+s*mv4;
  m[9]=c*m[9]+s*mv8;
}

function rotateX(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv1 = m[1], mv5 = m[5], mv9 = m[9];

  m[1] = m[1]*c-m[2]*s;
  m[5] = m[5]*c-m[6]*s;
  m[9] = m[9]*c-m[10]*s;

  m[2] = m[2]*c+mv1*s;
  m[6] = m[6]*c+mv5*s;
  m[10] = m[10]*c+mv9*s;
}

function rotateY(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[0], mv4 = m[4], mv8 = m[8];

  m[0] = c*m[0]+s*m[2];
  m[4] = c*m[4]+s*m[6];
  m[8] = c*m[8]+s*m[10];

  m[2] = c*m[2]-s*mv0;
  m[6] = c*m[6]-s*mv4;
  m[10] = c*m[10]-s*mv8;
}

/*================= Drawing ===========================*/
var time_old = 0;
  // rotateY(mov_matrix, 2);

var animate = function(time) {

  var dt = time-time_old;
  // rotateZ(mov_matrix, dt*0.005);//time
  rotateY(mov_matrix, dt*0.002);
  // rotateX(mov_matrix, dt*0.003);
  time_old = time;

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.clearDepth(1.0);

  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
  gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
  gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  window.requestAnimationFrame(animate);
}
animate(0);
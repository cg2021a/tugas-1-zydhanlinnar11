function pushToVerticesAndIndices(vertices = [], indices = [], additionalVerticesandIndices = { v: [], i: [] }) {
  indices.push(...additionalVerticesandIndices.i.map(index => (index + vertices.length / 3)))
  additionalVerticesandIndices.v.forEach(point => vertices.push(point))
}

function getLeftSideRedAntena() {
  const v = [
    -1.1976398541642, 0.6611170771304, 0.0,
    -1.0083258936041, 0.7054245998147, 0.0,
    -0.9793329926132, -0.4529150815375, 0.0,
    -1.1783451992018, -0.4656722742675, 0.0,
    -1.0139106582095, 0.9337170051341, 0.0,
    -0.8891853285626, 0.9811025591537, 0.0,
    -0.8291636268045, -0.509962873995, 0.0,
    -0.98552510419, -0.509962873995, 0.0,
  ]
  const i = [0,1,2,2,3,0,4,5,6,6,7,5,4,5,7];
  return {v, i}
}

function getRightSideRedAntena() {
  // Dicerminkan terhadap y = -19x - 5.1520960013922
  const m = -19, c = - 5.1520960013922
  const theta = Math.atan(m)
  function getX(x, y) {
    return Math.cos(2*theta)*x+Math.sin(2*theta)*(y-c)
  }
  function getY(x, y) {
    return (Math.sin(2*theta)*x-Math.cos(2*theta)*(y-c))+c
  }
  const leftSide = getLeftSideRedAntena()
  const v = []
  for(let i=0; i<leftSide.v.length; i++)
    if(i % 3 == 0) v.push(getX(leftSide.v[i], leftSide.v[i + 1]))
    else if(i % 3 == 1) v.push(getY(leftSide.v[i - 1], leftSide.v[i]))
    else v.push(leftSide.v[i])
  const i = leftSide.i
  return {v, i}
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

pushToVerticesAndIndices(vertices, indices, getLeftSideRedAntena())
pushToVerticesAndIndices(vertices, indices, getRightSideRedAntena())

var maks = 0;
vertices.forEach(point => maks = Math.max(maks, Math.abs(point)))
vertices = vertices.map(point => (point / (maks * 2)))
console.log(vertices)
console.log(indices)

// Create an empty buffer object to store vertex buffer
var vertex_buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Create an empty buffer object to store Index buffer
var Index_Buffer = gl.createBuffer();

// Bind appropriate array buffer to it
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Pass the vertex data to the buffer
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

// Unbind the buffer
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

/*================ Shaders ====================*/

// Vertex shader source code
var vertCode =
  'attribute vec3 coordinates;' +

  'void main(void) {' +
      ' gl_Position = vec4(coordinates, 1.0);' +
  '}';
  
// Create a vertex shader object
var vertShader = gl.createShader(gl.VERTEX_SHADER);

// Attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

// Compile the vertex shader
gl.compileShader(vertShader);

//fragment shader source code
const antenaRedColor = [189 / 255, 83/255, 43/255]
var fragCode =
  'void main(void) {' +
      ` gl_FragColor = vec4(${antenaRedColor[0]}, ${antenaRedColor[1]}, ${antenaRedColor[2]}, 1);` +
  '}';
  
// Create fragment shader object
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// Attach fragment shader source code
gl.shaderSource(fragShader, fragCode); 

// Compile the fragmentt shader
gl.compileShader(fragShader);

// Create a shader program object to store
// the combined shader program
var shaderProgram = gl.createProgram();

// Attach a vertex shader
gl.attachShader(shaderProgram, vertShader);

// Attach a fragment shader
gl.attachShader(shaderProgram, fragShader);

// Link both the programs
gl.linkProgram(shaderProgram);

// Use the combined shader program object
gl.useProgram(shaderProgram);

/*======= Associating shaders to buffer objects =======*/

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

// Bind index buffer object
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Get the attribute location
var coord = gl.getAttribLocation(shaderProgram, "coordinates");

// Point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 

// Enable the attribute
gl.enableVertexAttribArray(coord);

/*=========Drawing the triangle===========*/

// Clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.0);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
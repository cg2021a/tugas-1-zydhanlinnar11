// Canvas
const canvas = document.getElementById('canvas')

// Scene
const scene = new THREE.Scene()
const loader = new THREE.CubeTextureLoader()
const texture = loader.load([
  'cubemap/px.png',
  'cubemap/nx.png',
  'cubemap/py.png',
  'cubemap/ny.png',
  'cubemap/pz.png',
  'cubemap/nz.png',
])
scene.background = texture

// Add Lighting
scene.add(new THREE.DirectionalLight(0xffffff, 0.8))
scene.add(new THREE.AmbientLight(0xd1fff0, 0.85))

// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
})

// Cube camera
const cubeCamera = new THREE.CubeCamera(1, 100000, cubeRenderTarget)
cubeCamera.position.set(0, 0, 0)
scene.add(cubeCamera)

const reflectSphere = new THREE.Mesh(
  new THREE.SphereGeometry(200, 150, 150),
  new THREE.MeshLambertMaterial({
    color: 0xffffff,
    envMap: cubeRenderTarget.texture,
  })
)
reflectSphere.position.set(0, 0, 0)
scene.add(reflectSphere)

// Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  2000
)
camera.position.set(0, 400, 800)

const orbitControls = new THREE.OrbitControls(camera, canvas)
orbitControls.target.set(0, 5, 0)
orbitControls.enableZoom = false
orbitControls.dampingFactor = 0.5
orbitControls.enableDamping = true
orbitControls.enableRotate = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antiAlias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Interaction
window.addEventListener('resize', () => {
  sizes.width = 0.9 * window.innerWidth
  sizes.height = 0.9 * window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const mainLoop = () => {
  renderer.render(scene, camera)
  reflectSphere.visible = false
  cubeCamera.update(renderer, scene)
  reflectSphere.visible = true
  orbitControls.update()
  window.requestAnimationFrame(mainLoop)
}

mainLoop()

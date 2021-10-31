// Canvas
const canvas = document.getElementById('canvas')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  antiAlias: true,
  canvas: canvas,
  alpha: true,
})
renderer.setSize(window.innerWidth * 0.85, window.innerHeight * 0.85)
renderer.setPixelRatio(window.devicePixelRatio)

camera.position.z += -4
camera.position.y += 2
camera.position.x += -3

window.addEventListener('resize', function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight)
  camera.aspect = this.window.innerWidth / this.window.innerHeight
  camera.updateProjectionMatrix()
})

const controls = new THREE.OrbitControls(camera, canvas)

const loader = new THREE.GLTFLoader().load(
  'brawn_gp/scene.gltf',
  function (result) {
    const brawn_gp = result.scene.children[0]
    brawn_gp.castShadow = true
    brawn_gp.scale.set(11, 11, 11)
    scene.add(brawn_gp)
  }
)

const hlight = new THREE.AmbientLight(0xffffff, 1)
scene.add(hlight)

function updateScene() {
  renderer.render(scene, camera)
  requestAnimationFrame(updateScene)
}

updateScene()

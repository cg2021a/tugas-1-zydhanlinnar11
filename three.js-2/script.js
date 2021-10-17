function createScene() {
  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.z = 6
  scene.add(light)
  return scene
}

function rndNextInt(lo, hi) {
  return Math.trunc(Math.random() * (hi - lo) + lo)
}

function createBall(color, position) {
  const geometry = new THREE.SphereGeometry(0.3)
  const material = new THREE.MeshPhongMaterial({ color: color })
  const ball = new THREE.Mesh(geometry, material)
  ball.position.x = position[0]
  ball.position.y = position[1]
  ball.originalColor = color
  //   console.log(`(${ball.position.x}, ${ball.position.y})`)
  //   ball.position.y = -2
  return ball
}

function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })
  renderer.setSize(
    canvas.getBoundingClientRect().width,
    canvas.getBoundingClientRect().height
  )
  renderer.setPixelRatio(
    canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height
  )
  return renderer
}

const scene = createScene()
const renderer = createRenderer(document.getElementById('canvas'))
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.getBoundingClientRect().width / canvas.getBoundingClientRect().height,
  0.1,
  1000
)

function playGame() {
  camera.position.z = 6
  animate()
}

// Get state
let spawnSpeed = 0.005
let spawnSum = 0
let objectCount = 0
let spawnedPos = []
const colorList = [0xc93d45, 0xffd100, 0x138176, 0x3d7196, 0x000000, 0x555555]

function randomColor() {
  return colorList[rndNextInt(0, colorList.length - 1)]
}

function randomPosition() {
  let x = rndNextInt(-5, 5)
  let y = rndNextInt(-2, 2)
  while (spawnedPos.indexOf(`${x}${y}`) != -1) {
    x = rndNextInt(-7, 7)
    y = rndNextInt(-5, 5)
  }
  return [x, y]
}

const animate = function () {
  requestAnimationFrame(animate)
  if (spawnSum >= 1) {
    // Waktunya spawn
    spawnSum = 0
    // Tambah speed
    spawnSpeed += 0.0004
    const position = randomPosition()
    const ball = createBall(randomColor(), position)
    scene.add(ball)
    spawnedPos.push(`${position[0]}${position[1]}`)
    // console.log(ball)
    objectCount++
    if (objectCount > 11) {
      // Game over
    }
  } else {
    spawnSum += spawnSpeed
    // console.log(spawnSum)
  }
  renderer.render(scene, camera)
}

const rayCast = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let selectedObj = []
let score = 0

function unselectObject(obj) {
  obj.material.color.set(obj.originalColor)
}

function selectObject(obj) {
  obj.material.color.set(0xffffff)
  selectedObj.push(obj)
}

function setScore(newScore) {
  score = newScore
  document.getElementById('skor').innerText = score
}

document.getElementById('canvas').onclick = (e) => {
  mouse.x = (e.offsetX / canvas.getBoundingClientRect().width) * 2 - 1
  mouse.y = -(e.offsetY / canvas.getBoundingClientRect().height) * 2 + 1
  rayCast.setFromCamera(mouse, camera)
  const items = rayCast.intersectObjects(scene.children, false)
  const item = items.length > 0 ? items[0].object : null
  if (!item) return
  if (selectedObj.length == 1 && item == selectedObj[0]) {
    unselectObject(selectedObj[0])
    selectedObj = []
    return
  }
  //   console.log(item.position)
  selectObject(item)
  if (selectedObj.length == 2) {
    if (selectedObj[0].originalColor != selectedObj[1].originalColor) {
      unselectObject(selectedObj[0])
      unselectObject(selectedObj[1])
      selectedObj = []
      return
    }
    setScore(score + 1)
    // console.log(score)
    spawnedPos = spawnedPos.filter(
      (val) => val != `${selectedObj[0].position.x}${selectedObj[0].position.y}`
    )
    spawnedPos = spawnedPos.filter(
      (val) => val != `${selectedObj[1].position.x}${selectedObj[1].position.y}`
    )
    scene.remove(selectedObj[0])
    scene.remove(selectedObj[1])
    selectedObj = []
  }
}

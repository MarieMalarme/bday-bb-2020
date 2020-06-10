import * as THREE from './three.module.js'

let camera
let scene
let renderer

const canvas = document.getElementById('canvas')

const imgs = {
  bb: [-10, 0, -55],
  bb2: [13, 20, -30],
  bb3: [15, -10, 21],
  bb4: [-20, 40, 15],
  bb5: [32, 60, -40],
  bb6: [-10, -15, 40],
  bb7: [4, 23, 5],
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    500,
  )
  camera.position.set(0, 0, 75)
  camera.lookAt(scene.position)

  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(0, 0, 100)
  spotLight.castShadow = true
  scene.add(spotLight)

  Object.entries(imgs).map(([img, [x, y, z]], i) => {
    const geo = new THREE.SphereGeometry(10, 10, 10)
    const texture = new THREE.TextureLoader().load(`./${img}.jpg`)
    const mat = new THREE.MeshPhongMaterial({ map: texture })
    const sphere = new THREE.Mesh(geo, mat)
    sphere.position.set(x, y, z)
    scene.add(sphere)
  })

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setClearAlpha(0)
  renderer.setSize(window.innerWidth, window.innerHeight)

  canvas.appendChild(renderer.domElement)

  const filter = document.getElementById('filter')

  let count = 0

  const render = () => {
    scene.children.forEach((c) => {
      c.rotation.x += 0.02
      c.rotation.y += 0.02
      c.rotation.z += 0.02
      filter.style.background = `hsl(${count}, 50%, 50%)`
      count += 0.05
    })

    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  render()
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

init()
render()

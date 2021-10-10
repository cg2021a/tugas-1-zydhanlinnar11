import Head from 'next/head'
import { Disclosure, Listbox, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Fragment, useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const lighting = [
  {
    id: 0,
    name: 'Ambient',
  },
  {
    id: 1,
    name: 'Hemisphere',
  },
  {
    id: 2,
    name: 'Directional',
  },
  {
    id: 3,
    name: 'Point Light',
  },
  {
    id: 4,
    name: 'Spot Light',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'Torus', href: '/torus', current: false },
  { name: 'Kerucut', href: '/kerucut', current: false },
  { name: 'Ikosahedron', href: '/ikosahedron', current: false },
  { name: 'Tetrahedron', href: '/tetrahedron', current: false },
  { name: 'Dodecahedron', href: '/dodecahedron', current: false },
  { name: 'Torus Knot', href: '/torus-knot', current: true },
]

export default function Tabung() {
  const [selected, setSelected] = useState(lighting[0])
  let lights = useRef(null)
  const scene = useRef(null)

  useEffect(() => {
    scene.current = new THREE.Scene()

    // Light
    lights.current = [
      new THREE.AmbientLight(0xffffff),
      new THREE.HemisphereLight(0xffffff, 0x080820, 1),
      new THREE.DirectionalLight(0xffffff, 1.2),
      new THREE.PointLight(0xffffff, 5, 100),
      new THREE.SpotLight(0xffffff),
    ]
    for (let light in lights.current) {
      lights.current[light].visible = false
      scene.current.add(lights.current[light])
    }
    lights.current[3].position.set(50, 50, 50)
    lights.current[0].visible = true

    // Geometry
    const geometry = new THREE.TorusKnotGeometry()
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xc93d45,
      wireframe: true,
    })

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.set(0, 0, 25)

    const renderer = new THREE.WebGLRenderer(
      document.getElementById('canvas').getContext('webgl'),
      null,
      'highp',
      true
    )
    renderer.setSize(500, 500)

    const tube = new THREE.Mesh(geometry, material)
    scene.current.add(tube)

    camera.position.z = 5
    function animate() {
      requestAnimationFrame(animate)
      tube.rotation.x += 0.01
      tube.rotation.y += 0.01
      renderer.render(scene.current, camera)
    }
    animate()
  }, [])

  function changeActiveLight(obj) {
    setSelected(obj)
    if (lights.current)
      lights.current.forEach((light) => {
        light.visible = false
      })
    lights.current[obj.id].visible = true
  }

  return (
    <div className='bg-gray-800 flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Torus Knot - Tugas Three.js - Zydhan - Grafika Komputer A</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'></script>
        <meta
          property='og:title'
          content='Torus Knot - Tugas Three.js - Zydhan - Grafika Komputer A'
        />
        <meta
          property='og:description'
          content='Tugas Three.js by Zydhan Linnar Putra - 05111940000118'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://cg2021a.github.io/tugas-1-zydhanlinnar11/three.js/torus-knot'
        />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold text-white'>Tugas Three.js</h1>

        <p className='mt-3 text-xl text-gray-400 font-semibold'>
          Geometri, Material, dan Pencahayaan
        </p>

        <Disclosure as='nav' className='mt-5'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                  <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                    <div>
                      <div className='flex space-x-4'>
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <Listbox value={selected} onChange={changeActiveLight}>
          <Listbox.Label className='block text-sm font-medium text-gray-300'>
            Pencahayaan
          </Listbox.Label>
          <div className='mt-3 relative'>
            <Listbox.Button className='relative w-full bg-transparent border ring-white ring-opacity-30 outline-none text-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default sm:text-sm'>
              <span className='flex items-center'>
                <span className='block truncate'>{selected.name}</span>
              </span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-white ring-opacity-30 overflow-auto focus:outline-none sm:text-sm'>
                {lighting.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-gray-600' : 'text-gray-300',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <canvas id='canvas'></canvas>
      </main>

      <footer className='flex items-center justify-center w-full h-10'>
        <small className='text-base text-gray-400 text-opacity-80 font-semibold'>
          Zydhan Linnar Putra - 05111940000118
        </small>
      </footer>
    </div>
  )
}

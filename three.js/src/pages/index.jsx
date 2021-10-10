import Head from 'next/head'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'Torus', href: '/torus', current: false },
  { name: 'Kerucut', href: '/kerucut', current: false },
  { name: 'Ikosahedron', href: '/ikosahedron', current: false },
  { name: 'Tetrahedron', href: '/tetrahedron', current: false },
  { name: 'Dodecahedron', href: '/dodecahedron', current: false },
  { name: 'Torus Knot', href: '/torus-knot', current: false },
]

export default function Home() {
  return (
    <div className='bg-gray-800 flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Tugas Three.js - Zydhan - Grafika Komputer A</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'></script>
        <meta
          property='og:title'
          content='Tugas Three.js - Zydhan - Grafika Komputer A'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://cg2021a.github.io/tugas-1-zydhanlinnar11/three.js/'
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
        <div id='canvas-region'></div>
      </main>

      <footer className='flex items-center justify-center w-full h-10'>
        <small className='text-base text-gray-400 text-opacity-80 font-semibold'>
          Zydhan Linnar Putra - 05111940000118
        </small>
      </footer>
    </div>
  )
}

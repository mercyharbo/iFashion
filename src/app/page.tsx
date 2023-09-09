import Link from 'next/link'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'

import Modal from '@/types/Modal'

export default function Home() {
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  return (
    <Layout>
      <Hero />

      <Modal
        modalClass='w-[80%] mx-auto top-0 left-0 p-5 z-20 rounded-xl h-screen '
        contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold'
      >
      
        {NavItems.map((items, key) => {
          return (
            <Link href={items} key={key}>
              {items}
            </Link>
          )
        })}
      </Modal>
    </Layout>
  )
}

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'

import { useAppSelector } from '@/redux/Store'
import Modal from '@/types/Modal'

import Link from 'next/link'

export default function Home() {
  // const isModalOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  return (
    <Layout>
      <Hero />

      <Modal
        modalClass='w-[90%] mx-auto top-5 left-4 p-5 z-20 absolute bg-white '
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

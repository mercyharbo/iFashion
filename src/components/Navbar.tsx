'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import clsx from 'clsx'
import {
  BiCartAdd,
  BiHeart,
  BiHistory,
  BiLogOut,
  BiMinus,
  BiPlus,
  BiSearch,
  BiUser,
  BiUserCircle,
} from 'react-icons/bi'

import Button from '@/types/Button'
import InputField from '@/types/InputField'
import ProductJSON from '@/components/Product.json'

// Icons
import hamburger from '@/assets/menu-burger.svg'

import { AppDispatch, useAppSelector } from '@/redux/Store'
import {
  closeModal,
  openModal,
  setCartOpen,
  setProfileOpen,
} from '@/redux/Slice/ModalSlice'
import {
  closeSearchModal,
  openSearchModal,
  setSearchQuercy,
} from '@/redux/Slice/SearchModalSlice'
import Modal from '@/types/Modal'
import { UseCounter } from '@/hooks/Counter'
import { fetchUserProfile } from '@/redux/Slice/UserSlice'
import useToken from '@/hooks/useToken'
import { MdOutlineArrowDropDown } from 'react-icons/md'

// export async function getUser() {
//   const token = localStorage.getItem('token') // get token from the localStorage

//   const headers = new Headers({
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   })

//   const options = {
//     method: 'GET',
//     headers,
//   }

//   const res = await fetch(`${process.env.BASE_URL}/user/profile`, options)

//   if (res.ok) {
//     return res.json()
//   } else {
//     const errorData = await res.json()
//     const errorMessage = errorData.message

//     toast.error(errorMessage, {
//       position: 'top-right',
//       autoClose: 5000, // Adjust as needed
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     })

//     return Promise.reject(errorMessage)
//   }
// }

const Navbar = () => {
  const token = useToken()
  const dispatch = useDispatch<AppDispatch>()
  const { increment, decrement, count } = UseCounter()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )
  const searchQuery = useAppSelector(
    (state) => state.searchModalReducer.modal.searchQuery
  )
  const user = useAppSelector((state) => state.userProfile.user)
  const cartOpen = useAppSelector((state) => state.modalReducer.modal.cartOpen)
  const profileModal = useAppSelector(
    (state) => state.modalReducer.modal.profileOpen
  )
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  useEffect(() => {
    const tl = gsap.timeline()

    if (cartOpen) {
      tl.fromTo(
        '.cartOpen',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.inOut',
          delay: 0.2,
        }
      )

      gsap.from('.cartItems', {
        opacity: 0,
        x: -20,
        stagger: 0.5,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.5,
      })
    }

    if (isOpen) {
      gsap.from('.nav-container', {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power2.out',
      })

      gsap.from('.nav-link', {
        opacity: 0,
        x: -20,
        stagger: 0.5,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    if (isSearchOpen) {
      gsap.from('.search-container', {
        opacity: 0,
        y: -50,
        stagger: 0.2,
        duration: 0.5,
        ease: 'sine.inOut',
      })
    }
  }, [isSearchOpen, cartOpen, isOpen])

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile())
    } else {
      return
    }
  }, [token])

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  const handleNavClose = () => {
    dispatch(closeModal())
  }

  const handleSearchModal = () => {
    dispatch(closeSearchModal())
  }

  const handleSearch = (newQuery: string) => {
    dispatch(setSearchQuercy(newQuery))
  }

  const handleCartOpen = () => {
    dispatch(setCartOpen(!cartOpen))
  }

  return (
    <>
      <nav
        className={clsx(
          'relative z-10 flex flex-row justify-between items-center gap-5 w-full mx-auto xl:px-0 xl:py-5 xl:w-[90%] md:w-full md:py-5 md:px-5 sm:w-full sm:px-5 sm:py-5'
        )}
      >
        <div className='flex justify-center items-center gap-3'>
          <Button
            onClick={handleOpenModal}
            icon={<Image src={hamburger} width={25} height={25} alt='icon' />}
            buttonClass='xl:hidden md:hidden sm:flex '
          />
          <Link
            href={'/'}
            className='xl:text-3xl sm:text-xl font-extrabold uppercase '
          >
            shop.co
          </Link>
        </div>

        <div
          className={clsx(
            'xl:flex md:flex sm:hidden justify-center items-center gap-5 capitalize'
          )}
        >
          {NavItems.map((items, key) => {
            return (
              <Link href={`/${items.replace(/\s+/g, '-')}`} key={key}>
                {items}
              </Link>
            )
          })}
        </div>

        <InputField
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search for products...'
          inputClass='xl:flex xl:w-[30rem] md:hidden sm:hidden  '
        />

        {token ? (
          <div
            className={clsx('flex justify-center items-center gap-5 relative')}
          >
            <Button
              onClick={() => dispatch(openSearchModal())}
              icon={
                <BiSearch className='xl:text-base md:text-2xl sm:text-2xl' />
              }
              buttonClass='xl:hidden md:flex sm:flex '
            />
            <button
              type='button'
              onClick={handleCartOpen}
              className='flex justify-center items-center gap-2 hover:text-[red] '
            >
              <BiCartAdd className='xl:text-base md:text-2xl sm:text-2xl' />
              <span className='xl:flex md:flex sm:hidden'>Cart</span>
              {/* <span className='carts bg-[red] p-2 rounded-full '>cart</span> */}
            </button>

            <button
              type='button'
              onClick={() => dispatch(setProfileOpen(!profileModal))}
              className='flex justify-center items-center gap-2 hover:text-[red] '
            >
              <BiUserCircle className='xl:text-base md:text-2xl sm:text-2xl' />
              <span className='xl:flex md:flex sm:hidden'>
                Hey!, {user?.firstName}
              </span>
              <MdOutlineArrowDropDown className='xl:flex md:flex sm:hidden' />
            </button>
          </div>
        ) : (
          <div className='xl:flex md:hidden sm:hidden justify-center items-center gap-5'>
            <Link href='/login' className='underline font-medium'>
              Sign in
            </Link>
            <Link href='/signup' className='underline font-medium'>
              Signup
            </Link>
          </div>
        )}
      </nav>

      {isOpen && (
        <Modal
          handleCloseModal={handleNavClose}
          showLogo={true}
          showHeader={true}
          modalClass=' w-[80%] mx-auto top-0 left-0 p-5 z-20 rounded-r-xl h-screen absolute bg-white '
          contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold pt-10 text-lg'
        >
          {NavItems.map((items, key) => {
            return (
              <Link
                href={`/${items.replace(/\s+/g, '-')}`}
                key={key}
                className='nav-link'
              >
                {items}
              </Link>
            )
          })}
          <hr className='w-full' />
          {!token && (
            <div className='flex flex-col justify-center items-center gap-5'>
              <Link href='/login' className='underline font-medium'>
                Sign in
              </Link>
              <Link href='/signup' className='underline font-medium'>
                Signup
              </Link>
            </div>
          )}
        </Modal>
      )}

      {isSearchOpen && (
        <Modal
          handleCloseModal={handleSearchModal}
          showLogo={false}
          showHeader={false}
          modalClass='search-container 2xl:hidden xl:hidden md:flex sm:flex w-[95%] mx-auto top-2 right-0 p-5 z-30 absolute rounded-xl'
          contentClass='flex-col justify-center items-center gap-5 w-full capitalize font-semibold'
        >
          <InputField
            type='text'
            placeholder='Search for products...'
            inputWrapper='w-full'
            inputClass='rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] w-full xl:hidden md:flex sm:flex '
          />
        </Modal>
      )}

      {cartOpen && (
        <div
          className={clsx(
            'cartOpen bg-white shadow-2xl h-auto absolute z-20 rounded-lg p-5 flex flex-col gap-5 3xl:w-[25%] 2xl:w-[30%] xl:right-5 xl:w-[20%] xl:top-[6rem] md:w-[60%] sm:w-[95%] sm:right-2 sm:top-[5rem] '
          )}
        >
          <h1 className='font-extrabold uppercase xl:text-2xl '>Your cart</h1>

          {ProductJSON.products.slice(0, 3).map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'cartItems flex justify-center items-center gap-3 py-3 ',
                  index === ProductJSON.products.slice(0, 3).length - 1
                    ? ''
                    : 'border-b-[1px]'
                )}
              >
                <div
                  className={clsx(
                    'xl:w-[20%] md:w-[20%] sm:w-[20%] bg-gray-300 '
                  )}
                >
                  <Image
                    src={`/${item.productImage}`}
                    alt={item.title}
                    width={200}
                    height={200}
                    className=' w-full h-auto '
                  />
                </div>
                <div
                  className={clsx(
                    'flex flex-col justify-start items-start gap-1 xl:w-[80%] md:w-[80%] sm:w-[80%] '
                  )}
                >
                  <h4 className='text-base font-semibold '>{item.title}</h4>
                  <span
                    className={clsx(
                      'flex justify-start items-center gap-2 text-xs text-gray-400'
                    )}
                  >
                    Size: Large
                  </span>
                  <span
                    className={clsx(
                      'flex justify-start items-center gap-2 text-xs text-gray-400'
                    )}
                  >
                    Color: White
                  </span>
                  <div
                    className={clsx('flex justify-between items-center w-full')}
                  >
                    <h3 className='text-base font-semibold'>${item.price}</h3>
                    <div
                      className={clsx(
                        'bg-[#F0F0F0] flex justify-between items-center gap-3 rounded-full p-1 '
                      )}
                    >
                      <Button
                        type='button'
                        onClick={decrement}
                        icon={<BiMinus />}
                      />
                      <span className='font-medium '>{count}</span>
                      <Button
                        type='button'
                        onClick={increment}
                        icon={<BiPlus />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className='flex justify-between items-center w-full'>
            <Link
              href='/cart'
              onClick={handleCartOpen}
              className='border-[1px] border-gray-400 rounded-md px-4 py-2 '
            >
              View Cart
            </Link>

            <Button
              type='button'
              title='checkout'
              buttonClass='bg-black text-white  px-4 py-2 rounded-md '
            />
          </div>
        </div>
      )}

      {profileModal && (
        <div
          className={clsx(
            'flex flex-col justify-start items-start gap-5 p-5 rounded-lg bg-white shadow-2xl absolute z-20 3xl:right-[5rem] 3xl:w-[15%] 3xl:top-[6rem] xl:w-[20%] md:w-[50%] md:right-5 md:top-[5rem] sm:w-[90%] sm:right-5 sm:top-[5rem] '
          )}
        >
          <Link
            href='/profile'
            className='capitalize flex justify-start items-center gap-2 hover:text-[red] '
          >
            {' '}
            <BiUser /> My account
          </Link>
          <Link
            href='/profile/history'
            className='capitalize flex justify-start items-center gap-2 hover:text-[red] '
          >
            {' '}
            <BiHistory /> History
          </Link>
          <Link
            href=''
            className='capitalize flex justify-start items-center gap-2 hover:text-[red] '
          >
            {' '}
            <BiHeart /> Wishlist
          </Link>
          <Button
            type='button'
            title='logout'
            buttonClass='flex justify-start items-center gap-2 hover:text-[red] '
            icon={<BiLogOut />}
          />
        </div>
      )}
    </>
  )
}

export default Navbar

import React from 'react'
import clsx from 'clsx'
import moment from 'moment'

import Button from '@/types/Button'
import StarRating from './Rating'

import check from '@/assets/verified.png'
import Image from 'next/image'

type reviewsObject = {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

type reviewsProps = {
  data: reviewsObject[]
  starStyling?: string
}

function Reviews({ data }: reviewsProps) {
  return (
    <main className=''>
      <div
        className={clsx(
          'flex xl:justify-between xl:items-center xl:mt-8 md:my-10 md:px-5 sm:my-10 sm:justify-between sm:items-center sm:px-5 '
        )}
      >
        <h1
          className={clsx(
            'font-semibold capitalize flex justify-center items-center gap-2 xl:text-2xl'
          )}
        >
          all reviews <span className=''>({data.length})</span>
        </h1>
        <div
          className={clsx(
            'flex xl:justify-center xl:items-center xl:gap-10 md:gap-5 sm:gap-5  '
          )}
        >
          <Button
            type='button'
            title='btn'
            buttonClass={clsx('capitalize bg-[] rounded-xl px-2 py-1 ')}
          />
          <Button
            type='button'
            title='Latest'
            buttonClass={clsx(
              'capitalize bg-[] rounded-xl px-2 py-1 xl:flex md:flex sm:hidden '
            )}
          />
          <Button
            type='button'
            title='write a review'
            buttonClass={clsx(
              'capitalize bg-black text-white rounded-full px-4 h-[45px] xl:text-base md:text-base sm:text-base '
            )}
          />
        </div>
      </div>

      <div
        className={clsx(
          'grid 3xl:grid-cols-4 xl:grid-cols-3 xl:gap-10 xl:py-5 md:px-5 md:grid-cols-2 md:gap-5 sm:grid-cols-1 sm:gap-5 sm:px-5 '
        )}
      >
        {data.map((review) => {
          return (
            <div
              key={review.id}
              className={clsx(
                'border-[1px] rounded-2xl p-4 flex flex-col justify-start items-start gap-3'
              )}
            >
              <div className={clsx('flex justify-between items-center w-full')}>
                <StarRating
                  rating={review.rating}
                  readOnly
                  starStyling={clsx('text-xl')}
                />

                <Button type='button' title='...' buttonClass='text-3xl' />
              </div>
              <h3
                className={clsx(
                  'text-lg font-semibold flex justify-start items-center gap-2'
                )}
              >
                {review.user}
                <Image src={check} width={20} height={20} alt='verify check' />
              </h3>
              <p className='text-[#00000099] '>{review.comment}</p>
              <span className='text-sm text-[#00000099] '>
                Posted on {moment(review.date).format('MMMM D, YYYY')}
              </span>
            </div>
          )
        })}
      </div>

      <Button
        type='button'
        title='load more reviews'
        buttonClass={clsx(
          'capitialize flex justify-center items-center border-[1px] rounded-full h-[50px] w-[200px] mx-auto hover:bg-black hover:text-white '
        )}
      />
    </main>
  )
}

export default Reviews

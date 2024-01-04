import clsx from 'clsx'
import Link from 'next/link'

import { CalculateAverageRating } from '@/utils/avarageRatings'
import Product from '@/types/Product'

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/products`, {
    cache: 'no-store',
  })
  return res.json()
}

export default async function CasualList() {
  const products = await getProducts()
  return (
    <div
      className={clsx(
        'grid w-full 3xl:grid-cols-4 3xl:gap-10 2xl:grid-cols-4 2xl:gap-2 xl:grid-cols-3 xl:content-between xl:place-items-start xl:gap-5 md:grid-cols-3 md:gap-3 md:content-center md:place-items-center sm:grid-cols-1 sm:gap-5'
      )}
    >
      {products.products.map((item: { [key: string]: any }) => {
        const avarageRating = CalculateAverageRating(item?.reviews)
        return (
          <Link key={item._id} href={`/product/${item._id}`}>
            <Product
              title={item.title}
              price={item.price}
              discount={item.discount}
              productImage={item.images?.[0]}
              ratings={avarageRating}
              productClass={clsx(
                ` inline-block 3xl:w-[300px] 2xl:w-[250px] xl:w-[300px] md:w-[250px] sm:w-full border-[1px] rounded-xl cursor-pointer `
              )}
              starStyling='text-xl'
            />
          </Link>
        )
      })}
    </div>
  )
}

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

export default async function ProductsList() {

  
  const products = await getProducts()
  return (
    <div
      className={clsx(
        ' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '
      )}
    >
      {products.products
        .slice(0, 10)
        .reverse()
        .map((item: { [key: string]: any }) => {
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
                  ` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer`
                )}
                starStyling='text-lg'
              />
            </Link>
          )
        })}
    </div>
  )
}

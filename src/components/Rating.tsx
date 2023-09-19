import React from 'react'
import clsx from 'clsx'

type StarRatingProps = {
  rating: number | undefined
  readOnly?: boolean
  onRatingChange?: (value: number) => void
  starStyling?: string
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  readOnly = true,
  onRatingChange,
  starStyling,
}) => {
  const handleRatingChange = (value: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className='flex justify-center items-center gap-2'>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          className={clsx(
            starStyling,
            index < rating
              ? 'text-4xl text-[gold]'
              : 'text-4xl text-[grey] cursor-pointer'
          )}
        >
          &#9733;
        </span>
      ))}
    </div>
  )
}

export default StarRating

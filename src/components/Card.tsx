import React from 'react'

interface AccordionItemProps {
  title: string
  category: string
  price: number
  imageUrl: string
}

export const Card: React.FC<AccordionItemProps> = ({ title, category, price, imageUrl }) => {
  return (
    <div className='border rounded-md overflow-hidden mb-2 flex flex-col h-full bg-gray-200 p-1.5'>
      {/* Image */}
      <div
        className='w-full h-64 rounded bg-[length:auto_200px] bg-no-repeat bg-white bg-center'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Content */}
      <div className='flex flex-col justify-between py-2 flex-1'>
        {/* Title and Category */}
        <div className='flex flex-col gap-2.5'>
          <p className='text-lg font-semibold'>{title}</p>
          <p className='text-gray-600'>{category}</p>
        </div>

        {/* Price */}
        <div className='mt-auto'>
          <p className='text-lg font-semibold text-left'>${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

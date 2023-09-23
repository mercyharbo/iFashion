import React from 'react'

function ProductDetailsContent() {
  return (
    <main className='2xl:p-10 flex flex-col justify-start items-start gap-5 mx-auto '>
      <h1 className='2xl:text-2xl font-semibold capitalize'>product details</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <div className='grid 2xl:grid-cols-2'>
        <table className='border-[1px] p-2 '>
          <thead>
            <tr>
              <th>KEY FEATURES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-[1px] p-2'>
                48H long lasting nourishment
              </td>
            </tr>
            <tr>
              <td className='border-[1px] p-2'>
                Helps reduce and Smoothen Stretchmarks
              </td>
            </tr>
            <tr>
              <td className='border-[1px] p-2'>Helps repair Dry and Ashy skin</td>
            </tr>
            <tr>
              <td className='border-[1px] p-2'>
                Helps repair the roughest part of your skin: elbows, arms,
                Knuckles
              </td>
            </tr>
            <tr>
              <td className='border-[1px] border-b-0 p-2'>
                Gives your skin a healthy Glow
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default ProductDetailsContent

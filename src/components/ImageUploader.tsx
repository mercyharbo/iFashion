import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { setUploadedFiles } from '@/redux/Slice/sellerDashboard'
import { AppDispatch, useAppSelector } from '@/redux/Store'

const DropzoneComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const uploadedFiles = useAppSelector(
    (state) => state.sellerSlice.uploadedFiles
  )
  const [base64Array, setBase64Array] = useState<string[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file, index) => {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64 = reader.result as string
          setBase64Array((prevFiles: string[]) => {
            const newFiles = [...prevFiles, base64]

            // If this is the last file, dispatch the action with the array
            if (index === acceptedFiles.length - 1) {
              dispatch(setUploadedFiles(newFiles))
            }

            return newFiles
          })
        }

        reader.readAsDataURL(file)
      })
    },
    [dispatch]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className='w-full'>
      <input {...getInputProps()} />
      <div className='border-2 border-dotted h-[8rem] flex flex-col justify-center items-center gap-3 cursor-pointer hover:border-4 hover:border-[purple] '>
        Drag and drop your product images here.
      </div>

      <div className='py-5 grid 3xl:grid-cols-5 xl:grid-cols-4 xl:content-center xl:place-items-center xl:gap-5 md:grid-cols-4 md:content-center md:place-items-center md:gap-5'>
        {uploadedFiles.map((file, index) => (
          <Image
            key={index}
            src={file}
            alt={`Uploaded file #${index + 1}`}
            width={200}
            height={200}
            className='object-cover object-top rounded-md '
          />
        ))}
      </div>
    </div>
  )
}

export default DropzoneComponent

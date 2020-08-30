import React from 'react'
import './ImagePreview.styles.scss'
export default function ImageBox({ previewUrl, alt, onClick }) {
  return (
    <img
      onClick={onClick && onClick}
      className='image-preview-full'
      src={previewUrl}
      alt={alt}
    />
  )
}

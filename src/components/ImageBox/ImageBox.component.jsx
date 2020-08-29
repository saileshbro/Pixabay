import React from 'react'
import './ImageBox.styles.scss'
export default function ImageBox({ previewUrl, alt, onClick }) {
  return (
    <img
      onClick={onClick && onClick}
      className='image-preview'
      src={previewUrl}
      alt={alt}
    />
  )
}

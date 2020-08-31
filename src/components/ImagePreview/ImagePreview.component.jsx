import React from 'react'
import './ImagePreview.styles.scss'
import { BarLoader } from 'react-spinners'
export default function ImagePreview({
  previewUrl,
  alt,
  onClick,
  placeHolderUrl,
}) {
  const onImageLoaded = () => {
    setLoaded(true)
    document.querySelector('.image-preview-full-placeholder').style.display =
      'none'
    document.querySelector('.image-preview-full-real').style.display = 'block'
  }
  const [loaded, setLoaded] = React.useState(false)
  return (
    <div className='image-preview-wrapper'>
      {!loaded && (
        <BarLoader
          width='100%'
          css={{ styles: 'margin-bottom:12px' }}
          color='#d54062'
        />
      )}
      <img
        onClick={onClick && onClick}
        className='image-preview-full image-preview-full-placeholder'
        src={placeHolderUrl}
        alt={alt}
      />
      <img
        onClick={onClick && onClick}
        className='image-preview-full image-preview-full-real'
        src={previewUrl}
        onLoad={onImageLoaded}
        alt={alt}
      />
    </div>
  )
}

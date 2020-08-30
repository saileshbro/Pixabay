import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import backButton from '../../assets/icons/back.svg'
import downloadButton from '../../assets/icons/download.svg'
import './ImagePage.styles.scss'
import ImagePreview from './../../components/ImagePreview/ImagePreview.component'
export default function ImagePage() {
  const {
    state: { image },
  } = useLocation()
  const history = useHistory()
  console.log(image)
  const onDownloadClick = async () => {
    const resp = await fetch(image.largeImageURL)
    const blob = await resp.blob()
    const type = blob.type.split('/')[1]
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pixelbay_${image.id}.${type}`
    link.click()
  }
  return (
    <section id='image-page'>
      <img
        className='button back-button'
        src={backButton}
        alt='Back Button'
        onClick={() => history.goBack()}
      />
      <ImagePreview alt={image.tags} previewUrl={image.largeImageURL} />
      <div className='button download-button'>
        <img
          src={downloadButton}
          alt='Download Button'
          onClick={onDownloadClick}
        />
      </div>
    </section>
  )
}

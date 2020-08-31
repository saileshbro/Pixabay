import React from 'react'
import backButton from '../../assets/icons/back.svg'
import downloadButton from '../../assets/icons/download.svg'
import './ImagePage.styles.scss'
import ImagePreview from './../../components/ImagePreview/ImagePreview.component'
import { BounceLoader } from 'react-spinners'
export default function ImagePage({ image, onBackPressed }) {
  const [loading, setLoading] = React.useState(false)
  const downloadImage = () => {
    setLoading(true)
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', image.largeImageURL, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL
        var imageUrl = urlCreator.createObjectURL(this.response)
        var tag = document.createElement('a')
        tag.href = imageUrl
        document.body.appendChild(tag)
        if (this.status >= 200 && this.status < 300) {
          const type = xhr.response.type.split('/')[1]
          tag.download = `pixelbay_${image.id}.${type}`
          tag.click()
          document.body.removeChild(tag)

          setLoading(false)
          resolve(xhr.response.type)
        } else {
          reject({
            status: this.status,
            statusText: this.statusText,
          })
        }
      }
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
      xhr.send()
    })
  }
  return (
    <section id='image-page'>
      <img
        className='button back-button'
        src={backButton}
        alt='Back Button'
        onClick={onBackPressed && onBackPressed}
      />
      <ImagePreview
        alt={image.tags}
        previewUrl={image.largeImageURL}
        placeHolderUrl={image.previewURL}
      />
      {loading && (
        <div className='button spinner'>{<BounceLoader color='#d54062' />}</div>
      )}
      {!loading && (
        <div className='button download-button'>
          <img
            src={downloadButton}
            alt='Download Button'
            onClick={downloadImage}
          />
        </div>
      )}
    </section>
  )
}

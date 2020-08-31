import React, { useState } from 'react'
import { HomePage } from './pages/HomePage/HomePage'
import { Fragment } from 'react'
import ImagePage from './pages/ImagePage/ImagePage'
import categories from './data/categories'

function App() {
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(categories[0] ?? '')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [scrollPosition, setScroll] = useState({ vertical: 0, horizontal: 0 })
  React.useEffect(() => {
    const fetchImages = async () => {
      setLoading(true)
      try {
        const resp = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXELBAY_API_KEY}&category=${category}&q=${search}`,
          {
            headers: new Headers().append(
              'Access-Control-Allow-Origin',
              'http://localhost:3000',
            ),
          },
        )
        const { hits } = await resp.json()
        setImages(hits)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchImages()
  }, [category, search])

  return (
    <Fragment>
      {!image && (
        <HomePage
          onImagePressed={imageData => setImage(imageData)}
          category={category}
          images={images}
          loading={loading}
          setLoading={setLoading}
          setSearch={setSearch}
          setCategory={setCategory}
          setScroll={setScroll}
          scrollPosition={scrollPosition}
        />
      )}
      {image && (
        <ImagePage image={image} onBackPressed={() => setImage(null)} />
      )}
    </Fragment>
  )
}

export default App

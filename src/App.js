import React, { useState, useCallback } from 'react'
import { HomePage } from './pages/HomePage/HomePage'
import { Fragment } from 'react'
import ImagePage from './pages/ImagePage/ImagePage'
import categories from './data/categories'

function App() {
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState(categories[0] ?? '')
  const [images, setImages] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [scrollPosition, setScroll] = useState({ vertical: 0, horizontal: 0 })
  const [page, setPage] = useState(1)
  const [paginating, setPaginating] = useState(false)
  const fetchImages = useCallback(async () => {
    try {
      const resp = await fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXELBAY_API_KEY}&category=${category}&q=${search}&page=${page}`,
        {
          headers: new Headers().append(
            'Access-Control-Allow-Origin',
            'http://localhost:3000',
          ),
        },
      )
      const { hits } = await resp.json()
      //
      setImages({ [category]: [...(images[category] ?? []), ...hits] })
    } catch (error) {}
    setLoading(false)
    setPaginating(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, page])
  React.useEffect(() => {
    setLoading(true)
  }, [])

  React.useEffect(() => {
    fetchImages()
  }, [category, fetchImages, search])

  window.onscroll = function (ev) {
    const totalPageHeight = document.body.scrollHeight
    const scrollPoint = window.scrollY + window.innerHeight
    if (scrollPoint >= totalPageHeight - 5 && !paginating && !loading) {
      setPaginating(true)
      setPage(page + 1)
    }
  }
  return (
    <Fragment>
      {!image && (
        <HomePage
          onImagePressed={imageData => setImage(imageData)}
          category={category}
          images={images[category] ?? []}
          setImages={setImages}
          loading={loading}
          paginating={paginating}
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

import React from 'react'
import './HomePage.styles.scss'
import CategoryButton from '../../components/CategoryButton/CategoryButton.components'
import CategoryColors from './../../utils/colors'
import SearchIcon from '../../assets/icons/search.svg'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import ImageBox from './../../components/ImageBox/ImageBox.component'
import { useHistory } from 'react-router-dom'
import Spinner from './../../components/Spinner/Spinner'
import categories from './../../data/categories'
export const HomePage = () => {
  const history = useHistory()
  const routeChange = image => {
    history.push({
      pathname: '/image',
      state: {
        image,
      },
    })
  }
  const [category, setCategory] = useState(categories[0] ?? '')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

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
  const onSearchComplete = e => {
    const keyCode = e.keyCode || e.which
    console.log(e)
    if (keyCode === 13) {
      setSearch(e.target.value)
    }
  }
  const onCategoryClick = category => {
    setSearch('')
    setCategory(category)
    document.querySelector('.search-field').value = ''
  }
  return (
    <section id='home-page'>
      <h1 className='title'>Pixelbay</h1>
      <div className='categories'>
        {categories.map((e, i) => (
          <CategoryButton
            label={e}
            key={i}
            onClick={() => onCategoryClick(e)}
            isSelected={category === e}
            color={CategoryColors[i % CategoryColors.length]}
          />
        ))}
      </div>
      <div className='search-section'>
        <img className='search-icon' src={SearchIcon} alt='Search Icon' />
        <input
          type='text'
          className='search-field'
          onKeyPress={onSearchComplete}
          placeholder='Search for images here...'
        />
      </div>
      {loading && (
        <div className='spinner-wrapper'>
          <Spinner />
        </div>
      )}
      {!loading && (
        <Masonry
          breakpointCols={2}
          className='gallery-section'
          columnClassName='gallery-column'>
          {images.map(image => (
            <ImageBox
              alt={image.tags}
              previewUrl={image.previewURL}
              key={image.id}
              onClick={() => routeChange(image)}
            />
          ))}
        </Masonry>
      )}
    </section>
  )
}

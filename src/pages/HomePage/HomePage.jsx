import React, { useEffect } from 'react'
import './HomePage.styles.scss'
import CategoryButton from '../../components/CategoryButton/CategoryButton.components'
import CategoryColors from './../../utils/colors'
import SearchIcon from '../../assets/icons/search.svg'
import Masonry from 'react-masonry-css'
import ImageBox from './../../components/ImageBox/ImageBox.component'
import Spinner from './../../components/Spinner/Spinner'
import categories from './../../data/categories'
export const HomePage = ({
  onImagePressed,
  category,
  images,
  loading,
  setSearch,
  setCategory,
  setScroll,
  scrollPosition: { horizontal, vertical },
}) => {
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
  useEffect(() => {
    window.scrollTo(0, vertical)
    document.querySelector('.categories').scrollLeft = horizontal
  }, [horizontal, vertical])
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
              onClick={() => {
                onImagePressed && onImagePressed(image)
                setScroll &&
                  setScroll({
                    vertical: window.pageYOffset,
                    horizontal: document.querySelector('.categories')
                      .scrollLeft,
                  })
              }}
            />
          ))}
        </Masonry>
      )}
    </section>
  )
}

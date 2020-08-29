import React, { Fragment } from 'react'
import './CategoryButton.styles.scss'
export default function CategoryButton({ label, color, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className='category-button'
      style={{
        backgroundColor: color,
        boxShadow: isSelected && `0 4px 8px 1px ${color}88`,
      }}>
      {label && (
        <Fragment>
          <span className='capital'>{label[0]}</span>
          <span className='label'>{label}</span>
        </Fragment>
      )}
    </button>
  )
}

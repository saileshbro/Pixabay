import React, { Fragment } from "react";
import "./CategoryButton.styles.scss";
export default function CategoryButton({ label, color, isSelected, onClick }) {
  return (
    <div className="button-wrapper">
      <button
        onClick={onClick}
        className="category-button"
        style={{
          backgroundColor: color,
        }}>
        {label && (
          <Fragment>
            <span className="capital">{label[0]}</span>
            <span className="label">{label}</span>
          </Fragment>
        )}
      </button>
      {isSelected && (
        <div className="selected-line" style={{ backgroundColor: color }}></div>
      )}
    </div>
  );
}

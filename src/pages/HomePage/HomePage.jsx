import React from "react";
import "./HomePage.styles.scss";
import CategoryButton from "../../components/CategoryButton/CategoryButton.components";
import CategoryColors from "./../../utils/colors";
import SearchIcon from "../../assets/icons/search.svg";
import { useState } from "react";
import images from "./../../assets/icons/iamges";
import Masonry from "react-masonry-css";
import ImageBox from "./../../components/ImageBox/ImageBox.component";
import { useHistory } from "react-router-dom";

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];
export const HomePage = () => {
  const history = useHistory();
  let path = `./image`;

  const routeChange = () => {
    history.push(path);
  };
  const [category, setCategory] = useState(categories[0] ?? "");
  // const [images, setImages] = useState([])
  // const [loading, setLoading] = useState(true)
  // React.useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true)
  //     try {
  //       const resp = await fetch(
  //         `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXELBAY_API_KEY}&category=${category}`,
  //         {
  //           headers: new Headers().append(
  //             'Access-Control-Allow-Origin',
  //             'http://localhost:3000',
  //           ),
  //         },
  //       )
  //       const { hits } = await resp.json()
  //       setImages(hits)
  //       console.log(hits)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     setLoading(false)
  //   }
  //   fetchImages()
  // }, [category])

  return (
    <section id="home-page">
      <h1 className="title">Pixelbay</h1>
      <div className="categories">
        {categories.map((e, i) => (
          <CategoryButton
            label={e}
            key={i}
            onClick={() => setCategory(e)}
            isSelected={category === e}
            color={CategoryColors[i % CategoryColors.length]}
          />
        ))}
      </div>
      <div className="search-section">
        <img className="search-icon" src={SearchIcon} alt="Search Icon" />
        <input
          type="text"
          className="search-field"
          placeholder="Search for images here..."
        />
      </div>
      <Masonry
        breakpointCols={2}
        className="gallery-section"
        columnClassName="gallery-column">
        {images.map((image) => (
          <ImageBox
            alt={image.tags}
            previewUrl={image.previewURL}
            key={image.id}
            onClick={routeChange}
          />
        ))}
      </Masonry>
    </section>
  );
};

import React, { useState, useEffect } from "react";
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setcategories] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function getcategories() {
    // setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
    setcategories(data.data);
    setisLoading(false);
  }
  useEffect(() => {
    getcategories();
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <>
      {isLoading ? (
        <div className="  text-center p-5 m-5 ">
          <i className="fas fa-spinner fa-spin fa-3x text-main"></i>
        </div>
      ) : (
        <>
          <div className="row">
          <Slider {...settings}>
            {categories?.map((category) => (
              <div key={category._id}>
                <img
                  className="w-100"
                  height={200}
                  src={category.image}
                  alt="img"
                />
                <h2 className="h6 pt-2">{categories.name}</h2>
              </div>
            ))}
          </Slider>
          </div>
        </>
      )}
    </>
  );
}

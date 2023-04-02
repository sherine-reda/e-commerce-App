import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let params = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  async function getProductDetails(id) {
    // setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setproductDetails(data.data);
    setisLoading(false);
  }
  useEffect(() => {
    getProductDetails(params.id);
  });
  return (
    <>
      <div className="row align-items-center py-3 position-relative ">
        {isLoading ? (
          <div className="  text-center p-5 m-5 ">
            <i className="fas fa-spinner fa-spin fa-3x text-main"></i>
          </div>
        ) : (
          <>
            <div className="col-md-4">
              <Slider {...settings}>
                {productDetails?.images.map((img) => (
                  <img src={img} alt="img" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <h3>{productDetails?.title}</h3>
              <p>{productDetails?.description}</p>
              <div className="d-flex justify-content-between">
                <span className="text-muted">{productDetails?.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {productDetails?.ratingsAverage}
                </span>
              </div>

              <button className="btn bg-main text-white w-100">+Add</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

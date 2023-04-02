import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function getProducts() {
    setisLoading(true);

    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setProducts(data.data);
    setisLoading(false);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="row">
        {isLoading ? (
          <div className="  text-center p-5 m-5 ">
            <i className="fas fa-spinner fa-spin fa-3x text-main"></i>
          </div>
        ) : (
          <>
            {products.map((products) => (
              <div key={products._id} className="col-md-2">
                <div className="product cursor-pointer px-2 py-4">
                  <Link to={`/ProductDetails/${products._id}`}>
                    <img
                      className="w-100"
                      src={products.imageCover}
                      alt="product"
                    />
                    <span className="text-main">{products.category.name}</span>
                    <h3 className="h6 fw-bolder">
                      {products.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{products.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {products.ratingsAverage}
                      </span>
                    </div>

                    <button className="btn bg-main text-white w-100">
                      +Add
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { fetchProducts } from '../actions/productActions';
const Products = () => {
  const [productItem,setProductItem]=useState(null)
  const  products=useSelector(state=>state.products.filteredItems)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])

 const openModal = (product) => {
    setProductItem(product);
  };
 const closeModal = () => {
  setProductItem( null);
  };
  return (
    <div>
      <div>
        <Fade bottom cascade>
          {!products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() =>openModal(product)}
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() =>dispatch(addToCart(product))}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {productItem && (
          <Modal isOpen={true} onRequestClose={closeModal}>
            <Zoom>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={productItem.image} alt={productItem.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{productItem.title}</strong>
                  </p>
                  <p>{productItem.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {productItem.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(productItem.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        dispatch(addToCart(productItem));
                        closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Products;


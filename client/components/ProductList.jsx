import React, { Component } from 'react';
import '../stylesheets/product.scss';
import ProductCard from './ProductCard.jsx';
import '@fortawesome/fontawesome-free/js/all.js';

const ProductList = props => {
  const products = [];
  
  return (
    <div id="productList">
      <h2>Product Lists</h2>
      <button id="newProduct"><i class="fa-solid fa-plus"></i></button>
      <div>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default ProductList;
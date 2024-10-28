// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div>
            <img src={product.image.src} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <button>Add to Wishlist</button> {/* Implement wishlist functionality */}
        </div>
    );
};

export default ProductCard;

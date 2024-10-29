import React from 'react';

interface Product {
    image: {
        src: string;
    };
    title: string;
    price: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div>
            <img src={product.image.src} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <button>Add to Wishlist</button> {/* TODO Implement wishlist functionality */}
        </div>
    );
};

export default ProductCard;

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
    onToggleWishlist: () => void;
    isInWishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onToggleWishlist, isInWishlist }) => {
    return (
        <div className='card-container'>
            <div className="card-image">
                <img src={product.image.src} alt={product.title} />
            </div>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductCard;

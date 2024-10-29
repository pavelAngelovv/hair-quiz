import React from 'react';
import heartIcon from '../images/heart.png';
import filledHeartIcon from '../images/heart-filled.png';

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
                <button 
                    className="wishlist-button"
                    onClick={onToggleWishlist}
                >
                    <img src={isInWishlist ? filledHeartIcon : heartIcon} alt="Wishlist" />
                </button>
            </div>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
        </div>
    );
};

export default ProductCard;

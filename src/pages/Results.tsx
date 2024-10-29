import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard.tsx';
import '../styles/results.css'; // Import any required CSS for styling
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS

// Define types for the product
interface Product {
    id: number;
    title: string;
    price: string;
    image: {
        src: string;
    };
    tags: string[];
    body_html: string; // for product description
}

interface ResultsProps {
    userAnswers: string[];
}

const Results: React.FC<ResultsProps> = ({ userAnswers }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [wishlist, setWishlist] = useState<number[]>(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://jeval.com.au/collections/hair-care/products.json?page=1');
            const data = await response.json();
            const formattedProducts = data.products.map((product: any) => ({
                id: product.id,
                title: product.title,
                price: product.variants[0].price,
                image: { src: product.images[0]?.src || '' },
                tags: product.tags,
                body_html: product.body_html,
            }));
            setProducts(formattedProducts);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const toggleWishlist = (productId: number) => {
        const updatedWishlist = wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];

        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    // Retrieve user inputs from local storage
    const hairType = localStorage.getItem('hairType');
    const howOftenWashHair = localStorage.getItem('howOftenWashHair');
    const wantedBenefit = localStorage.getItem('wantedBenefit');
    const anythingTroubling = localStorage.getItem('anythingTroubling');

    // Function to calculate the match score for each product
    const calculateMatchScore = (product: Product) => {
        const { title, body_html, tags } = product;
        let score = 0;

        const userCriteria = [hairType, howOftenWashHair, wantedBenefit, anythingTroubling];

        userCriteria.forEach(criteria => {
            if (criteria) {
                // Increase score based on matches
                if (title.toLowerCase().includes(criteria.toLowerCase())) {
                    score += 3; // Title match is more significant
                }
                if (body_html.toLowerCase().includes(criteria.toLowerCase())) {
                    score += 2; // Description match
                }
                if (tags.some(tag => tag.toLowerCase().includes(criteria.toLowerCase()))) {
                    score += 1; // Tag match
                }
            }
        });

        return score;
    };

    // Filtering logic
    const filteredProducts = products.filter(product => {
        const userCriteria = [hairType, howOftenWashHair, wantedBenefit, anythingTroubling];
        return userCriteria.some(criteria => criteria && (
            product.title.toLowerCase().includes(criteria.toLowerCase()) ||
            product.body_html.toLowerCase().includes(criteria.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(criteria.toLowerCase()))
        ));
    });

    // Calculate match scores and sort products by score
    const scoredProducts = filteredProducts.map(product => ({
        product,
        score: calculateMatchScore(product),
    })).sort((a, b) => b.score - a.score); // Sort by score in descending order

    // Custom next arrow component
    const SampleNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} slick-arrow`}
                style={{ ...style, display: 'block', background: '#1e90ff' }}
                onClick={onClick}
            />
        );
    };

    // Custom previous arrow component
    const SamplePrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} slick-arrow`}
                style={{ ...style, display: 'block', background: '#1e90ff' }}
                onClick={onClick}
            />
        );
    };

    // Slider settings
    const settings = {
        dots: true, // Enable dots for navigation
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />, // Custom next arrow
        prevArrow: <SamplePrevArrow />, // Custom previous arrow
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="results">
            <div className="results__background">
                <div className="results__overlay">
                    <h1 className="results__title">Your Recommended Products</h1>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Slider {...settings}>
                    {scoredProducts.map(({ product }) => (
                        <div key={product.id}>
                            <ProductCard
                                product={product}
                                onToggleWishlist={() => toggleWishlist(product.id)}
                                isInWishlist={wishlist.includes(product.id)}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default Results;

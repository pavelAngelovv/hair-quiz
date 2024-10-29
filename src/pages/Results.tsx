import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../components/ProductCard.tsx';
import arrow from '../images/right-arrow-slide.png';
import '../styles/results.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Product {
    id: number;
    title: string;
    price: string;
    image: {
        src: string;
    };
    tags: string[];
    body_html: string;
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

    const navigate = useNavigate();

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

    const hairType = localStorage.getItem('hairType');
    const howOftenWashHair = localStorage.getItem('howOftenWashHair');
    const wantedBenefit = localStorage.getItem('wantedBenefit');
    const anythingTroubling = localStorage.getItem('anythingTroubling');

    const calculateMatchScore = (product: Product) => {
        const { title, body_html, tags } = product;
        let score = 0;

        const userCriteria = [hairType, howOftenWashHair, wantedBenefit, anythingTroubling];

        userCriteria.forEach(criteria => {
            if (criteria) {

                if (title.toLowerCase().includes(criteria.toLowerCase())) {
                    score += 3;
                }
                if (body_html.toLowerCase().includes(criteria.toLowerCase())) {
                    score += 2;
                }
                if (tags.some(tag => tag.toLowerCase().includes(criteria.toLowerCase()))) {
                    score += 1;
                }
            }
        });

        return score;
    };


    const filteredProducts = products.filter(product => {
        const userCriteria = [hairType, howOftenWashHair, wantedBenefit, anythingTroubling];
        return userCriteria.some(criteria => criteria && (
            product.title.toLowerCase().includes(criteria.toLowerCase()) ||
            product.body_html.toLowerCase().includes(criteria.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(criteria.toLowerCase()))
        ));
    });


    const scoredProducts = filteredProducts.map(product => ({
        product,
        score: calculateMatchScore(product),
    })).sort((a, b) => b.score - a.score);


    const SampleNextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <div
                className={`${className} slick-next-arrow`}
                onClick={onClick}
                style={{ top: '40%', marginRight: '-20px' }}
            >
                <img src={arrow} alt="Next" />
            </div>
        );
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: scoredProducts.length > 2 ? <SampleNextArrow /> : null,
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

    const handleRetakeQuiz = () => {
        navigate('/');
        localStorage.clear();
    };

    return (
        <div className="results">
            <div className="results__background">
                <div className="results__overlay">
                    <h1 className="results__title">Build your everyday self<br /> care routine.</h1>
                    <p className="results__description">Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances, you can add a moment of calm to the end of your day.</p>
                    <button className="button-text results__button" onClick={handleRetakeQuiz}>Retake the quiz</button>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Slider {...settings}>
                    {/* Render the first text-only card */}
                    <div className="text-only-card">
                        <h2>Daily routine</h2>
                        <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances, you can add a moment of calm to the end of your day.</p>
                    </div>

                    {/* Render the rest of the products */}
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

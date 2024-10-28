// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const Results = ({ userAnswers }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://jeval.com.au/collections/hair-care/products.json?page=1');
            const data = await response.json();
            setProducts(data.products); // Filter products based on userAnswers
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Your Recommended Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.tsx'; // Importing without the .tsx extension

// Define types for the product and the user answers
interface Product {
    id: number; // Assuming the product has an ID of type number
    title: string; // Assuming title is a string
    price: string; // Assuming price is a string (can be adjusted if necessary)
    image: {
        src: string; // Assuming image source is a string
    };
}

interface ResultsProps {
    userAnswers: string[]; // Assuming userAnswers is an array of strings
}

const Results: React.FC<ResultsProps> = ({ userAnswers }) => {
    const [products, setProducts] = useState<Product[]>([]); // Set products state to an array of Product type
    const [loading, setLoading] = useState<boolean>(true); // Loading state of type boolean

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://jeval.com.au/collections/hair-care/products.json?page=1');
            const data = await response.json();
            setProducts(data.products); // Assuming data.products is an array of products
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

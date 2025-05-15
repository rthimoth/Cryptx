import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useFetchProducts = () => {
    return useQuery({ queryKey: ['products'], queryFn: fetchProducts });
};
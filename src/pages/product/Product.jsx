import React, { useState, useEffect } from 'react';
import ItemSearch from './ItemSearch';
import ItemSort from './ItemSort';
import ItemList from './ItemList';
import ItemPage from './ItemPage';

const Product = () => {
    const [query, setQuery] = useState('친환경제품');
    const [sort, setSort] = useState('sim');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allItems, setAllItems] = useState([]);  

    const itemsPerPage = 8;

    useEffect(() => {
        fetchProductList(query, currentPage, sort);
    }, [currentPage, sort]); 

    const handleSearch = () => {
        if (query.trim() === "") {
            setQuery('친환경');
        } else {
            fetchProductList(query, 1, sort); 
        }
    };

    const fetchProductList = async (query, page = 1, sort) => {
        setLoading(true);
        try {
            const response = await fetch('/api/api/naverShop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ values: query, page, sort }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAllItems(data.list); 
            setTotalPages(data.totalPages); 
            setCurrentPage(data.currentPage); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
        fetchProductList(query, 1, newSort); 
    };

    const handleEnterKey = (event) => {
        if (event.keyCode === 13) {
            handleSearch();
        }
    };

    const paginatedItems = () => {
        if (!allItems || allItems.length === 0) {
            return [];
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        return allItems.slice(startIndex, startIndex + itemsPerPage);
    };

    return (
        <div className="container">
            <ItemSearch query={query} setQuery={setQuery} handleSearch={handleSearch} handleEnterKey={handleEnterKey} />
            <ItemSort sort={sort} setSort={setSort} handleSortChange={handleSortChange} />
            <ItemList items={paginatedItems()} loading={loading} />
            <ItemPage
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                fetchProductList={fetchProductList}
            />
        </div>
    );
};

export default Product;

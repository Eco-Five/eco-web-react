    // Product.jsx
    import React, { useState, useEffect } from 'react';
    import ItemSearch from './ItemSearch';
    import ItemSort from './ItemSort';
    import ItemList from './ItemList';
    import ItemPage from './ItemPage';

    const Product = () => {
    const [query, setQuery] = useState('친환경');
    const [sort, setSort] = useState('sim');
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 12;

    useEffect(() => {
    // 페이지 로드 시 기본 값으로 상품 리스트 가져오기
    fetchProductList(query, currentPage, sort);
    }, []);

    const fetchProductList = async (query, page = 1, sort) => {
    setLoading(true);
    try {
        const response = await fetch('/api/naverShop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: query, page, sort }),
        });

        const data = await response.json();
        setItems(data.list);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
    };

    return (
    <div className="container">
        <ItemSearch query={query} setQuery={setQuery} handleSearch={() => fetchProductList(query, 1, sort)} />
        <ItemSort sort={sort} setSort={setSort} handleSortChange={(newSort) => fetchProductList(query, 1, newSort)} />
        <ItemList items={items} loading={loading} />
        <ItemPage currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetchProductList={fetchProductList} />
    </div>
    );
    };

    export default Product;

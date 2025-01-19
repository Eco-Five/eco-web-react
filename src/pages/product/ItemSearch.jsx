import React, { useState, useEffect } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const ItemSearch = ({ query, setQuery, handleSearch }) => {
    const recentViewedContainerStyle = {
        border: '1px solid #e0e0e0',
        position: 'fixed',
        top: '50%',
        right: '0',
        transform: 'translateY(-60%)',
        width: '130px',
        height: '50%',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
    };

    const [recentItems, setRecentItems] = useState([]);
    const [isRendered, setIsRendered] = useState(false);

    // 최근 본 상품 불러오기
    const fetchRecentItems = () => {
        fetch('api/recentViewed')
            .then((response) => response.json())
            .then((data) => {
                setRecentItems(data.recentViewed || []);
            })
            .catch((error) => console.error('Error fetching recent items:', error));
    };

    // 최근 본 상품 영역 토글
    const handleRecentToggle = () => {
        if (isRendered) {
            setRecentItems([]); 
        } else {
            fetchRecentItems();  
        }
        setIsRendered(!isRendered); 
    };

    return (
        <div className="search-bar mt-5">
            <div className="input-group" style={{ width: '355px', justifySelf: 'center' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="제품 검색"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                {/* 검색 버튼 */}
                <Button variant="outline-dark" onClick={handleSearch} className="search-btn">
                    <FaSearch />
                </Button>
                {/* 기록 버튼 */}
                <Button variant="outline-dark" onClick={handleRecentToggle} className="history-btn">
                    <FaHistory />
                </Button>
            </div>

            {/* 최근 본 상품 렌더링 */}
            {isRendered && recentItems.length > 0 && (
                <div id="recent-viewed-container" className="container my-4" style={recentViewedContainerStyle}>
                    <p style={{ fontSize: '12px'}}>
                        <b>최근 본 상품</b>
                    </p>
                    <div className="row">
                        {recentItems.map((item, index) => (
                            <div className="col-md-3" key={index} style={{ width: '100px' }}>
                                <div className="category-card" style={{ marginBottom: '20px' }}>
                                    <a href={item.link}>
                                        <img src={item.image} alt="최근 본 상품" className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemSearch;

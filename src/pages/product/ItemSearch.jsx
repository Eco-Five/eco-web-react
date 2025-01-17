    // ItemSearch.jsx
    import React from 'react';
    import { FaSearch, FaHistory } from 'react-icons/fa'; // react-icons에서 아이콘을 가져옵니다.
    import { Button } from 'react-bootstrap'; // 부트스트랩 버튼 컴포넌트

    const ItemSearch = ({ query, setQuery, handleSearch }) => {
    return (
    <div className="search-bar mt-5">
        <div className="input-group" style={{width:'500px'}}>
        <input
            type="text"
            className="form-control"
            placeholder="제품 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {/* 검색 아이콘 버튼 */}
        <Button variant="outline-dark" onClick={handleSearch} className="search-btn">
            <FaSearch />
        </Button>
        {/* 기록 아이콘 버튼 */}
        <Button variant="outline-dark" className="history-btn">
            <FaHistory />
        </Button>
        </div>
    </div>
    );
    };

    export default ItemSearch;

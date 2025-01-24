import React from 'react';
import ItemRecent from './ItemRecent';
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const ItemSearch = ({ query, setQuery, handleSearch, handleEnterKey }) => {

    return (
        <div className="search-bar mt-5">
            <div className="d-flex align-items-center" style={{ justifyContent: 'center', gap: '5px' }}>
                <div className="input-group" style={{ width: '355px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="제품 검색"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => handleEnterKey(e)}
                    />
                    {/* 검색 버튼 */}
                    <Button variant="outline-dark" onClick={handleSearch} className="search-btn">
                        <FaSearch />
                    </Button>
                </div>
                {/* 최근 본 상품 렌더링 */}
                <ItemRecent />
            </div>
        </div>
    );
};

export default ItemSearch;

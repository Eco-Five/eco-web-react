import React from 'react';

const ItemSort = ({ sort, setSort, handleSortChange }) => {
    return (
        <div className="sort-options mt-3">
            <select
                className="form-select"
                style={{ width: 150 }}
                value={sort} 
                onChange={(e) => handleSortChange(e.target.value)} 
            >
                <option value="sim">정확도순</option>
                <option value="asc">낮은가격순</option>
                <option value="dsc">높은가격순</option>
            </select>
        </div>
    );
};

export default ItemSort;
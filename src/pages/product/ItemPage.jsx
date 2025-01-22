import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ItemPage = ({ currentPage, totalPages, setCurrentPage, fetchProductList }) => {
    const handlePageChange = (direction) => {
        let newPage = currentPage;
        if (direction === 'prev' && currentPage > 1) {
            newPage -= 1;
        } else if (direction === 'next' && currentPage < totalPages) {
            newPage += 1;
        }
        setCurrentPage(newPage);
        fetchProductList(newPage);
    };

    return (
        <div className="text-center mt-2" style={{padding:'30px'}}>
            <button
                className="btn btn-success btn-sm px-5"
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
            >
                <FaChevronLeft /> {/* 이전 버튼 */}
            </button>
            <span id="page" className="px-3">
                {currentPage}/{totalPages}
            </span>
            <button
                className="btn btn-success btn-sm px-5"
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight /> {/* 다음 버튼 */}
            </button>
        </div>
    );
};

export default ItemPage;

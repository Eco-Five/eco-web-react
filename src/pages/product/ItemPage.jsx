    // ItemPage.jsx
    import React from 'react';

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
    <div className="text-center mt-2">
        <button className="btn btn-dark btn-sm px-5" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
        이전
        </button>
        <span id="page" className="px-3">
        {currentPage}/{totalPages}
        </span>
        <button className="btn btn-dark btn-sm px-5" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
        다음
        </button>
    </div>
    );
    };

    export default ItemPage;

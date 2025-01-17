    // ItemList.jsx
    import React from 'react';

    const ItemList = ({ items, loading }) => {
    const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    };

    const cleanTitle = (title) => {
    return title.replace(/<[^>]+>/g, '');
    };

    return (
    <div className="product-list my-4">
        {loading ? (
        <div>Loading...</div>
        ) : (
        <div className="row">
            {items.map((item, index) => (
            <div className="col-md-3" key={index} style={{ border: '1px solid #e0e0e0', borderRadius: '10px' }}>
                <div className="category-card">
                <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{ cursor: 'pointer', width: '40%' }}
                />
                <div className="ellipsis mt-2">{cleanTitle(item.title)}</div>
                <b>{formatPrice(item.lprice)}</b>
                <button className="btn btn-dark btn-sm" style={{ minWidth: '10px', fontSize: '0.7vw' }}>
                    에코백담기
                </button>
                <a href={item.link}>
                    <button className="btn btn-dark btn-sm" style={{ minWidth: '10px', fontSize: '0.7vw' }}>
                    네이버쇼핑
                    </button>
                </a>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
    );
    };

    export default ItemList;

import React from 'react';

const ItemModal = ({ items, modalIndex, setModalIndex, formatPrice, cleanTitle }) => {
    const handleCloseModal = () => {
        setModalIndex(null);
    };

    return (
        <>
        {modalIndex !== null && (
            <div className="modal fade show" style={{ display: 'block' }} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">제품정보</h1>
                            <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={items[modalIndex].image} alt="이미지" width="80%" />
                                </div>
                                <div className="col">
                                    <h6 className="my-2">{cleanTitle(items[modalIndex].title)}</h6>
                                    <div className="my-3">분 류 : <span>{items[modalIndex].category4}</span></div>
                                    <div className="my-2">쇼핑몰 : <span>{items[modalIndex].mallName}</span></div>
                                    <div className="my-3">가 격 : <span>{formatPrice(items[modalIndex].lprice)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ItemModal;

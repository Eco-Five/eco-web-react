import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemList = ({ items, loading }) => {
    const [modalIndex, setModalIndex] = useState(null);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    };

    const cleanTitle = (title, maxLength = 50) => {
        const cleanedTitle = title.replace(/<[^>]+>/g, '');
        if (cleanedTitle.length > maxLength) {
            return cleanedTitle.slice(0, maxLength) + '...';
        }
        return cleanedTitle;
    };
    

    const handleImageClick = (index, image, link) => {
        // 이미지 클릭 시 모달 열기
        setModalIndex(index); 
        // 최근 본 상품에 추가
        addToRecentViewed(image, link);
    };

    const handleCloseModal = () => {
        setModalIndex(null);
    };

    // 최근 본 상품 추가
    const addToRecentViewed = async (image, link) => {
        try {
            await fetch('/api/recentViewed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image, link }),
            });
            console.log('최근 본 상품 저장 완료');
        } catch (error) {
            console.error('Error adding to recent viewed:', error);
        }
    };

    return (
        <div className="product-list my-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {items.map((item, index) => (
                        <div className="col-md-3" key={index} style={{ marginBottom: '20px' }}>
                            <Card style={{ width: '200px', height: '350px' }}>
                                <Card.Header>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{ cursor: 'pointer', width: '100%' }}
                                        onClick={() => handleImageClick(index, item.image, item.link)} // 이미지 클릭 시 최근 본 상품에 추가
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title className="ellipsis" style={{ fontSize: '1vw' }}>{cleanTitle(item.title)}</Card.Title>
                                    <Card.Text>
                                        <b>{formatPrice(item.lprice)}</b>
                                    </Card.Text>
                                    <a href={item.link}>
                                        <Button variant="dark" size="sm" style={{ minWidth: '10px', fontSize: '0.7vw', marginRight: '5px' }}>
                                            네이버쇼핑
                                        </Button>
                                    </a>
                                    <Button variant="dark" size="sm" style={{ minWidth: '10px', fontSize: '0.7vw' }}>
                                        에코백담기
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            {/* 모달 */}
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
        </div>
    );
};

export default ItemList;

import React, { useState } from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemModal from './ItemModal';

const ItemList = ({ items, loading, formatPrice, cleanTitle }) => {
    const [modalIndex, setModalIndex] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const handleImageClick = (index, image, link) => {
        setModalIndex(index);
        addToRecentViewed(image, link);
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

    // 장바구니 추가
    const addToCart = async (title, lprice, image) => {
        try {
            const response = await fetch('/api/api/insertCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, lprice, image }),
            });

            const result = await response.json();

            if (response.ok) {
                setToastMessage({ type: 'success', message: result.message });
            } else {
                setToastMessage({ type: 'danger', message: result.message });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            setToastMessage({ type: 'error', message: '장바구니 추가 중 오류가 발생했습니다.' });
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
                                        onClick={() => handleImageClick(index, item.image, item.link)}
                                    />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title className="ellipsis" style={{ fontSize: '0.7vw' }}>{cleanTitle(item.title)}</Card.Title>
                                    <Card.Text>
                                        <b>{formatPrice(item.lprice)}</b>
                                    </Card.Text>
                                    <Button variant="success" onClick={() => window.open(item.link, '_blank')} size="sm" style={{ minWidth: '10px', fontSize: '0.5vw', marginRight: '5px' }}>
                                        네이버쇼핑
                                    </Button>
                                    <Button variant="success" size="sm" onClick={() => addToCart(item.title, item.lprice, item.image)} style={{ minWidth: '10px', fontSize: '0.5vw' }}>
                                        장바구니
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {/* 모달 */}
            <ItemModal items={items} modalIndex={modalIndex} setModalIndex={setModalIndex} formatPrice={formatPrice} cleanTitle={cleanTitle}/>

            {/* 토스트메시지 */}
            {toastMessage && (
                <ToastContainer position="bottom-center" className="p-3">
                    <Toast bg={toastMessage.type} onClose={() => setToastMessage(null)} autohide delay={3000}>
                        <Toast.Body>{toastMessage.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    );
};

export default ItemList;

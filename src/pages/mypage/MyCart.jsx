import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const MyCart = () => {
const [cartItems, setCartItems] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(1);

const formatPrice = (price) => {
return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
};
const cleanTitle = (title, maxLength = 25) => {
const cleanedTitle = title.replace(/<[^>]+>/g, '');
if (cleanedTitle.length > maxLength) {
    return cleanedTitle.slice(0, maxLength) + '...';
}
return cleanedTitle;
};

useEffect(() => {
// 장바구니 데이터 조회
const getCart = async () => {
    try {
    const response = await axios.post('/api/api/getCart');
    if (response.data.success) {
        setCartItems(response.data.data);
    } else {
        alert('장바구니가 비어있습니다.');
    }
    } catch (error) {
    console.error('장바구니 조회 오류:', error);
    }
};

getCart();
}, []);

if (!cartItems) return <div>Loading...</div>;

// 페이지네이션 계산
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

// 페이지 변경 핸들러
const handlePageChange = (direction) => {
if (direction === 'prev' && currentPage > 1) {
    setCurrentPage(currentPage - 1);
}
if (direction === 'next' && currentPage < Math.ceil(cartItems.length / itemsPerPage)) {
    setCurrentPage(currentPage + 1);
}
};

// 아이템 삭제 핸들러
const handleDeleteItem = async (cartId) => {
try {
    const response = await axios.post('/api/api/deleteCart', { cart_id: cartId });
    if (response.data.success) {
    // 삭제 성공 시 장바구니 데이터 업데이트
    setCartItems(cartItems.filter(item => item.cart_id !== cartId));
    alert('상품이 삭제되었습니다.');
    window.location.href = '/mypage';
    } else {
    alert('상품 삭제에 실패했습니다.');
    }
} catch (error) {
    console.error('상품 삭제 오류:', error);
    alert('상품 삭제에 오류가 발생했습니다.');
}
};

return (
<div className="container mt-4 mb-4">
    <div className="row">
    <div className="col-12">
        <Card className="shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
            <h5>
                <FaShoppingCart style={{ marginRight: '10px' }} />
                <b>장바구니</b>
            </h5>
            </div>
            <hr />
            <div className="row">
            {cartItems.length > 0 ? (
                currentItems.map((item) => (
                <div className="col-12 mb-3" key={item.cart_id}>
                    <Card className="shadow-sm">
                    <Card.Body className="d-flex flex-column">
                        <div className="d-flex flex-column flex-sm-row align-items-center">
                        <img
                            src={item.image_url}
                            alt={item.title}
                            style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            marginRight: '15px',
                            }}
                        />
                        <div className="text-center text-sm-left">
                            <h6 className="card-title">{cleanTitle(item.title)}</h6>
                            <p className="card-text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {formatPrice(item.price)}
                            </p>
                        </div>
                        </div>
                        <Button
                        variant="success"
                        size="sm"
                        style={{ position: 'absolute', bottom: '10px', right: '10px'}}
                        onClick={() => handleDeleteItem(item.cart_id)}
                        >
                        <FaTimes />
                        </Button>
                    </Card.Body>
                    </Card>
                </div>
                ))
            ) : (
                <div className="col-12 text-center">장바구니에 항목이 없습니다.</div>
            )}
            </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center align-items-center">
            <Button
            variant="success"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            >
            <FaChevronLeft /> {/* 이전 아이콘 */}
            </Button>
            <Button
            variant="success"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === Math.ceil(cartItems.length / itemsPerPage)}
            >
            <FaChevronRight /> {/* 다음 아이콘 */}
            </Button>
        </Card.Footer>
        </Card>
    </div>
    </div>
</div>
);
};

export default MyCart;
